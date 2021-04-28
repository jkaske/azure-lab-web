export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://azure-101-c4geoszltmpyw.azurewebsites.net",
}

export const environment: Environment = prod
