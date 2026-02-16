const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Op } = require("sequelize");

const models = require("../models/index");
const tipe_kamar = models.tipe_kamar;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/image/tipe_kamar");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TryMe";

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
          message: "Room type not found",
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
      return res.status(400).json({ message: "Room type name already exists" });
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
      return res.status(500).json({ message: "Failed to add data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.put("/:id", upload.single("foto"), auth, async (req, res) => {
  try {
    const param = { id_tipe_kamar: req.params.id };
    const existingTipeKamar = await tipe_kamar.findOne({
      where: { nama_tipe_kamar: req.body.nama_tipe_kamar },
    });

    if (existingTipeKamar && existingTipeKamar.id_tipe_kamar !== req.params.id) {
      return res.status(400).json({ message: "Room type name already exists" });
    }

    const data = {
      nama_tipe_kamar: req.body.nama_tipe_kamar,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
    };

    if (req.file) {
      const result = await tipe_kamar.findOne({ where: param });
      if (result) {
        let oldFileName = result.foto;

        let dir = path.join(
          __dirname,
          "../backend/image/tipe_kamar",
          oldFileName
        );
        fs.unlink(dir, (err) => console.log(err));

        data.foto = req.file.filename;
      }
    }

    const updatedTipeKamar = await tipe_kamar.update(data, { where: param });

    if (updatedTipeKamar[0] === 1) {
      return res.json({
        message: "data has been updated",
      });
    } else {
      return res.status(500).json({ message: "Failed to update data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

app.delete("/:id", auth, async (req, res) => {
  let param = {
    id_tipe_kamar: req.params.id,
  };

  try {
    const tipeKamarData = await tipe_kamar.findOne({ where: param });
    
    if (!tipeKamarData) {
      return res.status(404).json({
        status: "error",
        message: "Room type not found",
      });
    }

    if (tipeKamarData.foto) {
      const filePath = path.join(__dirname, "../backend/image/tipe_kamar", tipeKamarData.foto);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }

    const result = await tipe_kamar.destroy({ where: param });
    
    if (result === 1) {
      res.json({
        status: "success",
        message: "Data has been deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Room type not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
});

module.exports = app;
