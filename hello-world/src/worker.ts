// @@@SNIPSTART typescript-hello-worker
import { NativeConnection, Worker, Runtime } from '@temporalio/worker';

async function run() {


  Runtime.install({
    telemetryOptions: {
      metrics: {
        prometheus: { bindAddress: '0.0.0.0:9464' }, // Prometheus will scrape metrics from http://localhost:9464/metrics
      },
    },
  });

  // Step 1: Establish a connection with Temporal server.
  //
  // Worker code uses `@temporalio/worker.NativeConnection`.
  // (But in your application code it's `@temporalio/client.Connection`.)
  const connection = await NativeConnection.connect({
    address: process.env.TEMPORAL_ADDRESS ?? 'host.docker.internal:7233',
  });
  try {
    // Step 2: Register Workflows and Activities with the Worker.
    const worker = await Worker.create({
      connection,
      namespace: 'default',
      taskQueue: 'hello-world',
      // Workflows are registered using a path as they run in a separate JS context.
      workflowsPath: require.resolve('./workflows'),
      // maxConcurrentWorkflowTaskExecutions: 15,
      maxCachedWorkflows: 60000,
      tuner: {
        tunerOptions: {
          targetCpuUsage: .9,
          targetMemoryUsage: .7,
        }
      }
    });

    // Step 3: Start accepting tasks on the `hello-world` queue
    //
    // The worker runs until it encounters an unexpected error or the process receives a shutdown signal registered on
    // the SDK Runtime object.
    //
    // By default, worker logs are written via the Runtime logger to STDERR at INFO level.
    //
    // See https://typescript.temporal.io/api/classes/worker.Runtime#install to customize these defaults.
    await worker.run();
  } finally {
    // Close the connection once the worker has stopped
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
