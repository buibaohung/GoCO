const { Keygen } = require('eosjs-keygen')
const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const ecc = require('eosjs-ecc');
const fetch = require('node-fetch');
const { TextEncoder, TextDecoder } = require('util');
const { getEnv } = require('../util/env');

class EOS {
    constructor() {
        this._initProperties();
    }

    _initProperties() {
        this.contract = getEnv("CONTRACT", "sgexlcsqpwtc");

        let rpcEndpointStr = getEnv("RPC_ENDPOINTS", "https://api.testnet.eos.io");
        this.rpcEndpoints = rpcEndpointStr.split(",")
        this.rpc = null;
        this.signatureProvider = null;
        this.api = null;
    }

    async connect() {
        console.log("Connecting to blockchain rpc.");
        // select RPCs
        for (let i = 0; i < this.rpcEndpoints.length; i++) {
            const rpcEndpoint = this.rpcEndpoints[i];

            console.log(`Trying to connect ${rpcEndpoint}`);
            const rpc = new JsonRpc(rpcEndpoint, { fetch });

            // test RPC is alive
            try {
                await rpc.get_account(this.contract)

                if (!this.rpc) {
                    this.rpc = rpc
                    console.log(`Connected to ${rpcEndpoint}`);
                    break
                }
            } catch (error) { }
        }

        if (!this.rpc) {
            throw "Can't connect blockchain rpc"
        }

        // init api
        let contractKeyStr = getEnv("CONTRACT_KEYS", "5JwjnTWhk5GSXdi36DtgHPCmhdq29WyW1SudZ4BcspXVCCW8sRh");
        if (!contractKeyStr) {
            throw "Miss CONTRACT_KEYS"
        }
        let contractKeys = contractKeyStr.split(",")
        this.addKeyToJsSignatureProvider(contractKeys)
    }

    addKeyToJsSignatureProvider(newKeys) {
        if (!newKeys || newKeys.length < 1) {
            return
        }

        let privateKeys = []

        // get old keys if exist
        if (this.signatureProvider) {
            let keys = this.signatureProvider.keys
            for (const value of keys.values()) {
                privateKeys.push(value)
            }
        }

        // add new key
        privateKeys = privateKeys.concat(newKeys)
        console.log("add new key", privateKeys)

        // init api

        this.signatureProvider = new JsSignatureProvider(privateKeys);
        this.api = new Api({
            rpc: this.rpc,
            signatureProvider: this.signatureProvider,
            textDecoder: new TextDecoder(),
            textEncoder: new TextEncoder(),
        });
    }

    generateKeys() {
        return Keygen.generateMasterKeys();
    }

    getTable(_tableName, _limit) {
        return this.rpc.get_table_rows({
            json: true,
            code: this.contract,
            scope: this.contract,
            table: _tableName,
            limit: _limit,
            reverse: false,
            show_payer: true,
        })
    }

    getFacilty(accountName) {
        return new Promise((resolve, reject) => {
            this.rpc.get_table_rows({
                json: true,
                code: this.contract,
                scope: this.contract,
                table: "facility",
                lower_bound: accountName,
                limit: 1,
                reverse: false,
                show_payer: true,
            })
                .then(data => {
                    if (data.rows.length <= 0) {
                        throw "Not found facility"
                    }

                    resolve(data.rows[0].data)
                })
                .catch(reject)
        })
    }

    callAction(_functionName, _params, _eosAccountName = this.contract, _eosKey) {
        if (_eosKey) {
            this.addKeyToJsSignatureProvider([_eosKey])
        }

        console.log("xxxx", _eosKey)

        return this.api.transact({
            actions: [{
                account: this.contract,
                name: _functionName,
                authorization: [{
                    actor: _eosAccountName,
                    permission: 'owner',
                }],
                data: _params,
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
    }

    createAccount(_accountName, _publicKey, _creator = this.contract) {
        let actionNewAccount = {
            account: 'eosio',
            name: 'newaccount',
            authorization: [{
                actor: _creator,
                permission: 'owner',
            }],
            data: {
                creator: _creator,
                name: _accountName,
                owner: {
                    threshold: 1,
                    keys: [{
                        key: _publicKey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                },
                owner: {
                    threshold: 1,
                    keys: [{
                        key: _publicKey,
                        weight: 1
                    }],
                    accounts: [],
                    waits: []
                },
            },
        }

        let actionBuyRamBytes = {
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [{
                actor: _creator,
                permission: 'owner',
            }],
            data: {
                payer: _creator,
                receiver: _accountName,
                bytes: 8192,
            },
        }

        let actionDelegatebw = {
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{
                actor: _creator,
                permission: 'owner',
            }],
            data: {
                from: _creator,
                receiver: _accountName,
                stake_net_quantity: '1.0000 EOS',
                stake_cpu_quantity: '1.0000 EOS',
                transfer: false,
            },
        }

        return this.api.transact({
            actions: [
                actionNewAccount,
                actionBuyRamBytes,
                actionDelegatebw,
            ]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
    }

    isValidPrivate(privateKey) {
        return ecc.isValidPrivate(privateKey)
    }

    getPublicKeyFromPrivateKey(privateKey) {
        return ecc.privateToPublic(privateKey)
    }

    async getPublicKeyFromAccount(account) {
        let acc = await this.rpc.get_account(account)
        let permission = acc.permissions.find(per => per.perm_name === "owner")
        return permission.required_auth.keys[0].key
    }

    getAccountNameFromPublicKey(public_key) {
        return new Promise((resolve, reject) => {
            fetch(this.rpc.endpoint + "/v1/history/get_key_accounts", {
                method: "POST",
                body: JSON.stringify({ public_key }),
            })
                .then(res => res.json())
                .then(res => {
                    console.log(public_key, res);

                    if (res.account_names.length <= 0) {
                        throw "Account not found"
                    }

                    resolve(res.account_names[0])
                })
                .catch(reject)
        })
    }
}

var eos = new EOS()
module.exports = eos