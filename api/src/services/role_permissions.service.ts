import { Inject } from "../decorators/injector";
import { throwErr } from "../utils/error.utils";
import { RolePermissionsRepository } from "../repository/role_permissions.repository";
import { rolePermissions } from "../db/tables";

export class RolePermissionService {
  @Inject(RolePermissionsRepository, rolePermissions)
  repo: RolePermissionsRepository;
  async getUserRolePermissions(userId: string) {
    const response = await this.repo.getUserRolePermissions(userId);
    if (!response) {
      return throwErr("unable to retrieve permissions");
    }
    return response;
  }
}
