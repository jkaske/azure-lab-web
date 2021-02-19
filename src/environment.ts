export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "http://localhost:7071",
  // baseUrl: "https://azure-101-2hf5m6vfzm67s.azurewebsites.net",
}

export const environment: Environment = prod
