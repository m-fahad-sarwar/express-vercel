const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createUsergroup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    agencyId: Joi.string().required(),
    apiPermissions: Joi.array().items(Joi.string()).required(),
    tabPermissions: Joi.object()
      .keys({
        dashboard: Joi.array().items(Joi.string()).required(),
        user: Joi.array().items(Joi.string()).required(),
      })
      .required(),
  }),
};

const updateAgency = {
  params: Joi.object().keys({
    user_groupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      agencyId: Joi.string(),
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

const deleteAgency = {
  params: Joi.object().keys({
    user_groupId: Joi.string().custom(objectId),
  }),
};

const getAgencies = {
  query: Joi.object().keys({
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  createUsergroup,
  deleteAgency,
  updateAgency,
  getAgencies,
};
