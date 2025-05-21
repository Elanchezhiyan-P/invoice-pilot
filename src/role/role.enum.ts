export enum RoleName {
  SuperAdmin = 'SuperAdmin',
  Admin = 'Admin',
  User = 'User',
}

export const RoleIdToNameMap = {
  1: RoleName.SuperAdmin,
  2: RoleName.Admin,
  3: RoleName.User,
};
