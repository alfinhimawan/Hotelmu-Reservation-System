const express = require("express");
const app = express();
app.use(express.json());

const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const models = require("../models/index");
const customer = models.customer;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/image/customer");
  },
  filename: (req, file, cb) => {
    cb(null, "img-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

const auth = require("../auth");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "TryMe";

app.post("/auth", async (req, res) => {
  try {
    let result = await customer.findOne({ where: { email: req.body.email } });
    
    if (result) {
      const passwordMatch = await bcrypt.compare(req.body.password, result.password);
      if (passwordMatch) {
        let payload = JSON.stringify(result);
        let token = jwt.sign(payload, SECRET_KEY);
        res.json({
          logged: true,
          data: result,
          token: token,
        });
      } else {
        res.json({
          logged: false,
          message: "Invalid username or password",
        });
      }
    } else {
      res.json({
        logged: false,
        message: "Invalid username or password",
      });
    }
  } catch (error) {
    res.status(500).json({
      logged: false,
      message: "Authentication error",
      error: error.message,
    });
  }
});

// Verify customer endpoint - untuk validasi token dan cek customer di database
app.get("/me/verify", auth, async (req, res) => {
  try {
    // Parse token dari header
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        logged: false,
        message: "Token not provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, SECRET_KEY);
    const customerData = JSON.parse(decoded);

    // Cek apakah customer masih ada di database
    const customerExists = await customer.findOne({
      where: { id_customer: customerData.id_customer },
    });

    if (!customerExists) {
      return res.status(401).json({
        logged: false,
        message: "Customer not found",
      });
    }

    // Token valid dan customer ada di database
    return res.json({
      logged: true,
      data: customerExists,
    });
  } catch (error) {
    return res.status(401).json({
      logged: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
});

app.get("/", auth, (req, res) => {
  customer
    .findAll()
    .then((result) => {
      res.json({
        customer: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post("/", upload.single("foto"), async (req, res) => {
    try {
      const existingCustomer = await customer.findOne({
        where: { nama: req.body.nama },
      });
  
      if (existingCustomer) {
        return res.status(400).json({ message: "Name already in use" });
      }
  
      if (!req.file) {
        return res.json({ message: "No uploaded file" });
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      
      let data = {
        nama: req.body.nama,
        foto: req.file.filename,
        email: req.body.email,
        password: hashedPassword,
      };
  
      const newCustomer = await customer.create(data);
  
      if (newCustomer) {
        return res.json({ message: "Customer created successfully" });
      } else {
        return res.status(500).json({ message: "Failed to add data" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
});
  
app.put("/:id", upload.single("foto"), auth, async (req, res) => {
  let param = { id_customer: req.params.id };
  let data = {
    nama: req.body.nama,
    email: req.body.email,
  };
  
  if (req.file) {
    try {
      const result = await customer.findOne({ where: param });
      
      if (result && result.foto) {
        let dir = path.join(
          __dirname,
          "../backend/image/customer",
          result.foto
        );
        fs.unlink(dir, (err) => {
          if (err) console.log("Error deleting old file:", err);
        });
      }

      data.foto = req.file.filename;
    } catch (error) {
      console.log(error.message);
    }
  }

  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    data.password = hashedPassword;
  }

  customer
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

app.delete("/:id", auth, async (req, res) => {
  let param = {
    id_customer: req.params.id,
  };

  try {
    const customerData = await customer.findOne({ where: param });
    
    if (!customerData) {
      return res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }

    if (customerData.foto) {
      const filePath = path.join(__dirname, "../backend/image/customer", customerData.foto);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }

    const result = await customer.destroy({ where: param });
    
    if (result === 1) {
      res.json({
        status: "success",
        message: "Data has been deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Customer not found",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = app;
