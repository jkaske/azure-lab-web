export interface Environment {
  api: {
    baseUrl: string
  }
}

const dev: Environment = {
  api: {
    baseUrl: "https://azure-101-api-python.azurewebsites.net/api",
  },
}

const prod: Environment = {
  api: {
    baseUrl: "https://azure-101-api-python.azurewebsites.net/api",
  },
}

export const environment: Environment =
  process.env.NODE_ENV === "production" ? prod : dev
