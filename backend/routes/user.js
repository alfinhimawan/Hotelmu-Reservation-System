const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

const bcrypt = require("bcrypt");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Op } = require("sequelize");

const models = require("../models/index");
const user = models.user;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/image/user");
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
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ 
        logged: false,
        message: "Email and password must be filled" 
      });
    }

    let result = await user.findOne({ where: { email: req.body.email } });

    if (result) {
      const passwordMatch = await bcrypt.compare(req.body.password, result.password);
      
      if (passwordMatch) {
        let payload = JSON.stringify(result);
        let token = jwt.sign(payload, SECRET_KEY);

        return res.json({
          logged: true,
          data: result,
          token: token,
        });
      } else {
        return res.json({
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
      message: error.message 
    });
  }
});

app.get("/me/verify", auth, async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        logged: false,
        message: "Token not provided",
      });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userData = JSON.parse(decoded);

    const userExists = await user.findOne({
      where: { id_user: userData.id_user },
    });

    if (!userExists) {
      return res.status(401).json({
        logged: false,
        message: "User not found",
      });
    }

    return res.json({
      logged: true,
      data: userExists,
    });
  } catch (error) {
    return res.status(401).json({
      logged: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
});

app.get("/", (req, res) => {
  user
    .findAll()
    .then((result) => {
      res.json({
        user: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.get("/:id", auth, (req, res) => {
  user
    .findOne({ where: { id_user: req.params.id } })
    .then((result) => {
      if (result) {
        res.json({
          status: "success",
          user: result,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "User not found",
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
  user
    .findAll({
      where: {
        [Op.or]: [{ nama_user: { [Op.like]: "%" + req.body.nama_user + "%" } }],
      },
    })
    .then((result) => {
      res.json({
        user: result,
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
    if (!req.body.nama_user || !req.body.email || !req.body.password || !req.body.role) {
      return res.status(400).json({ message: "All fields (nama_user, email, password, role) must be filled" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Photo must be uploaded" });
    }

    const existingUser = await user.findOne({
      where: { nama_user: req.body.nama_user },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Name already in use" });
    }
    
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let data = {
      nama_user: req.body.nama_user,
      foto: req.file.filename,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    };

    const newUser = await user.create(data);

    if (newUser) {
      return res.json({ message: "User created successfully" });
    } else {
      return res.status(500).json({ message: "Failed to add data" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// app.put("/:id", upload.single("foto"),  async (req, res) => {
//   try {
//     const existingUser = await user.findOne({
//       where: { nama_user: req.body.nama_user },
//     });

//     if (existingUser && existingUser.id_user != req.params.id) {
//       return res.status(400).json({ message: "Nama pengguna sudah ada" });
//     }

//     let param = { id_user: req.params.id };

//     let data = {
//       nama_user: req.body.nama_user,
//       email: req.body.email,
//       role: req.body.role,
//     };

//     if (req.file) {
//       const result = await user.findOne({ where: param });
//       if (result) {
//         let oldFileName = result.image;

//         let dir = path.join(__dirname, "../backend/image/user", oldFileName);
//         fs.unlink(dir, (err) => {
//           if (err) console.log(err);
//         });
//       }

//       data.foto = req.file.filename;
//     }

//     if (req.body.password) {
//       data.password = md5(req.body.password);
//     }

//     const updateResult = await user.update(data, { where: param });

//     if (updateResult[0]) {
//       return res.json({ message: "Selesai Update Data?" });
//     } else {
//       return res.status(500).json({ message: "Gagal memperbarui data" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

app.put("/:id", upload.single("foto"), auth, async (req, res) =>{
  let param = { id_user: req.params.id}
  let data = {
      nama_user : req.body.nama_user,
      email : req.body.email,
      role : req.body.role
  }
  if (req.file) {
      try {
        const result = await user.findOne({where: param})
        
        if (result && result.foto) {
          let dir = path.join(__dirname,"../backend/image/user",result.foto)
          fs.unlink(dir, err => {
            if (err) console.log("Error deleting old file:", err);
          })
        }

        data.foto = req.file.filename
      } catch (error) {
          console.log(error.message);
      }
  }

  if(req.body.password){
      data.password = await bcrypt.hash(req.body.password, 10);
  }

  user.update(data, {where: param})
      .then(result => {
          res.json({
              message: "data has been updated",
          })
      })
      .catch(error => {
          res.json({
              message: error.message
          })
      })
})


app.delete("/:id", auth, async (req, res) => {
  let param = {
    id_user: req.params.id,
  };

  try {
    const userData = await user.findOne({ where: param });
    
    if (!userData) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    if (userData.foto) {
      const filePath = path.join(__dirname, "../backend/image/user", userData.foto);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }

    const result = await user.destroy({ where: param });
    
    if (result === 1) {
      res.json({
        status: "success",
        message: "Data has been deleted",
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "User not found",
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
