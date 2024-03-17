import express, { Request, Response } from "express";

import productsRouter from "./routers/productsRouter";
import usersRouter from "./routers/usersRouter";
import categoriesRouter from "./routers/categoriesRouter";

const PORT = 8080;

const app = express();
app.use(express.json());

app.get("/", (request: Request, response: Response) => {
  response.status(200).json({ message: "Hello world!" });
});

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoriesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
