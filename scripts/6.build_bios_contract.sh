cd /eosio.contracts/contracts/eosio.bios
mkdir -p build/eosio.bios
cd src
eosio-cpp -I ../include -abigen -o eosio.bios.wasm eosio.bios.cpp
mv eosio.bios.wasm ../build/eosio.bios
mv eosio.bios.abi ../build/eosio.bios
cd /eosio.contracts/contracts/eosio.bios/build
cleos --wallet-url http://keosd:8899 set contract eosio eosio.bios --abi eosio.bios.abi