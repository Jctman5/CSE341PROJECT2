const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection("enemies").find();
        const enemies = await result.toArray();
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(enemies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const enemyId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection("enemies").find({ _id: enemyId });
        const enemies = await result.toArray();
        res.status(200).json(enemies[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const createEnemy = async (req, res) => {
    const { name, race, class: className, health, attack, inventory } = req.body;

    if (!name || !race || !className || health == null || attack == null) {
        return res.status(400).json({ error: "name, race, class, health, attack, and inventory are all required." });
    }

    const enemy = {
        name,
        race,
        class: className,
        health: Number(health),
        attack: Number(attack),
        inventory
    };

    try {
        const response = await mongodb.getDatabase().db().collection("enemies").insertOne(enemy);
        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId });
        } else {
            res.status(500).json(response.error || "Some error occured creating the enemy.");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const updateEnemy = async (req, res) => {
    try {
        const enemyId = new ObjectId(req.params.id);
        const { name, race, class: className, health, attack, inventory } = req.body;

        if (!name || !race || !className || health == null || attack == null || inventory == null) {
            return res.status(400).json({ error: "firstName, lastName, race, class, health, attack, and inventory are all required." });
        }

        const enemy = {
            name,
            race,
            class: className,
            health: Number(health),
            attack: Number(attack),
            inventory
        };

        const response = await mongodb.getDatabase().db().collection("enemies").replaceOne({ _id: enemyId }, enemy);

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: "Enemy not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteEnemy = async (req, res) => {
    try {
        const enemyId = new ObjectId(req.params.id);
        const response = await mongodb.getDatabase().db().collection("enemies").deleteOne({ _id: enemyId });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: "Enemy not found" });
        }

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
module.exports = {
    getSingle,
    getAll,
    createEnemy,
    updateEnemy,
    deleteEnemy
};