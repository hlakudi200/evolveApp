using e-volve.Models.TokenAuth;
using e-volve.Web.Controllers;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace e-volve.Web.Tests.Controllers;

public class HomeController_Tests : e-volveWebTestBase
{
    [Fact]
    public async Task Index_Test()
    {
        await AuthenticateAsync(null, new AuthenticateModel
        {
            UserNameOrEmailAddress = "admin",
            Password = "123qwe"
        });

        //Act
        var response = await GetResponseAsStringAsync(
            GetUrl<HomeController>(nameof(HomeController.Index))
        );

        //Assert
        response.ShouldNotBeNullOrEmpty();
    }
}