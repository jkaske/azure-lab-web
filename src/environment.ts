export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://azure-101-3fdzbz2h4aank.azurewebsites.net",
}

export const environment: Environment = prod
