# Deployment instructions

## Prerequisites

1. You have an existing resource group in an Azure subscription.
1. You have set up the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli).

## Deploy the web infrastructure

1. If desired, edit the default values in `web.parameters.json`. These two parameters control the pricing tiers of the storage account and the CDN, respectively.
1. Run the CLI command below to deploy the template

```bash
az deployment group create \
    --name <the deployment name> \
    --subscription <subscription name or id> \
    --resource-group <resource group name> \
    --template-file web.json \
    --parameters @web.parameters.json
```
