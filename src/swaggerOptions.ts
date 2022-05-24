export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "HR API",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        url: "http://localhost:5000"
        // ,
      },

      {
        url: "https://app-team-api.herokuapp.com"
      }
    ],
  },
  apis: ["./src/routes/*.ts"],
};