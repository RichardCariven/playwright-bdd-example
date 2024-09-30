# Project variables
PROJECT_NAME ?= local
DC := docker-compose --project-name $(PROJECT_NAME)
RUN_AND_REMOVE := $(DC) run --rm

# ---- Installation Targets ----
install-deps-host:
	$(RUN_AND_REMOVE) -e NODE_ENV=development -v ${PWD}:/usr/src/app rayoweb yarn install

build:
	./prepare_directories.sh
	docker-compose build rayoweb

# ---- Development Targets ----
local:
	$(DC) up -d rayoweb

# ---- Testing Targets ----
unit-test:
	$(RUN_AND_REMOVE) rayoweb yarn test

e2e-test:
	$(RUN_AND_REMOVE) playwright

e2e-test-ui:
	$(RUN_AND_REMOVE) playwright yarn e2e:ui

test: unit-test e2e-test
	$(DC) stop

# ---- Miscellaneous Targets ----
logs:
	$(DC) logs -f rayoweb

stop:
	$(DC) stop

down:
	$(DC) down -v

clean:
	@echo "Warning: This will clean untracked files using git."
	@read -p "Are you sure? (y/n)" confirm; \
	[[ "$$confirm" == "y" ]] && sudo git clean -dfX

help:
	@echo "Available targets:"
	@echo ""
	@echo "  install-deps-host: Install the dependencies on the host"
	@echo "  build: Build the docker images"
	@echo "  local: Start the local development environment"
	@echo "  unit-test: Run the unit tests"
	@echo "  e2e-test: Run the end-to-end tests"
	@echo "  e2e-test-ui: Run the end-to-end tests with UI"
	@echo "  test: Run all the tests"
	@echo "  format: Format the code"
	@echo "  format-fix: Format the code and fix the issues"
	@echo "  pre-commit: Run the pre-commit checks"
	@echo "  logs: Show the logs of the running containers"
	@echo "  stop: Stop the running containers"
	@echo "  down: Stop and remove the containers"
	@echo "  clean: Clean untracked files using git"
