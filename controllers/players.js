const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection("players").find();
    result.toArray().then((players) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players);
    });
};

const getSingle = async (req, res) => {
    const playerId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("players").find({ _id: playerId });
    result.toArray().then((players) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(players[0]);
    });
};
const createPlayer = async (req, res) => {
    const player = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        race: req.body.race,
        class: req.body.class,
        health: req.body.health,
        attack: req.body.attack,
        inventory: req.body.inventory
    };
    const response = await mongodb.getDatabase().db().collection("players").insertOne(player);
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
    createPlayer
};