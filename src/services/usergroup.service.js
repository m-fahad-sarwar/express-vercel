const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const UsergroupModel = require('../models/usergroup.model');

const createUserGroup = async (userBody) => {
  const userGroup = await UsergroupModel.findOne({
    name: userBody.name,
  });

  if (userGroup && userGroup.name === userBody.name) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UserGroup Name already taken');
  }

  return UsergroupModel.create(userBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserGroupById = async (id) => {
  return UserGroup.findById(id);
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const queryAgencies = async (filter, options) => {
  const agencies = await UserGroup.paginate(filter, options);
  return agencies;
};

const updateUserGroupById = async (userGroupId, updateBody) => {
  const userGroup = await getUserGroupById(userGroupId);
  if (!userGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserGroup not found');
  }

  Object.assign(userGroup, updateBody);
  await userGroup.save();
  return userGroup;
};
const deleteUserGroupById = async (userGroupId) => {
  const userGroup = await getUserGroupById(userGroupId);
  if (!userGroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'UserGroup not found');
  }
  await userGroup.remove();
  return userGroup;
};

module.exports = {
  queryAgencies,
  createUserGroup,
  updateUserGroupById,
  deleteUserGroupById,
};
