const dayjs = require("dayjs");

const User = new (require("../model/User").default)();
const Riddle = new (require("../model/Riddle").default)();

class UserController {

    top3Users(req, res) {

        User.getTop3Users().then((users) => {
            res.status(200).send(users);
        }).catch((error) => {
            res.status(503).send(error);
        });

    }

    getUser(req, res) {
        const userId = req.params.userId;

        User.getUser(userId).then((user) => {

            User.getUserOrder(user.id).then( (order) => {

                if (order === undefined) {
                    user.order = {}
                } else {
                    user.order = {
                        orderNumber: order.order_number,
                        timeSlot: order.time_slot,
                    }
                }

                res.status(200).send(user);
            } ).catch( (error) => {
                res.status(503).send(error);
            })
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    saveOrder(req, res) {
        const newOrder = {
            userId: req.body.userId,
            timeId: req.body.timeId,
            timeSlot: req.body.timeSlot
        };

        Riddle.cancelOrder(newOrder.userId).then( () => {
            User.saveOrder(newOrder).then((response) => {
                res.status(201).send('Created');
            }).catch((error) => {
                res.status(503).send(error);
            });
        }).catch((error) => {
            res.status(503).send(error);
        });
    }

    edit(req, res) {
        const userId = req.body.userId;

        const data = {
            email: req.body.email,
            phone: req.body.phone
        };

        User.edit(userId, data).then((response) => {
            res.status(200).send('Updated');
        }).catch((error) => {
            res.status(500).send(error);
        });
    }

    pay(req, res) {
        const userId = req.body.userId;
        const amount = req.body.amount;

        User.pay(userId, amount).then((response) => {
            res.status(200).send('Updated');
        }).catch((error) => {
            res.status(503).send(error);
        });
    }
}
exports.default = UserController;