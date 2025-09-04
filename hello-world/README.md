# Hello World

This is the default project that is scaffolded out when you run `npx @temporalio/create@latest ./myfolder`.

The [Hello World Tutorial](https://learn.temporal.io/getting_started/typescript/hello_world_in_typescript/) walks through the code in this sample.

## Running this sample

gotta run `temporal server start-dev` to start the server

to run the worker:

1. cd into the hello-world directory
2. run `npm install`
3. run `npm install --package-lock-only` to get the lock file

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
