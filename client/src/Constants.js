const prod = {
  url: {
    // TODO: Add production URL
    API_URL: "http://localhost:8000/api",
    WS_URL: "//localhost:8000"
  }
}

const dev = {
  url: {
    API_URL: "http://localhost:8000/api",
    WS_URL: "//localhost:8000"
  }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;