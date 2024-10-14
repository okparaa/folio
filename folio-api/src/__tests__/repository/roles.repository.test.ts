import { QueryResultBase } from "pg";
import { client, db } from "../../db";
import { RolesRepository } from "../../repository/roles.repository";
import { roles } from "../../db/tables";
import { roleTD } from "../atest-data/roles.data";
import { throwE } from "../utils";

const response = {} as QueryResultBase;

afterAll(() => {
  client.end();
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("roles.repository", () => {
  //addRolePermissions tests
  const data = roleTD.build();
  const role = { roleId: "48udh", permissions: data.permissions };
  describe("addRolePermissions", () => {
    describe("given role id and role permissions", () => {
      it("should return the added permissions", async () => {
        const mockDb = jest
          .spyOn(db, "transaction")
          .mockResolvedValue(role.permissions);

        const rolesRepository = new RolesRepository(roles);
        const result = await rolesRepository.addRolePermissions(role);
        expect(result).toEqual(role.permissions);
        expect(mockDb).toHaveBeenCalledTimes(1);
      });
    });

    describe("not given id or permissions", () => {
      it("should throw error", async () => {
        const rolesRepository = new RolesRepository(roles);

        await expect(
          rolesRepository.addRolePermissions({ ...role, roleId: "" })
        ).rejects.toThrow(new Error("role id not provided for permissions"));

        await expect(
          rolesRepository.addRolePermissions({ ...role, permissions: [] })
        ).rejects.toThrow(new Error("permissions is required"));
      });
    });
  });

  // removeRolePermissions tests
  describe("removeRolePermissions", () => {
    describe("when data permissions exists", () => {
      it("should return permissions", async () => {
        const mockDb = jest
          .spyOn(db, "transaction")
          .mockResolvedValue(role.permissions);

        const rolesRepository = new RolesRepository(roles);
        const result = await rolesRepository.removeRolePermissions(role);
        expect(result).toEqual(role.permissions);
        expect(mockDb).toHaveBeenCalledTimes(1);
      });
    });

    describe("not given id or permissions", () => {
      it("should throw error", async () => {
        const rolesRepository = new RolesRepository(roles);
        await expect(
          rolesRepository.removeRolePermissions({ ...role, roleId: "" })
        ).rejects.toThrow(new Error("role id not provided for permissions"));

        await expect(
          rolesRepository.removeRolePermissions({ ...role, permissions: [] })
        ).rejects.toThrow(new Error("permissions not provided"));
      });
    });
  });

  //findByRoleName tests
  describe("findByRoleName", () => {
    describe("when given roleName", () => {
      it("should return the role permissions", async () => {
        const mockDb = jest.spyOn(db, "execute").mockResolvedValueOnce({
          ...response,
          rows: [{ permissions: role.permissions }],
        });

        const rolesRepository = new RolesRepository(roles);
        const result = await rolesRepository.findByRoleName(data.role);
        expect(result).toEqual({ permissions: role.permissions });
        expect(mockDb).toHaveBeenCalled();
      });
    });

    describe("when rolename was not given", () => {
      it("should throw error", async () => {
        const rolesRepository = new RolesRepository(roles);
        await expect(rolesRepository.findByRoleName("")).rejects.toThrow(
          throwE("role name is empty")
        );
      });
    });

    describe("when rolename does not exist", () => {
      it("should throw error", async () => {
        const rolesRepository = new RolesRepository(roles);
        await expect(rolesRepository.findByRoleName("fred")).rejects.toThrow(
          throwE("role does not exist")
        );
      });
    });
  });
});
