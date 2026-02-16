const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const { Op } = require("sequelize")

const model = require('../models/index');
const kamar = model.kamar
const tipe_kamar = model.tipe_kamar

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "TryMe"

app.get("/", auth, (req,res) => {
    kamar.findAll({include: [{model: tipe_kamar, as:'tipe_kamar'}]})
        .then(result => {
            res.json({
                kamar : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/:id", auth, (req, res) => {
    kamar.findOne({ where: { id_kamar: req.params.id } })
        .then(result => {
            if (result) {
                res.json({
                    status: "success",
                    kamar: result
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Room not found"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        });
});

app.post("/search", auth, (req, res) => {
    kamar
      .findAll({
        include: [{model: tipe_kamar, as:'tipe_kamar'}],
        where: {
          [Op.or]: [
            { nomor_kamar: req.body.nomor_kamar},
          ],
        },
      })
      .then((result) => {
        res.json({
          kamar: result,
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
});

app.post("/", auth, async (req, res) => {
    try {
        const existingKamar = await kamar.findOne({ where: { nomor_kamar: req.body.nomor_kamar } });

        if (existingKamar) {
            res.json({
                message: "Room number already exists"
            });
        } else {
            const data = {
                nomor_kamar: req.body.nomor_kamar,
                id_tipe_kamar: req.body.id_tipe_kamar
            };

            const createdKamar = await kamar.create(data);

            res.json({
                message: "Room created successfully",
                kamar: createdKamar
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.put("/:id", auth, async (req, res) => {
    try {
        const existingKamar = await kamar.findOne({ where: { nomor_kamar: req.body.nomor_kamar } });

        if (existingKamar && existingKamar.id_kamar != req.params.id) {
            res.json({
                message: "Room number already exists"
            });
        } else {
            let param = {
                id_kamar: req.params.id
            };
            let data = {
                nomor_kamar: req.body.nomor_kamar,
                id_tipe_kamar: req.body.id_tipe_kamar
            };
            const result = await kamar.update(data, { where: param });

            if (result[0] === 1) {
                res.json({
                    message: "Room updated successfully"
                });
            } else {
                res.status(404).json({
                    message: "Room not found"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

app.delete("/:id", auth, (req, res) => {
    let param = {
        id_kamar: req.params.id
    }
    kamar.destroy({ where: param })
        .then(result => {
            if (result === 1) {
                res.json({
                    status: "success",
                    message: "Data has been deleted"
                });
            } else {
                res.status(404).json({
                    status: "error",
                    message: "Room not found"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        });
});

module.exports = app