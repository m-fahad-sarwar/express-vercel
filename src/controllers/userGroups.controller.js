const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { usergroup } = require('../services');
const pick = require('../utils/pick');
const Usergroup = require('../models/usergroup.model');

const createUserGroup = catchAsync(async (req, res) => {
  const userGroup = await usergroup.createUserGroup(req.body);

  res.status(httpStatus.CREATED).send({ userGroup });
});

const getUserGroupById = async (id) => Usergroup.findById(id);

const updateUserGroup = catchAsync(async (req, res) => {
  const existingUserGroup = await getUserGroupById(req.params.user_groupId);
  const existingAgencyIdString = existingUserGroup.agencyId.toString();

  if (existingAgencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to update this user group.' });
  }

  const updatedUserGroup = await usergroup.updateUserGroupById(req.params.user_groupId, req.body);
  res.send(updatedUserGroup);
});

const deleteUserGroup = catchAsync(async (req, res) => {
  const existingUserGroup = await getUserGroupById(req.params.user_groupId);
  const existingAgencyIdString = existingUserGroup.agencyId.toString();

  if (existingAgencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to delete this user group.' });
  }

  await usergroup.deleteUserGroupById(req.params.user_groupId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserGroups = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await usergroup.queryUserGroup(filter, options);
  res.send(result);
});

module.exports = {
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
  getUserGroups,
};
