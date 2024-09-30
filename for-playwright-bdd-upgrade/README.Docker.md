## Building and running Rayo Web

> :information_source: TL;DR: Run `make build` to build the image, `make local` to run the container, and `make stop` to stop the container.

You can use any [Docker Compose commands](https://docs.docker.com/compose/reference/) but there is a `Makefile` with commonly used commands.

To build the image, run:

```bash
make build
```

> :information_source: This will also install the dependencies on the host.

To run the container, run:

```bash
make local
```

> :information_source: Rayo Web will be available at http://localhost:3000.

To stop the container, run:

```bash
make stop
```

or to stop and remove the container, run:

```bash
make down
```

## Testing, logs, and other commands

To run the tests, run:

```bash
make test
```

To see the logs, run:

```bash
make logs
```

For more commands, see the `Makefile` or run `make help`.

## Deploying Rayo Web to the cloud

> :warning: This has not been implemented yet.

### Deploying to Development

Any push to a pull request branch will trigger the building and publishing of a Docker image that will be deployed to the development environment.

### Deploying to Stage

Any push to the `main` branch will trigger the building and publishing of a Docker image that will be deployed to the stage environment.

### Deploying to Production

Tagging a release will trigger the building and publishing of a Docker image that will be deployed to the production environment.

## References

- [Docker's Node.js guide](https://docs.docker.com/language/nodejs/)
