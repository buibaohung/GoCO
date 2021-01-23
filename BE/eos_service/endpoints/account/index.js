var fs = require('fs');
var messages = require('../../proto/domain/domain_pb');
var grpc = require('grpc');
var eos = require('../../eos')
var { getNextUsername } = require('../../util/eos')

exports.newEOSAccount = () => {
    return new Promise((resolve, reject) => {
        let accountName = "";
        let keys;

        var p = eos.generateKeys()
            .then(k => {
                keys = k
                throw null
            })
            .catch(err => {
                if (err) {
                    reject(err)
                } else {
                    throw null
                }
            })

        // we need to to get accountName many times. promise has to call reject
        for (let i = 0; i < 5; i++) {
            p = p.catch(getNextUsername).then(a => {
                if (typeof a != "string") {
                    // ignore this
                    return a
                }
                accountName = a
                console.log(i, accountName);

                return eos.createAccount(accountName, keys.publicKeys.owner)
            });
        }

        p.then(tx => {
            console.log("transaction", tx);

            let resp = {
                name: accountName,
                privateKey: keys.privateKeys.owner,
                publicKey: keys.publicKeys.owner
            }

            resolve(resp)
        })
            .catch(error => {
                console.log(error);
                reject(error)
            })
    })
}

exports.getPubFromPriv = (privateKey) => {
    if (!eos.isValidPrivate(privateKey)) {
        return null
    }

    return eos.getPublicKeyFromPrivateKey(privateKey)
}

exports.getNameFromPub = (pub) => {
    return eos.getAccountNameFromPublicKey(pub)
}

exports.getPubFromName = async (name) => {
    let acccount = await eos.rpc.get_account(name)
    let permission = acccount.permissions.find(p => p.perm_name == "active")
    if (!permission) {
        throw "can't find permission"
    }

    return permission.required_auth.keys[0].key
}