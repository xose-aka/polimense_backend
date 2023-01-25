const appDatabase = require("./Database").default;

const table = 'answers';
const users = 'users';

class Answer {

    getRiddleReplies(riddleId) {

        const sql = `SELECT a.id, text, response_at AS responseAt, is_correct AS isCorrect, u.nickname AS authorNickname, author_id AS authorId
                        FROM ${table} a
                        JOIN ${users} u ON u.id=a.author_id AND a.riddle_id=?;`;
            return new Promise((resolve, reject) => {
                appDatabase.all(sql, [riddleId], (err, rows) => {
                    if (err)
                        reject(err);
                    else
                        resolve(rows);
                })
       });
    };

    saveRiddleReply(newReply) {
        const sql = `INSERT INTO ${table}('text', 'response_at', 'is_correct', 'author_id', 'riddle_id')
                                    VALUES(?, ?, ?, ?, ?);`

        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [newReply.answer, newReply.responseAt, newReply.isCorrect, newReply.authorId, newReply.riddleId], function (err) {
                if (err){
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            })
        });
    }
}

exports.default = Answer;
  