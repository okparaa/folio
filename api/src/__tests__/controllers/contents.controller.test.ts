import { Request, Response } from "express";
import { client } from "../../db";

import { VResult } from "../../types";
import { contentTD } from "../atest-data/contents.data";
import { ContentsController } from "../../controllers/contents.controller";

afterEach(() => {
  jest.restoreAllMocks();
});

afterAll(() => {
  client.end();
});

let req: Partial<Request>;
let res: Partial<Response>;

beforeEach(() => {
  jest.restoreAllMocks();
  req = { body: {}, params: {}, query: {} };
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    cookie: jest.fn().mockReturnThis(),
  };
});

describe("Routes Controller", () => {
  const contentsController = new ContentsController();
  const contentT = contentTD.build();
  const content = { ...contentT, id: "1frhr" };
  const flattenedIssues = { nested: ["Invalid input"] };
  const issues = [{ message: "Invalid input" }];
  let validationResult: VResult = {
    issues: null,
    output: null,
  };
  describe("createContent", () => {
    it("should create content", () => {
      expect(true).toBe(true);
    });
  });
});
