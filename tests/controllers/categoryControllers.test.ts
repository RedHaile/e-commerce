import request from "supertest";

import connect, { MongoHelper } from "../db-helper";
import app from "../../src/app";

describe("category controller test", () => {
  // connect database
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

  // CREATE A CATEGORY
  test("should create a category", async () => {
    const response = await request(app)
      .post("/api/v1/categories")
      .send({ name: "category1" });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("category1");
  });

  // GET ALL CATEGORIES
  test("should return list of categories", async () => {
    const response = await request(app).get("/api/v1/categories");
    expect(response.status).toBe(200);
    expect(response.body.length).toEqual(0);
  });

  // DELETE A CATEGORY
  test("should delete a category", async () => {
    // create a category first then delete it
    const responseToCreate = await request(app)
    .post("/api/v1/categories")
    .send({ name: "categoryDelete" });

    // check if this category is created successfully
    expect(responseToCreate.status).toBe(201);

    // delete that category
    const response = await request(app).delete(`/api/v1/categories/${responseToCreate.body._id}`)
    expect(response.status).toBe(204);
  });

  // UPDATE A CATEGORY
  test("should update a category", async () => {
      // create a category first then update it
      const responseToCreate = await request(app)
      .post("/api/v1/categories")
      .send({ name: "categoryUpdate" });

      // check if this category is created successfully
      expect(responseToCreate.status).toBe(201);

      // update that category
      const response = await request(app)
      .put(`/api/v1/categories/${responseToCreate.body._id}`)
      .send({ name: "updatedCategoryUpdate" });

      // Check if update was successful
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("name");
      expect(response.body.name).toEqual("updatedCategoryUpdate");
  });

  // GET CATEGORY BY ID
  test("should get a category by Id", async () => {
    // create a category first
    const responseToGet = await request(app)
    .post("/api/v1/categories")
    .send({ name: "categoryGet" });

    // check if this category is created successfully
    expect(responseToGet.status).toBe(201);

    const response = await request(app).get(`/api/v1/categories/${responseToGet.body._id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual("categoryGet");
  });
});