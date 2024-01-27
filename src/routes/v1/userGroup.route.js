const express = require('express');
// const validate = require('../../middlewares/validate');
const usergroupController = require('../../controllers/userGroups.controller');

const router = express.Router();

router.route('/').post(usergroupController.createUserGroup).get(usergroupController.getUserGroups);

router.route('/:user_groupId').patch(usergroupController.updateUserGroup).delete(usergroupController.deleteUserGroup);

module.exports = router;
