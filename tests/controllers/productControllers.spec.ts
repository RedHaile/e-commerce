import request from "supertest";

import connect, { MongoHelper } from "../db-helper";
import { createUser, getToken } from "../test-utils";
import app from "../../src/app";

describe("product controller test", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  afterEach(async () => {
    await mongoHelper.clearDatabase();
  });

  test("should create new product when user is an admin and has valid token", async () => {
    const response = await createUser(
      "User",
      "1",
      "user1@gmail.com",
      "123",
      "admin"
    );
    const userData = await getToken(response.body.email, "123");

    const token = userData.body.token;

    const productResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", "Bearer " + token)
      .send({ title: "product1" });

    expect(productResponse.status).toBe(201);
  });

  test("should not create new product when user is not an admin even has valid token", async () => {
    const response = await createUser(
      "User",
      "2",
      "user2@gmail.com",
      "123",
      "user"
    );
    const userData = await getToken(response.body.email, "123");

    const token = userData.body.token;

    const productResponse = await request(app)
      .post("/api/v1/products")
      .set("Authorization", "Bearer " + token)
      .send({ title: "product1" });

    expect(productResponse.status).toBe(403);
  });

  test("should return all products", async () => {
    const response = await request(app).get("/api/v1/products");
    expect(response.status).toBe(200);
  });
});
