import { QueryResultBase } from "pg";
import { client } from "../../db";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("contents.repository", () => {
  it("shoule pass all test on empty functions", () => {
    expect(true).toBe(true);
  });
});
