cleos --wallet-url http://keosd:8899 wallet create -f account
cleos --wallet-url http://keosd:8899 wallet open
cleos --wallet-url http://keosd:8899 wallet unlock --password 123
# cleos --wallet-url http://keosd:8899 create key -f key
# public key EOS5s52FriHwdXadBG3W4W3ZWx2ZTWLqRrFyiZKviDmhikkuTJURR
# private key 5Kh16GTXK65g6TPs4JRwRXexXuzJqeMRDqfavy8jmAtCGKDRahZ
cleos --wallet-url http://keosd:8899 wallet import --private-key 5Kh16GTXK65g6TPs4JRwRXexXuzJqeMRDqfavy8jmAtCGKDRahZ

cleos --url https://jungle2.cryptolions.io:443 get account hieudeptraj1
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 transfer hieudeptraj1 hieudeptrai2 "1.0000 EOS" "hello"

# build contract
eosio-cpp -I food/include -abigen -o food/food.wasm food/src/food.cpp

# set contract
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 set contract hieudeptraj1 food -p hieudeptraj1@active
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 set account permission hieudeptraj1 active --add-code

cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 set contract hieudeptrai2 food -p hieudeptrai2@active
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 set account permission hieudeptrai2 active --add-code

# hieudeptraj1 buy ram for hieudeptrai2
cleos system buyram hieudeptraj1 hieudeptrai2 "10 EOS"
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 system buyram hieudeptraj1 hieudeptraj1 "100 EOS"

# bandwith & cpu
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 system delegatebw hieudeptrai2 hieudeptrai2 "1 EOS" "1 EOS"

# call function
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 push action hello hi '["hieudeptraj1"]' -p hieudeptraj1

# create account
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 push action eosio newaccount '{"creator":"hieudeptraj1","name":"fotra1234512","owner":{"threshold":1,"keys":[{"key":"EOS82mjpLeiXowttEpsW8LgALrspG7oFSand2wS3WYmPnV3LvTFWd","weight":1}],"accounts":[],"waits":[]},"active":{"threshold":1,"keys":[{"key":"EOS82mjpLeiXowttEpsW8LgALrspG7oFSand2wS3WYmPnV3LvTFWd","weight":1}],"accounts":[],"waits":[]}}' -p hieudeptraj1@active
cleos --wallet-url http://keosd:8899 --url https://jungle2.cryptolions.io:443 system newaccount -x 1000 --stake-net "0.1 EOS" --stake-cpu "0.1 EOS" --buy-ram-kbytes 8 --transfer hieudeptraj1 fotra1234512 EOS82mjpLeiXowttEpsW8LgALrspG7oFSand2wS3WYmPnV3LvTFWd EOS82mjpLeiXowttEpsW8LgALrspG7oFSand2wS3WYmPnV3LvTFWd