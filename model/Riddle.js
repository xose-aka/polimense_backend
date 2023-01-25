const appDatabase = require("./Database").default;

const table = 'food';
const users = 'users';

class Riddle {

    // getAll() {
    //
    //     const sql = `SELECT r.id, text, duration, level, hint1, hint2, correct_response AS correctResponse,
    //                         correct_response_at AS correctResponseAt,
    //                         first_response_at AS firstResponseAt,
    //                         created_at AS createdAt, status, nickname, u.id AS authorId
    //                     FROM ${table} r
    //                     JOIN ${users} u ON u.id=r.author_id;`;
    //         return new Promise((resolve, reject) => {
    //             appDatabase.all(sql, [], (err, rows) => {
    //                 if (err)
    //                     reject(err);
    //                 else
    //                     resolve(rows);
    //             })
    //    });
    // };

    getAllByStatus(status) {

        const sql = `SELECT r.id, text, duration, level, hint1, hint2, correct_response AS correctResponse, 
                            correct_response_at AS correctResponseAt, 
                            first_response_at AS firstResponseAt, 
                            created_at AS createdAt, status, nickname, u.id AS authorId
                        FROM ${table} r
                        JOIN ${users} u ON u.id=r.author_id
                        WHERE status=?;`;
        return new Promise((resolve, reject) => {
            appDatabase.all(sql, [status], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        });
    };

    getAllFoods(type) {

        const sql = `SELECT *
                        FROM \`${table}\`
                        WHERE type=?;`;
        return new Promise((resolve, reject) => {
            appDatabase.all(sql, [type], (err, rows) => {
                console.log(rows);
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        });
    };

    getAll() {

        const sql = `SELECT *
                        FROM \`${table}\`;`;
        return new Promise((resolve, reject) => {
            appDatabase.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            })
        });
    };

    cancelOrder(userId) {
        const sql = `DELETE FROM \`order\` WHERE user_id=? ;`

        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [userId], function (err) {
                console.log(userId);

                if (err){
                    reject(err);
                }
                else {
                    resolve(true);
                }
            })
        });
    };

    save(newRiddle) {
        const sql = `INSERT INTO ${table}('text', 'duration', 'level', 'hint1', 'hint2', 'correct_response', 'created_at', 'status', 'author_id')
                                    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);`

        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [newRiddle.text, newRiddle.duration, newRiddle.difficulty, newRiddle.hint1, newRiddle.hint2,
                                  newRiddle.correctAnswer, newRiddle.createdAt, newRiddle.status, newRiddle.authorId], function (err) {
                if (err){
                    reject(err);
                }
                else {
                    resolve(this.lastID);
                }
            })
        });
    };

    getRiddle(riddleId) {
        const sql = `SELECT r.id, text, duration, level, hint1, hint2, correct_response AS correctResponse, 
                            correct_response_at AS correctResponseAt, 
                            first_response_at AS firstResponseAt, 
                            created_at AS createdAt, status, nickname, u.id AS authorId
                        FROM ${table} r
                        JOIN ${users} u ON u.id=r.author_id AND r.id=?;`;

        return new Promise((resolve, reject) => {
            appDatabase.get(sql, [riddleId], (err, row) => {
                if (err){
                    reject(err);
                }
                else {
                    resolve(row);
                }
            })
        });
    };

    updateResponse(fieldToUpdate, currentTime, status, riddleId) {
        const sql = `UPDATE ${table} SET ${fieldToUpdate} = '${currentTime}', status=? WHERE id=?`;

        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [status, riddleId], function (err) {
                if (err){
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
            })
        });
    }

    updateStatus(status, riddleId) {
        const sql = `UPDATE ${table} SET status=? WHERE id=?`;

        return new Promise((resolve, reject) => {
            appDatabase.run(sql, [status, riddleId], function (err) {
                if (err){
                    reject(err);
                }
                else {
                    resolve(this.changes);
                }
            })
        });
    }
}

exports.default = Riddle;
  