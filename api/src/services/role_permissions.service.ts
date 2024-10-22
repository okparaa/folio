import { Inject } from "../decorators/injector";
import { RolePermissionsRepository } from "../repository/role_permissions.repository";
import { rolePermissions } from "../db/tables";
import { NotFoundException } from "../exceptions/notFound.exception";

export class RolePermissionService {
  @Inject(RolePermissionsRepository, rolePermissions)
  repo: RolePermissionsRepository;
  async getUserRolePermissions(userId: string) {
    const response = await this.repo.getUserRolePermissions(userId);
    if (!response) {
      throw new NotFoundException("unable to retrieve permissions");
    }
    return response;
  }
}
