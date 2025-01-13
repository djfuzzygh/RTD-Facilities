#!/bin/bash

# Replace these with your desired names
RESOURCE_GROUP="rtd-facilities"
LOCATION="eastus"
APP_NAME="rtd-facilities-app"
API_NAME="rtd-facilities-api"
DB_SERVER="rtd-facilities-db"
DB_NAME="RTDFacilitiesDB"

# Run these commands one by one
az group create --name $RESOURCE_GROUP --location $LOCATION

az appservice plan create --name "rtd-facilities-plan" --resource-group $RESOURCE_GROUP --sku B1

az webapp create --name $APP_NAME --resource-group $RESOURCE_GROUP --plan "rtd-facilities-plan" --runtime "NODE:18-lts"

az webapp create --name $API_NAME --resource-group $RESOURCE_GROUP --plan "rtd-facilities-plan" --runtime "NODE:18-lts"

az sql server create --name $DB_SERVER --resource-group $RESOURCE_GROUP --location $LOCATION --admin-user "rtdadmin" --admin-password "YourStrongPassword123!"

az sql db create --name $DB_NAME --resource-group $RESOURCE_GROUP --server $DB_SERVER --service-objective Basic
