const express = require('express');
const usergroupController = require('../../controllers/userGroups.controller');
const agencyMiddleware = require('../../middlewares/agency');
const validate = require('../../middlewares/validate');
const userGroupValidation = require('../../validations/userGroup.validation');

const router = express.Router();

router
  .route('/')
  .post(
    agencyMiddleware,
    validate(userGroupValidation.createUsergroup),
    agencyMiddleware,
    usergroupController.createUserGroup
  )
  .get(usergroupController.getUserGroups);

router
  .route('/:userGroupId')
  .patch(agencyMiddleware, validate(userGroupValidation.updateAgency), usergroupController.updateUserGroup)
  .delete(agencyMiddleware, validate(userGroupValidation.deleteAgency), usergroupController.deleteUserGroup);

module.exports = router;
