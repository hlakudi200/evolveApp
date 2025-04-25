using evolve.Models.TokenAuth;
using evolve.Web.Controllers;
using Shouldly;
using System.Threading.Tasks;
using Xunit;

namespace evolve.Web.Tests.Controllers;

public class HomeController_Tests : evolveWebTestBase
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