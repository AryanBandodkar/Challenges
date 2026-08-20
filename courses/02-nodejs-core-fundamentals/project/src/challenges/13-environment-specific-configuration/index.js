import dotenv from "dotenv";
dotenv.config();
export function solve_13_environment_specific_configuration() {
  const environment = process.env.NODE_ENV || `production`;

  if (environment === "production") {
    return {
      environment: "production",
      debug: false,
      port: 8080
    };
  }

  return {
    environment: "development",
    debug: true,
    port: 3000
  };
}
