export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://azure-101-7ointdnhy4wca.azurewebsites.net",
}

export const environment: Environment = prod
