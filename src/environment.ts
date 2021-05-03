export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "http://localhost:7071",
}

export const environment: Environment = prod
