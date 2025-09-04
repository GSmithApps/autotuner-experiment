This is the workflow and worker code.

## Running this sample

Run `temporal server start-dev` to start the server

## To run the worker

Run this (start from top level)

```bash
cd hello-world
docker compose up --build
```

Then if you want to make a change, you can stop the container and run it again.

## To start the workflows

you can run the workflows in another terminal (start from top-level)

```bash
cd hello-world
npm install
npm run workflow
```
