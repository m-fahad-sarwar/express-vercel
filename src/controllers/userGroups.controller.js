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
  const UserGroup = await getUserGroupById(req.params.userGroupId);
  const agencyIdString = UserGroup.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to update this user group.' });
  }

  const updatedUserGroup = await usergroup.updateUserGroupById(req.params.userGroupId, req.body);
  res.send(updatedUserGroup);
});

const deleteUserGroup = catchAsync(async (req, res) => {
  const UserGroup = await getUserGroupById(req.params.userGroupId);
  const agencyIdString = UserGroup.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to delete this user group.' });
  }

  await usergroup.deleteUserGroupById(req.params.userGroupId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getUserGroups = catchAsync(async (req, res) => {
  const agencyId = req.body.agencyId;
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await usergroup.queryUserGroup(filter, options);
  const filteredResult = result.results.filter((result) => result.agencyId == agencyId);
  res.send({ ...result, results: filteredResult });
});

module.exports = {
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
  getUserGroups,
};
