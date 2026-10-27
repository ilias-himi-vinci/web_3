import express from 'express';
import logger from 'morgan';
import cors from "cors";
import expensesRouter from "./routes/expenses.ts";
import usersRouter from "./routes/users.ts";
import categoriesRouter from "./routes/categories.ts";


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", /\.onrender\.com$/],
  }),
);
app.use("/api", expensesRouter);
app.use("/api", usersRouter);
app.use("/api", categoriesRouter);

app.get('/ping', (req, res) => {
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

export default app;
