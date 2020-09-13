var fs = require('fs');
var AsyncLock = require('async-lock');

let filePath = 'accountIndex'

let accountIndex = 0
let lock = new AsyncLock();

lock.acquire(filePath, done => {
    fs.readFile(filePath, (err, data)=>{
        if (err) {
            return done(err)
        }
    
        data = data.toString()
        try {
            accountIndex = parseInt(data)
            done(null, accountIndex)
        } catch (error) {
            return done(error)
        }
    })
})

exports.getNextUsername = () => {
    return new Promise((resolve, reject) => {
        lock.acquire(filePath, done => {

            // convert to decimal
            let tmp = ""
            accountIndex.toString().split("").forEach(char => {
                let x = parseInt(char) - 1
                tmp += x
            });
            let dec = parseInt(tmp, 5)

            // increase
            dec++

            // convert to 5
            tmp = ""
            dec.toString(5).split("").forEach(char => {
                let x = parseInt(char) + 1
                tmp += x
            });
            tmp = tmp.padStart(7, "1")
            accountIndex = parseInt(tmp)

            fs.writeFile(filePath, accountIndex, 'utf8', err => {
                if (err) {
                    done(err)
                    return reject(err)
                }

                let accountname = "fotra" + accountIndex;

                done(null, accountname)
                resolve(accountname);
            })
        })
    })
}