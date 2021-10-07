export interface Environment {
  baseUrl: string
}

const prod: Environment = {
  baseUrl: "https://funcapp-xohw75oh7go66.azurewebsites.net/",
}

export const environment: Environment = prod
