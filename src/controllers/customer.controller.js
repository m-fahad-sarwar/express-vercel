const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');
const pick = require('../utils/pick');
const Customer = require('../models/customer.model');

const createCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.createCustomer(req.body);

  res.status(httpStatus.CREATED).send({ customer });
});

const getCustomerById = async (id) => Customer.findById(id);

const updateCustomer = catchAsync(async (req, res) => {
  const Customer = await getCustomerById(req.params.customerId);
  const agencyIdString = Customer.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to update this user group.' });
  }

  const updatedCustomer = await customerService.updateCustomerById(req.params.customerId, req.body);
  res.send(updatedCustomer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  const Customer = await getCustomerById(req.params.customerId);
  const agencyIdString = Customer.agencyId.toString();

  if (agencyIdString !== req.body.agencyId) {
    return res.status(httpStatus.FORBIDDEN).send({ error: 'You are not allowed to delete this user group.' });
  }

  await customerService.deleteCustomerById(req.params.customerId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getCustomers = catchAsync(async (req, res) => {
  const agencyId = req.body.agencyId;
  const filter = { agencyId };
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await customerService.queryCustomer(filter, options);
  res.send(result);
});

module.exports = {
  createCustomer,
  deleteCustomer,
  updateCustomer,
  getCustomers,
};
