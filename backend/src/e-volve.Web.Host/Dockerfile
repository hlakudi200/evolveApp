FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/e-volve.Web.Host/e-volve.Web.Host.csproj", "src/e-volve.Web.Host/"]
COPY ["src/e-volve.Web.Core/e-volve.Web.Core.csproj", "src/e-volve.Web.Core/"]
COPY ["src/e-volve.Application/e-volve.Application.csproj", "src/e-volve.Application/"]
COPY ["src/e-volve.Core/e-volve.Core.csproj", "src/e-volve.Core/"]
COPY ["src/e-volve.EntityFrameworkCore/e-volve.EntityFrameworkCore.csproj", "src/e-volve.EntityFrameworkCore/"]
WORKDIR "/src/src/e-volve.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/e-volve.Web.Host", "src/e-volve.Web.Host"]
COPY ["src/e-volve.Web.Core", "src/e-volve.Web.Core"]
COPY ["src/e-volve.Application", "src/e-volve.Application"]
COPY ["src/e-volve.Core", "src/e-volve.Core"]
COPY ["src/e-volve.EntityFrameworkCore", "src/e-volve.EntityFrameworkCore"]
WORKDIR "/src/src/e-volve.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "e-volve.Web.Host.dll"]
