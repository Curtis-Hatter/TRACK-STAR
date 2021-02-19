const express = require("express");
const modelName = require("../models/modelsName");

const router = express.Router();
router.get("/", (req, res) => {
    modelName.all((data) => {
        const hbsObject = {
            NameofProperties: data,
        };
        res.render('index', hbsObject);
    });
});
router.post("/api/route", (req, res) => {
    // modelName.create("[stuff goes here]", req.body.stuffLikeName, (result) => {
    //     res.json({ id: result.insertId });
    // });
});
router.put("/api/route/:id", (req, res) => {
    //grab id to update stuff
    const id = req.params.id;


    modelName.update(id, req.body.stuff, (response) => {
        if (response.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

router.delete("/api/route/:id", (req, res) => {
    //grab id to update stuff
    const id = req.params.id;


    modelName.delete(id, req.body.stuff, (response) => {
        if (response.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});
module.exports = router;