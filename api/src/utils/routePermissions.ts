/*
    Define roles and permissions relevant to your application. Example:

    Roles: Admin, User, Moderator
    Permissions: create_post, edit_post, delete_post, view_post

    You can seed these into your database to establish initial role-permission mappings.
*/

export const routePermissions: Record<string, string> = {
  "/create-post": "create_post",
  "/edit-post": "edit_post",
  "/delete-post": "delete_post",
  "/view-post": "view_post",
};
