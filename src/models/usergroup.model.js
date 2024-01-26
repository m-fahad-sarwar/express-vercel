const mongoose = require('mongoose');

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

const UsergroupModel = mongoose.model('UsergroupModel', UsergroupSchema);

module.exports = UsergroupModel;
