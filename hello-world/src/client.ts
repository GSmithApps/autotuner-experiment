// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location
  const connection = await Connection.connect({ address: 'localhost:7233' });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });


  // Helper sleep function
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const batchCount = 80; // Number of times to repeat the batch
  const batchSize = 1000; // Number of workflows per batch (80000 / 80)
  const delayMs = 250; // Delay in ms between batches

  for (let batch = 0; batch < batchCount; batch++) {
    const promises = [];
    for (let i = 0; i < batchSize; i++) {
      promises.push(client.workflow.start(example, {
        taskQueue: 'hello-world',
        args: ['Temporal'],
        workflowId: 'workflow-' + nanoid(),
      }));
    }
    await Promise.all(promises);
    console.log(`Started batch ${batch + 1}/${batchCount} of ${batchSize} workflows`);
    if (batch < batchCount - 1) {
      await sleep(delayMs);
    }
  }

}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
