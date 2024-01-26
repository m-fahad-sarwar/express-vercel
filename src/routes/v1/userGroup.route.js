const express = require('express');
// const validate = require('../../middlewares/validate');
const usergroupController = require('../../controllers/userGroups.controller');

const router = express.Router();

router.route('/').post(usergroupController.createUserGroup);
//   .get(validate(adminValidation.getAgencies), adminController.getAgencies);

// router
//   .route('/user_group/:user_groupId')
//   .patch(validate(adminValidation.updateUser_group), adminController.updateUser_group)
//   .delete(validate(adminValidation.deleteUser_group), adminController.deleteUser_group);

module.exports = router;
