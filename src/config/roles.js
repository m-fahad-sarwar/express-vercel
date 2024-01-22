const allRoles = {
  AGENCY_ADMIN: [],
  AGENCY_USER: [],
  SUPER_ADMIN: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
