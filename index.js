/* eslint-disable wrap-iife */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

require('./bootstrap');

const { queueObj, queuePromise, requeue } = require(`${config.path.app}/services`);

queueObj.define(config.db_task_name, (job, done) => {
  console.log('Log received', job.attrs.data);
  done();
});

// eslint-disable-next-line func-names
(async function () {
  try {
    await queuePromise();
    await requeue(config.db_task_name); // Re-queue any jobs that are stuck in 'running' status
    await queueObj.start();
    console.log('Queue client is ready');
  } catch (e) {
    console.error('Error when starting the app', e);
    process.exit(1);
  }
})();
