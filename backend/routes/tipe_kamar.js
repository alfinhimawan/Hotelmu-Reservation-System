//import express
const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

//import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Op } = require("sequelize");

//import model
const models = require("../models/index");
const tipe_kamar = models.tipe_kamar;

//config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/image/tipe_kamar");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

//import auth
const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TryMe";

//get data
app.get("/", auth, (req, res) => {
  tipe_kamar
    .findAll()
    .then((result) => {
      res.json({
        tipe_kamar: result,
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
  tipe_kamar
    .findOne({ where: { id_tipe_kamar: req.params.id } })
    .then((result) => {
      if (result) {
        res.json({
          status: "success",
          kamar: result,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Tipe kamar tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
});

//search data by tipe_kamar
app.post("/search", auth, (req, res) => {
  tipe_kamar
    .findAll({
      where: {
        [Op.or]: [
          { nama_tipe_kamar: { [Op.like]: "%" + req.body.nama_tipe_kamar + "%" } },
        ],
      },
    })
    .then((result) => {
      res.json({
        tipe_kamar: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//post data
app.post("/", upload.single("foto"), auth, async (req, res) => {
  try {
    const existingTipeKamar = await tipe_kamar.findOne({
      where: { nama_tipe_kamar: req.body.nama_tipe_kamar },
    });

    if (existingTipeKamar) {
      return res.status(400).json({ message: "Nama tipe kamar sudah ada" });
    }

    if (!req.file) {
      return res.json({ message: "No uploaded file" });
    }

    let data = {
      nama_tipe_kamar: req.body.nama_tipe_kamar,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
      foto: req.file.filename,
    };

    const newTipeKamar = await tipe_kamar.create(data);

    if (newTipeKamar) {
      return res.json({ message: "data has been inserted" });
    } else {
      return res.status(500).json({ message: "Gagal menambahkan data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//edit data by id
app.put("/:id", upload.single("foto"), auth, async (req, res) => {
  try {
    const param = { id_tipe_kamar: req.params.id };
    const existingTipeKamar = await tipe_kamar.findOne({
      where: { nama_tipe_kamar: req.body.nama_tipe_kamar },
    });

    if (existingTipeKamar && existingTipeKamar.id_tipe_kamar !== req.params.id) {
      return res.status(400).json({ message: "Nama tipe kamar sudah ada" });
    }

    const data = {
      nama_tipe_kamar: req.body.nama_tipe_kamar,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
    };

    if (req.file) {
      // get data by id
      const result = await tipe_kamar.findOne({ where: param });
      if (result) {
        let oldFileName = result.foto;

        // delete old file
        let dir = path.join(
          __dirname,
          "../backend/image/tipe_kamar",
          oldFileName
        );
        fs.unlink(dir, (err) => console.log(err));

        // set new filename
        data.foto = req.file.filename;
      }
    }

    const updatedTipeKamar = await tipe_kamar.update(data, { where: param });

    if (updatedTipeKamar[0] === 1) {
      return res.json({
        message: "data has been updated",
      });
    } else {
      return res.status(500).json({ message: "Gagal memperbarui data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//delete data by id
app.delete("/:id", auth, (req, res) => {
  let param = {
    id_tipe_kamar: req.params.id,
  };
  tipe_kamar
    .destroy({ where: param })
    .then((result) => {
      if (result === 1) {
        res.json({
          status: "success",
          message: "Data has been deleted",
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "Tipe kamar tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
});

module.exports = app;
