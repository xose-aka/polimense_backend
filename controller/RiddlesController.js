const dayjs = require("dayjs");

const Riddle = new (require("../model/Riddle").default)();
const Answer = new (require("../model/Answer").default)();
const User = new (require("../model/User").default)();

class RiddlesController {

    all(req, res) {

        let searchParam = req.query.type;

        if (searchParam === 'null') {
            Riddle.getAll().then((riddles) => {
                res.status(200).send(riddles);
            }).catch((error) => {
                res.status(503).send(error);
            });

        } else {
            Riddle.getAllFoods(searchParam).then((riddles) => {
                res.status(200).send(riddles);
            }).catch((error) => {
                res.status(503).send(error);
            });
        }
    }

    cancelOrder(req, res) {

        const userId = req.params.userId;

        Riddle.cancelOrder(userId).then((id) => {
            res.status(200).end();
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    save(req, res) {

        const newRiddle = {
            text: req.body.riddleText,
            duration: req.body.duration,
            difficulty: req.body.difficulty,
            hint1: req.body.hint1,
            hint2: req.body.hint2,
            correctAnswer: req.body.correctAnswer,
            authorId: req.body.authorId,
            status: 1,
            createdAt: dayjs()
        };

        Riddle.save(newRiddle).then((id) => {
            res.status(201).end();
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    getRiddle(req, res) {
        const riddleId = req.params.riddleId;

        Riddle.getRiddle(riddleId).then((riddle) => {
            res.status(200).send(riddle);
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    getRiddleReplies(req, res) {
        const riddleId = req.params.riddleId;

        Answer.getRiddleReplies(riddleId).then((replies) => {
            res.status(200).send(replies);
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    saveRiddleReply(req, res) {

        const riddleId = req.body.riddleId;
        const answer = req.body.answer;
        const currentTime = dayjs();

        let isCorrect = false;
        let status = 1;

        Riddle.getRiddle(riddleId).then((riddle) => {

            const responseAuthorId = req.body.authorId;
            // check if equal
            if (riddle.correctResponse === answer) {
                isCorrect = true;
                status = 0;
            }

            const newReply = {
                answer:     answer,
                authorId:   responseAuthorId,
                riddleId:   riddleId,
                responseAt: currentTime,
                isCorrect:  isCorrect
            };

            Answer.saveRiddleReply(newReply).then((newReplyId) => {

                if (newReplyId > 0) {

                    let fieldToUpdate;

                    fieldToUpdate = isCorrect ? 'correct_response_at' : 'first_response_at';

                    Riddle.updateResponse(fieldToUpdate, currentTime, status, riddleId).then((change) => {

                        // if answer is correct add score to responder
                        if (change > 0 && isCorrect === true) {
                            User.updateScore(riddle.level, responseAuthorId).then((change) => {
                                res.status(201).send({
                                    change: change,
                                    isCorrect: isCorrect
                                });
                            })
                        }

                    }).catch((error) => {
                        res.status(503).send(error);
                    });
                } else {
                    res.status(503).send({error: 'Reply not saved!'});
                }

                // save reply catch
            }).catch((error) => {
                res.status(503).send(error);
            });
            // get riddle catch
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    closeRiddle(req, res) {
        const riddleId = req.body.riddleId;
        const status   = req.body.status;

        Riddle.updateStatus(status, riddleId).then((change) => {



            res.status(200).send({
                change: change
            });
        }).catch((error) => {
            res.status(503).send(error);
        });
    }
}
exports.default = RiddlesController;