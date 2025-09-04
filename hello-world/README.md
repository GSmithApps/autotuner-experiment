This is the workflow and worker code.

## Running this sample

Run `temporal server start-dev` to start the server

## To run the worker

Run this from the hello-world directory

```bash
docker compose up --build
```

Then if you want to make a change, you can stop the container and run it again.

## To start the workflows

you can run the workflows in another terminal (also in the hello-world directory) with

```bash
npm run workflow
```
