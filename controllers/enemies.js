const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("enemies").find();
    result.toArray().then((enemies) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players);
    });
};

const getSingle = async (req, res) => {
    const enemyId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("enemies").find({ _id: enemyId });
    result.toArray().then((enemies) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(enemies[0]);
    });
};
const createEnemy = async (req, res) => {
    const enemy = {
        name: req.body.name,
        race: req.body.race,
        class: req.body.class,
        health: req.body.health,
        attack: req.body.attack,
        inventory: req.body.inventory,
    };
    const response = await mongodb.getDatabase().db().collection("enemies").insertOne(enemy);
    if (response.acknowledged){
        res.status(201).json({ id: response.insertedId });
    } 
    else{
        res.status(500).json(response.error || "Some error occured creating the contact.");
    }
};
module.exports = {
    getSingle,
    getAll,
    createEnemy
};