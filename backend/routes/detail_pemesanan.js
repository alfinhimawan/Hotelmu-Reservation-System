//import library
const express = require("express");
const bodyParser = require("body-parser");

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import model
const model = require("../models/index");
const detail_pemesanan = model.detail_pemesanan;

//import auth
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TryMe";

//get data
app.get("/", auth, (req, res) => {
  detail_pemesanan
    .findAll()
    .then((result) => {
      res.json({
        detail_pemesanan: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//get data by id
app.get("/:id", auth, (req, res) => {
  detail_pemesanan
    .findOne({ where: { id_detail_pemesanan: req.params.id } })
    .then((result) => {
      res.json({
        detail_pemesanan: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//post data
app.post("/", auth, (req, res) => {
  let data = {
    id_detail_pemesanan: req.body.id_detail_pemesanan,
    id_kamar: req.body.id_kamar,
    tgl_akses: req.body.tgl_akses,
    harga: req.body.harga,
  };

  detail_pemesanan
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//edit data by id
app.put("/:id", auth, (req, res) => {
  let param = {
    id_detail_pemesanan: req.params.id,
  };
  let data = {
    id_detail_pemesanan: req.body.id_detail_pemesanan,
    id_kamar: req.body.id_kamar,
    tgl_akses: req.body.tgl_akses,
    harga: req.body.harga,
  };
  detail_pemesanan
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//delete data by id
app.delete("/:id", auth, (req, res) => {
  let param = {
    id_detail_pemesanan: req.params.id,
  };
  detail_pemesanan
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;
