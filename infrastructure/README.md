# Deployment instructions

## Prerequisites

1. You have an existing resource group in an Azure subscription
2. You have set up the [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
3. You have installed the [Azure storage extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestorage) in VS Code

## Deploy the web infrastructure

1. Run the CLI command below to deploy the template

```bash
az deployment group create \
    --name <the deployment name> \
    --subscription <subscription name or id> \
    --resource-group <resource group name> \
    --template-file web.json
```

2. Fetch the website URL from the deployment output, you will need this website URL to configure CORS for the backend later.

```
az deployment group show \
    --subscription <subscription name or id> \
    --name <the deployment name> \
    --resource-group <resource group name> \
    --query properties.outputs.websiteUrl.value -o tsv

## Deploy the web page

1. Make sure your backend is deployed.
1. Edit the `src/environment.ts` file to include the URL to your backend function app.
1. Run `yarn build` to create a production build
1. Right-click the `build` output folder in VS Code and select `Deploy to static website via Azure Storage`
1. Select the storage account that you created in the infrastructure step
1. Enable static website hosting when prompted
```
