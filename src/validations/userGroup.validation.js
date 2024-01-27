const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUsergroup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    UsergroupId: Joi.string().required(),
    apiPermissions: Joi.array().items(Joi.string()).required(),
    tabPermissions: Joi.object()
      .keys({
        dashboard: Joi.array().items(Joi.string()).required(),
        user: Joi.array().items(Joi.string()).required(),
      })
      .required(),
  }),
};

const updateUsergroup = {
  params: Joi.object().keys({
    user_groupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      UsergroupId: Joi.string(),
      apiPermissions: Joi.array().items(Joi.string()),
      tabPermissions: Joi.object().keys({
        dashboard: Joi.array().items(Joi.string()),
        user: Joi.array().items(Joi.string()),
      }),
      email: Joi.string().email(),
      logoUrl: Joi.string(),
      isActive: Joi.boolean(),
      isAssigned: Joi.boolean(),
    })
    .min(1),
};

const deleteUsergroup = {
  params: Joi.object().keys({
    user_groupId: Joi.string().custom(objectId),
  }),
};

const getUsergroups = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUsergroup,
  deleteUsergroup,
  updateUsergroup,
  getUsergroups,
};
