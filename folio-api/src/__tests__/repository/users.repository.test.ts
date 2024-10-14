import { QueryResultBase } from "pg";
import { client, db } from "../../db";
import { users } from "../../db/tables";
import { UsersRepository } from "../../repository/users.repository";
import { userTD } from "../atest-data/users.data";
import { throwE } from "../utils";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});
afterEach(() => {
  jest.restoreAllMocks();
});

// getUserByUsername returns user data when username exists
describe("users.repository", () => {
  const usersRepository = new UsersRepository(users);
  const data = userTD.build();
  const userMock = { id: data.id, username: data.username };

  describe("getUserByUsername function", () => {
    describe("when username is not provided", () => {
      it("should throw an error", async () => {
        const mockDb = jest.spyOn(db, "execute").mockResolvedValue({
          ...response,
          rowCount: 0,
          rows: [],
        });
        await expect(usersRepository.getUserByUsername("")).rejects.toThrow(
          throwE("Username is required")
        );
        expect(mockDb).not.toHaveBeenCalled();
      });
    });

    describe("when found", () => {
      it("should return the user", async () => {
        // Mock a valid user found in the database
        const mockDb = jest.spyOn(db, "execute").mockResolvedValue({
          ...response,
          rowCount: 1,
          rows: [userMock],
        });

        const result = await usersRepository.getUserByUsername(
          userMock.username
        );
        expect(result).toEqual({
          id: userMock.id,
          username: userMock.username,
        });
        expect(mockDb).toHaveBeenCalled();
      });
    });
    describe("when user is not found", () => {
      it("should throw an error", async () => {
        // Mock no user found
        const mockDb = jest
          .spyOn(db, "execute")
          .mockResolvedValue({ ...response, rowCount: 0, rows: [] });

        await expect(
          usersRepository.getUserByUsername(userMock.username)
        ).rejects.toThrow(throwE("User not found"));
        expect(mockDb).toHaveBeenCalled();
      });
    });

    describe("when the query fails", () => {
      it("should throw a database error", async () => {
        // Mock a database error
        const mockDb = jest
          .spyOn(db, "execute")
          .mockRejectedValue(throwE("Database error"));

        await expect(
          usersRepository.getUserByUsername(userMock.username)
        ).rejects.toThrow(throwE("Database error"));
        expect(mockDb).toHaveBeenCalled();
      });
    });
  });
});
