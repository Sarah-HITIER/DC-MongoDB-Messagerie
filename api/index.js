const express = require("express");
const app = express();
const port = 3000;

// Parser le body en json
app.use(express.json());

const db = require("./db");
const { ObjectId } = require("mongodb");

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// Création d'un salon
app.post("/salon/create", async (req, res) => {
    console.log(req.body);
    const documentSalon = {
        name: req.body.name,
        users: [{ login: req.body.name }]
    };

    // Insertion
    const result = await db.collection("salons").insertOne(documentSalon);
    console.log(result);

    res.json({ message: "Salon créé", data: result });
});

// Rejoindre un salon
app.post("/salon/:id/join", async (req, res) => {
    const result = await db
        .collection("salons")
        .findOne({ _id: new ObjectId(req.params.id) });
    console.log(result);

    // Modification d'un document (un salon) pour ajouter un utilisateur
    // La discussion
    const resultUpdate = await db.collection("salons").updateOne(
        // Le where
        { _id: new ObjectId(req.params.id) },
        // $push permet d'ajouter un élément à la fin du tableau
        { $push: { users: { login: req.body.login } } }
    );
    console.log("UpdatedDocuments =>", resultUpdate);
    res.json({ message: "Vous avez rejoint le salon" });
});

// Ajout d'un message
app.post("/salon/:id/messages", async (req, res) => {
    const result = await db.collection("salons").updateOne(
        // Where
        { _id: new ObjectId(req.params.id) },
        // Push [messages]
        { $push: { messages: { ...req.body, date: new Date() } } }
    );

    res.json({ message: "Nouveau message" });
});

// Récupération des salons
app.get("/salons", async (req, res) => {
    const result = await db.collection("salons").find().toArray();

    res.json({ message: "Succès", data: result });
});

// Récupération d'un salon
app.get("/salon/:id", async (req, res) => {
    const result = await db
        .collection("salons")
        .find({ _id: new ObjectId(req.params.id) })
        .toArray();

    res.json({
        message: "Récupération du salon",
        data: result
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
