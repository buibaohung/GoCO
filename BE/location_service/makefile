.PHONY: gen-protoc server client build local-db

PROJECT_NAME=location_service

run:
	@go run cmd/server/main.go

build:
	@go build -ldflags "-s -w" -o bin/server/main cmd/server/main.go

local-db:
	@echo "Setup db..."
	@docker-compose -f docker-compose.yml -p $(PROJECT_NAME) down
	@docker-compose -f docker-compose.yml -p $(PROJECT_NAME) up -d
	@echo "Waiting for database connection..."
	@while ! docker exec $(PROJECT_NAME)_postgres_1 pg_isready -h localhost -p 5432 > /dev/null; do \
		sleep 1; \
	done
	@echo "Migrate db..."
	docker cp ./config/database/db.sql $(PROJECT_NAME)_postgres_1:/db.sql
	docker exec -u postgres $(PROJECT_NAME)_postgres_1 psql app postgres -f /db.sql