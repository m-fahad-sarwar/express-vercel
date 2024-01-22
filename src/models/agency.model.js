const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const agencySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      uniqe: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    logoUrl: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: false
    },
    isAssigned: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
agencySchema.plugin(toJSON);
agencySchema.plugin(paginate);




const User = mongoose.model('Agency', agencySchema);

module.exports = User;
