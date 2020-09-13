.PHONY: build

PROJECT_DIR = $(shell pwd)

build:
	docker run --rm -i -t -v $(PROJECT_DIR):/food eostudio/eosio.cdt:v1.6.3 eosio-cpp -I food/include -abigen -o food/food.wasm food/src/food.cpp