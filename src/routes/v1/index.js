const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const adminRoute = require('./admin.route');
const agencyRoute = require('./agency.route');
const bankRoute = require('./bank.route');
const userGroupRoute = require('./userGroup.route');
const customerRoute = require('./customer.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/agency',
    route: agencyRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/usergroup',
    route: userGroupRoute,
  },
  {
    path: '/bank',
    route: bankRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
