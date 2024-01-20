const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const adminController = require('../../controllers/admin.controller');
const adminValidation = require('../../validations//admin.validation');
const router = express.Router();

router.post('/login', validate(adminValidation.login), adminController.login);

router
  .route('/')
  .post(auth('manageUsers'), validate(adminValidation.createUser), adminController.createUser)
  .get(auth('getUsers'), validate(adminValidation.getUsers), adminController.getUsers);

router
  .route('/:userId')
  .get(auth('getUsers'), validate(adminValidation.getUser), adminController.getUser)
  .patch(auth('manageUsers'), validate(adminValidation.updateUser), adminController.updateUser)
  .delete(auth('manageUsers'), validate(adminValidation.deleteUser), adminController.deleteUser);

router.post('/addAgency', validate(adminValidation.addAgency), adminController.addAgency);

module.exports = router;

