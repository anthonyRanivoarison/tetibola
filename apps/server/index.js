import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/categories.js";
import summaryRouter from "./routes/summary.js";
import receiptsRouter from "./routes/receipts.js";
import incomesRouter from "./routes/incomes.js";
import expensesRouter from "./routes/expenses.js";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/expenses', expensesRouter);
app.use('/incomes', incomesRouter);
app.use('/summary', summaryRouter);
app.use('/receipt', receiptsRouter);
app.use('/api/user', profileRouter);

app.get("/", (req, res) => {
    res.send("Hello from expense tracker api")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))