//import library
const express = require('express');
const bodyParser = require('body-parser');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const { Op } = require("sequelize")

//import model
const model = require('../models/index');
const kamar = model.kamar
const tipe_kamar = model.tipe_kamar

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "TryMe"

//get data
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

//get data by id
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
                    message: "Kamar tidak ditemukan"
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

//search data by nomor_kamar
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

//post data
app.post("/", auth, async (req, res) => {
    try {
        const existingKamar = await kamar.findOne({ where: { nomor_kamar: req.body.nomor_kamar } });

        if (existingKamar) {
            res.json({
                message: "Nomor kamar sudah ada"
            });
        } else {
            const data = {
                nomor_kamar: req.body.nomor_kamar,
                id_tipe_kamar: req.body.id_tipe_kamar
            };

            const createdKamar = await kamar.create(data);

            res.json({
                message: "Selesai Menambahkan Data Baru?",
                kamar: createdKamar
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//edit data by id
app.put("/:id", auth, async (req, res) => {
    try {
        const existingKamar = await kamar.findOne({ where: { nomor_kamar: req.body.nomor_kamar } });

        if (existingKamar && existingKamar.id_kamar != req.params.id) {
            res.json({
                message: "Nomor kamar sudah ada"
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
                    message: "Selesai Mengupdate Data"
                });
            } else {
                res.status(404).json({
                    message: "Kamar tidak ditemukan"
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

//delete data by id
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
                    message: "Kamar tidak ditemukan"
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