const appDatabase = require("./Database").default;

const table = 'users';

class User {

    getTop3Users() {

        const sql = `SELECT id, nickname, score FROM users ORDER BY score DESC LIMIT 3;`;
            return new Promise((resolve, reject) => {
                appDatabase.all(sql, [], (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                });
       });
    }

    getUser(id) {

        const sql = `SELECT * FROM users WHERE id=? LIMIT 1;`;
        return new Promise((resolve, reject) => {
            appDatabase.get(sql, [id], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    getUserOrder(userId) {

        const sql = `SELECT * FROM \`order\` WHERE user_id=? LIMIT 1;`;
        return new Promise((resolve, reject) => {
            appDatabase.get(sql, [userId], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    updateScore(score, userId) {

        const sql = `UPDATE users SET score = score + ? WHERE id=?;`;
        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [score, userId], (err) => {
                if (err){
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
            });
        });
    }
}

exports.default = User;
  