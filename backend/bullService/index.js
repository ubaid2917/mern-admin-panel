const Bull = require("bull");
require("dotenv").config();

// ====== Queues ======
const jobQueue = new Bull("jobQueue", {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  },
  settings: {
    lockDuration: 60000,
  },
});

// ====== Schedulers ======
const scheduleJob = (jobName, data, delay) => {
  jobQueue.add(jobName, data, {
    delay,
    removeOnComplete: true,
    attempts: 3,
    backoff: 5000,
  });
};

// ====== Process Jobs ======
const processJob = (jobName, jobHandler) => {
  jobQueue.process(jobName, async (job) => {
    try {
      await jobHandler(job);
      console.log(`Job ${jobName} completed successfully`);
    } catch (err) {
      console.error(`Job ${jobName} failed:`, err);
    }
  });
};

module.exports = {
  scheduleJob,
  processJob,
  jobQueue,
};
