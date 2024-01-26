const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { usergroup } = require('../services');

const createUserGroup = catchAsync(async (req, res) => {
  // Assuming `usergroup.createUserGroup` throws an error if the name is already taken

  const userGroup = await usergroup.createUserGroup(req.body);

  // Send a successful response with the created user group
  res.status(httpStatus.CREATED).send({ userGroup });
});
const updateUserGroup = catchAsync(async (req, res) => {
  const userGroup = await adminSevice.updateUserGroupById(req.params.userGroupId, req.body);
  res.send(userGroup);
});
const deleteUserGroup = catchAsync(async (req, res) => {
  await adminSevice.deleteUserGroupById(req.params.userGroupId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUserGroup,
  deleteUserGroup,
  updateUserGroup,
};
