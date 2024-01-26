const Joi = require('joi');

// *************************** This isn't being used RN *************************************

const createAgency = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required(),
    // role: Joi.string().required(),
  }),
};
const updateAgency = {
  params: Joi.object().keys({
    agencyId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      name: Joi.string().custom(password),
      logoUrl: Joi.string(),
      isActive: Joi.boolean(),
      isAssigned: Joi.boolean(),
    })
    .min(1),
};
const deleteAgency = {
  params: Joi.object().keys({
    agencyId: Joi.string().custom(objectId),
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
  createAgency,
  deleteAgency,
  updateAgency,
  createUser,
  getAgencies,
};
