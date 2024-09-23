import { Router, Request, Response } from "express";
import data from "../data";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.render("index", { title: "My Ecommerce", prodotti: data });
});

router.get("/prodotti/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        res.status(400).render("error", { title: "Errore", message: "Formato id non corretto" });
        return;
    }

    const prodotto = data.find(p => p.id == idNumber);

    if (prodotto) {
        res.render("prodotto", { title: "My Ecommerce - " + prodotto.title, prodotto: prodotto })
    } else {
        res.status(404).render("404", { title: "Errore", message: `Prodotto con id ${idNumber} non trovato.` });
    }

    res.render("index", { title: "My Ecommerce", prodotti: data });
});

export default router;