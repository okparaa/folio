import { QueryResultBase } from "pg";
import { client } from "../../db";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("routes.repository", () => {
  it("should pass all test on empty function body", () => {
    expect(true).toBe(true);
  });
});
