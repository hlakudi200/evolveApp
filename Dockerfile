FROM mcr.microsoft.com/dotnet/sdk:9.0.201 AS build

WORKDIR /app

COPY asp/evolve.sln ./
COPY asp/src/ ./src/

RUN dotnet restore ./src/evolve.Web.Host/evolve.Web.Host.csproj
RUN dotnet publish ./src/evolve.Web.Host/evolve.Web.Host.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

COPY --from=build /app/publish .

ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "evolve.Web.Host.dll"]
