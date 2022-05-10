"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("./prisma");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const feedback = await prisma_1.prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot
        }
    });
    return res.status(201).json({ data: feedback });
});
app.listen(3333, () => {
    console.log("Server aberto na porta 3333");
});
