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


  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(client.workflow.start(example, {
      taskQueue: 'hello-world',
      args: ['Temporal'],
      workflowId: 'workflow-' + nanoid(),
    }));
  }
  
  await Promise.all(promises);

}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
