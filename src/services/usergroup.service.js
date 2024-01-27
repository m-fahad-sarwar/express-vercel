const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const UsergroupModel = require('../models/usergroup.model');

const createUserGroup = async (userBody) => {
  const userGroup = await UsergroupModel.findOne({ name: userBody.name });

  if (userGroup) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'UserGroup Name already taken');
  }

  return UsergroupModel.create(userBody);
};

const getUserGroupById = async (id) => UsergroupModel.findById(id);

const queryUserGroup = async (filter, options) => UsergroupModel.paginate(filter, options);

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
  queryUserGroup,
  createUserGroup,
  updateUserGroupById,
  deleteUserGroupById,
};
