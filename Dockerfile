﻿FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY ["PaylocityCodingChallenge.csproj", "./"]
RUN dotnet restore "PaylocityCodingChallenge.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "PaylocityCodingChallenge.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PaylocityCodingChallenge.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
# ENTRYPOINT ["dotnet", "PaylocityCodingChallenge.dll"]
CMD ASPNETCORE_URLS=http://*:$PORT dotnet PaylocityCodingChallenge.dll