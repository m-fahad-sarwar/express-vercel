const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const CustomerSchema = new mongoose.Schema(
  {
    agencyId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    customerType: {
      type: String,
      required: true,
    },
    creditLimit: {
      type: Number,
      required: true,
    },
    startingCredit: {
      type: Number,
    },
    startingDebit: {
      type: Number,
    },
    passportNumber: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    contactPerson: {
      name: {
        type: String,
      },
      designation: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add plugins that convert mongoose to json and enable pagination
CustomerSchema.plugin(toJSON);
CustomerSchema.plugin(paginate);

const Customer = mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
