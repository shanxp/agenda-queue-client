/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */

const { MongoClient } = require('mongodb');

const now = new Date(Date.now() - 60000); // -1 min

const requeue = (jobName) => {
  // Return promise
  return MongoClient.connect(config.connection)
    .then((client) => {
      const db = client.db(config.db_main_name);
      const collection = db.collection(config.db_main_collection);
      collection.updateMany({
        name: jobName, lockedAt: { $ne: null }, nextRunAt: { $eq: null }, lastRunAt: { $ne: null },
      },
      {
        $unset: {
          lockedAt: null, failReason: null, failCount: null, failedAt: null, lastRunAt: null, lastFinishedAt: null,
        },
        $set: { nextRunAt: now, lastModifiedBy: null },
      });
    });
};

module.exports = requeue;
