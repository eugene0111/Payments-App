const express = require("express");
const { authMiddleWare } = require("../middleware");
const { Account, User } = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router();

accountRouter.get('/balance', authMiddleWare, async (req, res) => {
    const userId = req.userId;
    const accounts = await Account.findOne({
        userId: userId,
    });

    if (!accounts) {
        return res.status(404).json({
            message: "Account not found",
        });
    }

    const balance = accounts.balance;
    return res.status(200).json({
        message: balance,
    });
});

accountRouter.post('/transfer', authMiddleWare, async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body;

    const user = await Account.findOne({
        userId: req.userId,
    }).session(session);

    if (!user || user.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance",
        });
    }

    const account = await Account.findOne({
        userId: to,
    }).session(session);

    if (!account) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid Account",
        });
    }

    await Account.updateOne({
        userId: req.userId,
    }, {
        $inc: {
            balance: -amount,
        },
    }).session(session);
    await Account.updateOne({
        userId: to,
    }, {
        $inc: {
            balance: amount,
        }
    }).session(session);
    
    const guy = await User.findById(req.userId);
    const firstName = guy.firstName;
    
    await session.commitTransaction();
    res.json({
        userId: req.userId,
        firstName: firstName,
        message: "Transaction Successful",
    });
});

module.exports = accountRouter;
