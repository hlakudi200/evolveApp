FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY ["src/evolve.Web.Host/evolve.Web.Host.csproj", "src/evolve.Web.Host/"]
COPY ["src/evolve.Web.Core/evolve.Web.Core.csproj", "src/evolve.Web.Core/"]
COPY ["src/evolve.Application/evolve.Application.csproj", "src/evolve.Application/"]
COPY ["src/evolve.Core/evolve.Core.csproj", "src/evolve.Core/"]
COPY ["src/evolve.EntityFrameworkCore/evolve.EntityFrameworkCore.csproj", "src/evolve.EntityFrameworkCore/"]
WORKDIR "/src/src/evolve.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/evolve.Web.Host", "src/evolve.Web.Host"]
COPY ["src/evolve.Web.Core", "src/evolve.Web.Core"]
COPY ["src/evolve.Application", "src/evolve.Application"]
COPY ["src/evolve.Core", "src/evolve.Core"]
COPY ["src/evolve.EntityFrameworkCore", "src/evolve.EntityFrameworkCore"]
WORKDIR "/src/src/evolve.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "evolve.Web.Host.dll"]
