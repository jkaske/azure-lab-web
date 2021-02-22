export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://azure-101-ce6c7ptzod4lo.azurewebsites.net",
}

export const environment: Environment = prod
