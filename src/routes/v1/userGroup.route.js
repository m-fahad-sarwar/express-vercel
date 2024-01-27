const express = require('express');
// const validate = require('../../middlewares/validate');
const usergroupController = require('../../controllers/userGroups.controller');
const agencyMiddleware = require('../../middlewares/agency');

const router = express.Router();

router.route('/').post(agencyMiddleware, usergroupController.createUserGroup).get(usergroupController.getUserGroups);

router
  .route('/:user_groupId')
  .patch(agencyMiddleware, usergroupController.updateUserGroup)
  .delete(usergroupController.deleteUserGroup);

module.exports = router;
