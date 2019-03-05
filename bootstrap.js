/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');

const config = {
  app: {
    name: pkg.name,
    version: pkg.version,
  },
  path: {
    project: __dirname,
    app: path.join(__dirname, '/app'),
    env: path.join(__dirname, '/app/env'),
  },
  connection: null,
};

try {
  const currEnv = JSON.parse(fs.readFileSync(`${config.path.env}/${process.env.NODE_ENV}.json`));
  Object.keys(currEnv).forEach((key) => {
    config[key] = currEnv[key];
  });
  config.connection = `${config.db_driver}://${config.db_main_user}:${config.db_main_password}@${config.db_main_host}/${config.db_main_name}?authSource=${config.db_auth_source}`;
} catch (e) {
  console.error(__filename, e);
  process.exit(1);
}

global.config = config;
