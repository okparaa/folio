import { QueryResultBase } from "pg";
import { client } from "../../db";
import { RolesService } from "../../services/roles.service";
import { roleTD } from "../atest-data/roles.data";
import { throwE } from "../utils";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("roles service", () => {
  const rolesService = new RolesService();
  const roleMock = roleTD.build();
  const { id, ...roleNoId } = roleMock;
  const mockRoles = [...roleTD.buildList(10)];

  describe("createRole", () => {
    it("should create a role when provided with correct info", async () => {
      // Mock successful role creation
      const mockRepo = jest
        .spyOn(rolesService.repo, "create")
        .mockResolvedValue(roleMock);

      const result = await rolesService.createRole({
        name: roleMock.name,
        description: roleMock.description as string,
      });

      expect(result).toEqual(roleMock);
      expect(mockRepo).toHaveBeenCalledWith({
        name: roleMock.name,
        description: roleMock.description,
      });
    });

    it("should throw an error when role creation fails (missing id)", async () => {
      // Mock creation failure (result without id)
      const mockRepo = jest
        .spyOn(rolesService.repo, "create")
        .mockResolvedValue(roleNoId);

      await expect(rolesService.createRole(roleNoId)).rejects.toThrow(
        throwE("Could not create role")
      );

      expect(mockRepo).toHaveBeenCalledWith(roleNoId);
    });

    it("should throw an error when an unexpected error occurs", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo, "create")
        .mockRejectedValue(throwE("Database error occured"));

      await expect(rolesService.createRole(roleNoId)).rejects.toThrow(
        throwE("Database error occured")
      );
      expect(mockRepo).toHaveBeenCalledWith(roleNoId);
    });
  });

  describe("updateRole", () => {
    it("should update a role when correct data is provided", async () => {
      // Mock successful role update
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockResolvedValue({ ...roleMock, name: "users" });

      const result = await rolesService.updateRole({
        ...roleMock,
        name: "users",
      });
      expect(result).toEqual({ ...roleMock, name: "users" });
      expect(mockRepo).toHaveBeenCalledWith({ ...roleMock, name: "users" });
    });

    it("should throw an error when role update fails (missing id)", async () => {
      // Mock update failure (result without id)
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockResolvedValue(roleNoId);

      await expect(rolesService.updateRole(roleMock)).rejects.toThrow(
        "Could not update role"
      );
      expect(mockRepo).toHaveBeenCalledWith(roleMock);
    });

    it("should throw an error when an unexpected error occurs", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockRejectedValue(throwE("Database error"));

      await expect(rolesService.updateRole(roleMock)).rejects.toThrow(
        "Database error"
      );
      expect(mockRepo).toHaveBeenCalledWith(roleMock);
    });
  });

  describe("getRoles", () => {
    it("should retrieve roles when correct offset and limit are provided", async () => {
      const mockRepo = jest
        .spyOn(rolesService.repo, "find")
        .mockResolvedValue(mockRoles);

      const result = await rolesService.getRoles(10, 0);
      expect(result).toEqual(mockRoles);
      expect(mockRepo).toHaveBeenCalledWith(10, 0);
    });

    it("should throw an error when there is a problem retrieving roles", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo, "find")
        .mockRejectedValue(new Error("Database error"));

      await expect(rolesService.getRoles(10, 0)).rejects.toThrow(
        "Database error"
      );
      expect(mockRepo).toHaveBeenCalledWith(10, 0);
    });
  });

  describe("getRole", () => {
    it("should retrieve a role when role with id exists", async () => {
      // Mock successful role retrieval
      const mockRepo = jest
        .spyOn(rolesService.repo, "findOne")
        .mockResolvedValue(roleMock);

      const result = await rolesService.getRole(roleMock.id);
      expect(result).toEqual(roleMock);
      expect(mockRepo).toHaveBeenCalledWith(roleMock.id);
    });

    it("should throw an error when the role is not found", async () => {
      // Mock role not found (findOne returns null)
      const mockRepo = jest
        .spyOn(rolesService.repo, "findOne")
        .mockResolvedValue(undefined);

      await expect(rolesService.getRole(roleMock.id)).rejects.toThrow(
        throwE(`Role with id ${roleMock.id} not found`)
      );
      expect(mockRepo).toHaveBeenCalledWith(roleMock.id);
    });

    it("should throw an error when a database error occurs", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo, "findOne")
        .mockRejectedValue(new Error("Database error"));

      await expect(rolesService.getRole(roleMock.id)).rejects.toThrow(
        throwE("Database error")
      );
      expect(mockRepo).toHaveBeenCalledWith(roleMock.id);
    });
  });

  describe("patchRole", () => {
    it("should update a role when correct info is provided", async () => {
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockResolvedValue(roleMock);

      const result = await rolesService.patchRole(roleMock);
      expect(result).toEqual(roleMock);
      expect(mockRepo).toHaveBeenCalledWith(roleMock);
    });

    it("should throw an error when the role update fails (no result returned)", async () => {
      // Mock a failed update (update returns null)
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockResolvedValue(undefined);

      await expect(rolesService.patchRole(roleMock)).rejects.toThrow(
        `Failed to update role with id ${roleMock.id}`
      );
      expect(mockRepo).toHaveBeenCalledWith(roleMock);
    });

    it("should throw an error when a database error occurs", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo, "update")
        .mockRejectedValue(new Error("Database error"));

      await expect(rolesService.patchRole(roleMock)).rejects.toThrow(
        "Database error"
      );

      expect(mockRepo).toHaveBeenCalledWith(roleMock);
    });
  });

  describe("notDuplicate", () => {
    it("should return true when no duplicate role is found", async () => {
      // Mock a scenario where no duplicate exists
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [], rowCount: 0 });

      const result = await rolesService.notDuplicate(roleMock.name);
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should return false when a duplicate name exists", async () => {
      // Mock a scenario where a duplicate exists
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockResolvedValue({ ...response, rows: [{}], rowCount: 1 });

      const result = await rolesService.notDuplicate(roleMock.name);
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should throw an error when there is a database error", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockRejectedValue(throwE("Database error"));

      await expect(rolesService.notDuplicate(roleMock.name)).rejects.toThrow(
        "Database error"
      );
      expect(mockRepo).toHaveBeenCalled();
    });
  });

  describe("isSameRole", () => {
    it("should return true when the role name belongs to the same role id", async () => {
      // Mock the scenario where the role name matches the same id
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockResolvedValue({
          ...response,
          rowCount: 1,
          rows: [{ id: roleMock.id }],
        });

      const result = await rolesService.isSameRole({
        id: roleMock.id,
        name: roleMock.name,
      });
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should return false when a different role with the same name exists", async () => {
      // Mock the scenario where another role with the same name exists
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockResolvedValue({
          ...response,
          rowCount: 1,
          rows: [{ id: "2" }],
        });

      const result = await rolesService.isSameRole({
        id: roleMock.id,
        name: roleMock.name,
      });
      expect(result).toBe(false);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should return true when no role with the same name exist", async () => {
      // Mock the scenario where no matching role is found
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockResolvedValue({ ...response, rowCount: 0, rows: [] });

      const result = await rolesService.isSameRole({
        id: roleMock.id,
        name: roleMock.name,
      });
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalled();
    });

    it("should throw an error when a database error occurs", async () => {
      // Mock a database error
      const mockRepo = jest
        .spyOn(rolesService.repo.db, "execute")
        .mockRejectedValue(throwE("Database error"));

      await expect(
        rolesService.isSameRole({ id: roleMock.id, name: roleMock.name })
      ).rejects.toThrow("Database error");
      expect(mockRepo).toHaveBeenCalled();
    });
  });

  describe("isAllowed", () => {
    it("should return true when permissions are found and no specific route logic is provided", async () => {
      // Mock permissions found for the role
      const user = { role: "admin", id: "54rr" };
      const mockRepo = jest
        .spyOn(rolesService.repo, "findByRoleName")
        .mockResolvedValue({ permissions: ["admin"] });

      const reqInfo = { baseUrl: "/users", path: "signin", method: "get" };

      const result = await rolesService.isAllowed(reqInfo, user);
      expect(result).toBe(true);
      expect(mockRepo).toHaveBeenCalledWith("admin");
    });
  });
});
