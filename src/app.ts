import express, { Request, Response, NextFunction } from "express";
import pagesRouter from "./routes/pages";
import logMiddleware from "./log.middleware";

const app = express();
const port = 3001;

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.use(express.static("public"));

app.use(logMiddleware);
app.use("/", pagesRouter);

// errore 404
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404", { title: "Pagina non trovata." });
});

// errore 500
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).render("error", { title: "Errore", message: `Qualcosa è andato storto.` });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});