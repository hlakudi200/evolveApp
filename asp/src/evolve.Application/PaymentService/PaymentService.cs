using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using Abp.Dependency;
using Abp.Domain.Services;
using evolve.Configuration;
using evolve.PaymentService;
using evolve.PaymentService.DTO;
using Microsoft.Extensions.Logging;

namespace evolve.Services.PaymentService
{
    public class PaymentService : DomainService, IPaymentService, ITransientDependency
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger _logger;
        private readonly PaymentConfiguration _paymentConfig;

        public PaymentService(
         IHttpClientFactory clientFactory,
         ILoggerFactory loggerFactory,
         PaymentConfiguration paymentConfig)
        {
            _clientFactory = clientFactory;
            _logger = loggerFactory.CreateLogger<PaymentService>();
            _paymentConfig = paymentConfig;
        }

        public async Task<PayFastResponse> CreatePayFastPaymentAsync(PayFastRequest request)
        {
            try
            {
                // Step 1: Prepare parameters (exclude passphrase and signature for now)
                var parameters = new Dictionary<string, string>
                {
                    { "merchant_id", _paymentConfig.PayFastMerchantId },
                    { "merchant_key", _paymentConfig.PayFastMerchantKey },
                    { "amount", request.Amount.ToString("F2", System.Globalization.CultureInfo.InvariantCulture) },
                    { "item_name", request.ItemName },
                    { "return_url", request.ReturnUrl },
                    { "cancel_url", request.CancelUrl },
                    { "notify_url", request.NotifyUrl }
                };

                // Add optional parameters if they exist
                //if (!string.IsNullOrEmpty(request.Email))
                //{
                //    parameters.Add("email_address", request.Email);
                //}

                //if (!string.IsNullOrEmpty(request.Name))
                //{
                //    parameters.Add("name_first", request.Name);
                //}

                //if (!string.IsNullOrEmpty(request.LastName))
                //{
                //    parameters.Add("name_last", request.LastName);
                //}

                // Add m_payment_id if present
                //if (!string.IsNullOrEmpty(request.PaymentId))
                //{
                //    parameters.Add("m_payment_id", request.PaymentId);
                //}

                // Step 2: Generate signature
                // Important: PayFast signature uses the parameters WITHOUT the signature itself
                request.Signature = GeneratePayFastSignature(parameters);

                // Step 3: Add signature to parameters for the URL
                parameters.Add("signature", request.Signature);

                // Step 4: Build final URL
                string baseUrl = _paymentConfig.IsPayFastTestMode
                    ? "https://sandbox.payfast.co.za/eng/process"
                    : "https://www.payfast.co.za/eng/process";

                var queryString = string.Join("&", parameters
                    .Select(kvp => $"{kvp.Key}={PayFastUrlEncode(kvp.Value)}"));

                var finalUrl = $"{baseUrl}?{queryString}";

                // Log the final URL and signature for debugging
                _logger.LogDebug("PayFast URL: {Url}", finalUrl);
                _logger.LogDebug("PayFast Signature: {Signature}", request.Signature);

                return new PayFastResponse
                {
                    PaymentUrl = finalUrl,
                    Request = request
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating PayFast payment: {Message}", ex.Message);
                throw new PaymentException("Failed to create PayFast payment", ex);
            }
        }

        /// <summary>
        /// PayFast-specific URL encoding that:
        /// 1. Replaces spaces with %20 (not +)
        /// 2. Ensures all percent-encoded sequences are lowercase
        /// This is essential for signature matching
        /// </summary>
        private string PayFastUrlEncode(string value)
        {
            string encoded = HttpUtility.UrlEncode(value);
            encoded = encoded.Replace("%20", "+");
            return encoded;
        }

        /// <summary>
        /// Generates the PayFast signature according to official documentation
        /// </summary>
        private string GeneratePayFastSignature(Dictionary<string, string> parameters)
        {
            try
            {
                // 1. Create a copy of parameters to avoid modifying the original
                var signatureParams = new Dictionary<string, string>(parameters);

                // 2. Add passphrase if configured (omit if null or empty)
                if (!string.IsNullOrEmpty(_paymentConfig.PayFastPassphrase))
                {
                    signatureParams.Add("passphrase", _paymentConfig.PayFastPassphrase);
                }

                // 3. Build signature string:
                // - Sort alphabetically by key (as required by PayFast)
                // - Format as key=value& with proper URL encoding
                var signatureString = string.Join("&", signatureParams
                    .OrderBy(p => p.Key)
                    .Select(kvp => $"{kvp.Key}={PayFastUrlEncode(kvp.Value)}"));

                // Log the signature string for debugging
                _logger.LogDebug("PayFast Signature String: {SignatureString}", signatureString);

                // 4. Generate MD5 hash using UTF-8 encoding
                using (var md5 = MD5.Create())
                {
                    byte[] hash = md5.ComputeHash(Encoding.UTF8.GetBytes(signatureString));
                    return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error generating PayFast signature: {Message}", ex.Message);
                throw new PaymentException("Failed to generate PayFast signature", ex);
            }
        }

        public async Task<YocoCheckoutResponse> CreateYocoCheckoutAsync(YocoCheckoutRequest request, Guid referenceId)
        {
            try
            {
                string url = "https://payments.yoco.com/api/checkouts";

                // Convert amount to cents as required by Yoco
                var requestBody = new
                {
                    amount = Convert.ToInt32(request.Amount * 100),
                    currency = string.IsNullOrEmpty(request.Currency) ? "ZAR" : request.Currency,
                    successUrl = $"{request.SuccessUrl}?guid={referenceId}",
                    cancelUrl = request.CancelUrl,
                    failureUrl = request.FailureUrl
                };

                var json = JsonSerializer.Serialize(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var client = _clientFactory.CreateClient("YocoClient");
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _paymentConfig.YocoSecretKey);

                var response = await client.PostAsync(url, content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var responseJson = JsonSerializer.Deserialize<JsonElement>(responseContent);

                    return new YocoCheckoutResponse
                    {
                        CheckoutUrl = responseJson.GetProperty("redirectUrl").GetString(),
                        CheckoutId = responseJson.GetProperty("id").GetString()
                    };
                }
                else
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogError("Yoco API Error: {StatusCode}, {Response}", response.StatusCode, errorContent);
                    throw new PaymentException($"Yoco checkout creation failed: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating Yoco checkout: {Message}", ex.Message);
                throw new PaymentException("Failed to create Yoco checkout", ex);
            }
        }

        public Guid GenerateReferenceId()
        {
            return Guid.NewGuid();
        }

        public class PaymentException : Exception
        {
            public PaymentException(string message) : base(message)
            {
            }

            public PaymentException(string message, Exception innerException) : base(message, innerException)
            {
            }
        }
    }
}