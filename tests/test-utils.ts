import request from "supertest";
import app from "../src/app";

// Register a new user
export async function createUser(firstname: string, lastname: string, email: string, password: string, role: string) {
  const data = { firstname, lastname, email, password, role };
  return await request(app).post("/api/v1/users").send(data);
}

// Login and get token
export async function getToken(email: string, password: string) {
  return await request(app).post("/api/v1/users/login").send({ email, password });
}
