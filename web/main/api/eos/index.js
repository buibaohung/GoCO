import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import ecc from 'eosjs-ecc'

class EOS {
    constructor(){
        this._initProperties();
    }

    _initProperties(){
        this.contract = "hieudeptrai2"

        let rpcEndpointStr = "https://api.jungle.alohaeos.com,https://jungle2.cryptolions.io:443"
        this.rpcEndpoints = rpcEndpointStr.split(",")
        this.rpc = null;
        this.signatureProvider = null;
        this.api = null;
        this.account = "";
    }

    async connect(){
        console.log("Connecting to blockchain rpc.");
        // select RPCs
        for (let i = 0; i < this.rpcEndpoints.length; i++) {
            const rpcEndpoint = this.rpcEndpoints[i];

            console.log(`Trying to connect ${rpcEndpoint}`);
            const rpc = new JsonRpc(rpcEndpoint);

            // test RPC is alive
            try {
                await rpc.get_account(this.contract)
                
                if (!this.rpc) {
                    this.rpc=rpc
                    console.log(`Connected to ${rpcEndpoint}`);
                    break
                }
            } catch (error) {}
        }

        if (!this.rpc) {
            throw "Can't connect blockchain rpc"
        }

        // load accountName & privateKey
        let account = this.getAccount()
        
        if (account) {
            this.account = account.account
            this.addKeyToJsSignatureProvider([account.privateKey])
        }
    }

    addKeyToJsSignatureProvider(newKeys){
        if (!newKeys || newKeys.length < 1) {
            return
        }

        let privateKeys = []

        // get old keys if exist
        // if (this.signatureProvider) {
        //     let keys = this.signatureProvider.keys
        //     for (const value of keys.values()) {
        //         privateKeys.push(value)
        //     }
        // }

        // add new key
        privateKeys = privateKeys.concat(newKeys)

        // init api
        
        this.signatureProvider = new JsSignatureProvider(privateKeys);
        this.api = new Api({
            rpc: this.rpc,
            signatureProvider: this.signatureProvider,
        });
    }

    getTable(_tableName, _limit){
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

    callAction(_functionName, _params, _eosAccountName = this.account, _eosKey){
        if (_eosKey) {
            this.addKeyToJsSignatureProvider([_eosKey])
        }

        return this.api.transact({
            actions: [{
                account: this.contract,
                name: _functionName,
                authorization: [{
                    actor: _eosAccountName,
                    permission: 'active',
                }],
                data: _params,
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
    }

    isValidPrivate(privateKey){
        return ecc.isValidPrivate(privateKey)
    }

    getPublicKeyFromPrivateKey(privateKey){
        return ecc.privateToPublic(privateKey)
    }

    async getPublicKeyFromAccount(account){
        let acc = await this.rpc.get_account(account)
        let permission = acc.permissions.find(per=>per.perm_name === "active")
        return permission.required_auth.keys[0].key
    }

    setAccount(account, privateKey){
        if (account == "" || privateKey == "") {
            return
        }

        let data = {account, privateKey}
        localStorage.setItem("eospk", JSON.stringify(data))
        this.account = account
        this.addKeyToJsSignatureProvider([privateKey])
    }

    getAccount(){
        let data = localStorage.getItem("eospk")
        if (data == "") {
            return null
        }

        try {
            return JSON.parse(data)
        } catch (error) {
            return null
        }
    }

    isMissPrivateKey(){
        let account = this.getAccount()
        if (!account) {
            return true
        }
        
        if (this.isValidPrivate(account.privateKey)) {
            return false
        }

        return true
    }
}

var eos = new EOS()
eos.connect()
export default eos;