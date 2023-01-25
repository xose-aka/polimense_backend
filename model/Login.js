const appDatabase = require("./Database").default;
const crypto = require("crypto");

class Login {
    getUser(nickname, password) {
       const sql = "SELECT * FROM users WHERE UPPER(nickname)=UPPER(?)"
            return new Promise((resolve, reject) => {
                appDatabase.get(sql,[nickname],(err,row)=>{
                    if (err){
                        reject(err);
                    }
                    else{

                        if (row === undefined) {
                            resolve(false);
                        } else {

                            const user = {id: row.id, nickname: row.nickname, score: row.score};

                            crypto.scrypt(password, row.salt, 64, function (err, hashedPassword) {
                                if (err) {
                                    reject(err);
                                }

                                if (crypto.timingSafeEqual(Buffer.from(row.password, 'hex'), hashedPassword)) {
                                    resolve(user);
                                } else {
                                    resolve(false);
                                }
                            });
                        }
                    }
                })
       }    );
    };

}

exports.default = Login;
