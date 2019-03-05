/* eslint-disable no-console */

const { promisify } = require('util');
const os = require('os');
const Agenda = require('agenda');

const params = {
  db: {
    address: config.connection,
    collection: config.db_main_collection,
    options: {
      useNewUrlParser: true,
    },
  },
  name: `${config.app.name} ${config.app.version} - ${os.hostname()} ${process.pid}`,
};

const queueObj = new Agenda(params);

const queueCallback = {
  init: cb => new Agenda(params, cb),
};

const queuePromise = promisify(queueCallback.init);
module.exports = { queueObj, queuePromise };
