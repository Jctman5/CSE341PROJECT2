const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection("players").find();
        const players = await result.toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("players").find({ _id: playerId });
        const players = await result.toArray();
        res.status(200).json(players[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const createPlayer = async (req, res) => {
    const { firstName, lastName, race, class: className, health, attack, inventory } = req.body;

    if (!firstName || !lastName || !race || !className || health == null || attack == null || inventory == null) {
        return res.status(400).json({ error: "firstName, lastName, race, class, health, attack, and inventory are all required." });
    }

    const player = {
        firstName,
        lastName,
        race,
        class: className,
        health: Number(health),
        attack: Number(attack),
        inventory
    };

    try {
        const response = await mongodb.getDatabase().db().collection("players").insertOne(player);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || "Some error occured creating the player.");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updatePlayer = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const { firstName, lastName, race, class: className, health, attack, inventory } = req.body;

        if (!firstName || !lastName || !race || !className || health == null || attack == null || inventory == null) {
            return res.status(400).json({ error: "firstName, lastName, race, class, health, attack and inventory are all required." });
        }

        const player = {
            firstName,
            lastName,
            race,
            class: className,
            health: Number(health),
            attack: Number(attack),
            inventory
        };

        const response = await mongodb.getDatabase().db().collection("players").replaceOne({ _id: playerId }, player);

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletePlayer = async (req, res) => {
    try {
        const playerId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("players").deleteOne({ _id: playerId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Player not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getSingle,
    getAll,
    createPlayer,
    updatePlayer,
    deletePlayer
};