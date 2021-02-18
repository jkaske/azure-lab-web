export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://azure-101-api-python.azurewebsites.net",
}

export const environment: Environment = prod
