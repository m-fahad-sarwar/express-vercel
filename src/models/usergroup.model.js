const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const UsergroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  agencyId: {
    type: String,
    required: true,
  },
  apiPermissions: {
    type: [String],
    required: true,
  },
  tabPermissions: {
    dashboard: {
      type: [String],
      required: true,
    },
    user: {
      type: [String],
      required: true,
    },
  },
});

// Add plugins that convert mongoose to json and enable pagination
UsergroupSchema.plugin(toJSON);
UsergroupSchema.plugin(paginate);

const UsergroupModel = mongoose.model('UsergroupModel', UsergroupSchema);

module.exports = UsergroupModel;
