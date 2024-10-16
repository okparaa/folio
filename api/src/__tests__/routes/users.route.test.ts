import request from "supertest";
import app from "../../expressApp";
import { userTD } from "../atest-data/users.data";
import { client } from "../../db";

afterAll(() => {
  client.end();
});

describe("user endpoint", () => {
  it("POST /users/signup - should signup user", async () => {
    const user = userTD.build();
    const { id, role, ...newUser } = { ...user, pass: user.password };
    const response = await request(app).post("/users/signup").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("username", newUser.username);
  });
});
