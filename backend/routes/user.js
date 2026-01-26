//import express
const express = require("express");
const app = express();
app.use(express.json());

// import md5
const md5 = require("md5");

//import multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Op } = require("sequelize");

//import model
const models = require("../models/index");
const user = models.user;

//config storage image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../backend/image/user");
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

// Mendefinisikan endpoint POST '/auth' untuk login
app.post("/auth", async (req, res) => {
  // Mengambil email dan password dari body request
  let data = {
    email: req.body.email,
    password: md5(req.body.password), // Meng-hash password menggunakan md5
  };

  // Mencari data pengguna dalam database berdasarkan email dan password yang di-hash
  let result = await user.findOne({ where: data });

  // Jika data pengguna ditemukan dalam database
  if (result) {
    // Mengonversi data pengguna menjadi string JSON
    let payload = JSON.stringify(result);

    // Menghasilkan JSON Web Token (JWT) menggunakan payload dan SECRET_KEY
    let token = jwt.sign(payload, SECRET_KEY); // Membuat JWT

    // Merespon dengan status bahwa login berhasil, data pengguna, dan token JWT
    res.json({
      logged: true,
      data: result,
      token: token, // Mengirim token JWT kepada pengguna
    });
  } else {
    // Jika data pengguna tidak ditemukan, merespon dengan status login gagal
    // dan memberikan pesan error
    res.json({
      logged: false,
      message: "Invalid username or password", // Pesan error jika login gagal
    });
  }
});

// Mendefinisikan endpoint GET '/' (root endpoint) untuk mendapatkan daftar semua pengguna, dengan middleware 'auth' untuk autentikasi
app.get("/", auth, (req, res) => {
  // Mengambil semua data pengguna dari database
  user
    .findAll() // Mengambil semua data pengguna
    .then((result) => {
      // Jika pengambilan data berhasil, kembalikan respon dengan data pengguna dalam bentuk JSON
      res.json({
        user: result, // Mengirim data pengguna dalam respons
      });
    })
    .catch((error) => {
      // Tangkap dan tangani kesalahan jika terjadi saat mengambil data pengguna
      res.json({
        message: error.message, // Mengirim pesan kesalahan dalam respons
      });
    });
});

// Mendefinisikan endpoint GET '/:id' untuk mendapatkan data pengguna dengan ID tertentu, dengan middleware 'auth' untuk autentikasi
app.get("/:id", auth, (req, res) => {
  // Mencari data pengguna dalam database berdasarkan ID yang diberikan
  user
    .findOne({ where: { id_user: req.params.id } }) // Mencari data pengguna dengan ID tertentu
    .then((result) => {
      if (result) {
        // Jika data pengguna ditemukan, kembalikan respon sukses dengan data pengguna dalam bentuk JSON
        res.json({
          status: "success",
          user: result, // Mengirim data pengguna dalam respons
        });
      } else {
        // Jika data pengguna tidak ditemukan, kembalikan respon dengan status 404 (Not Found)
        res.status(404).json({
          status: "error",
          message: "User tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      // Tangkap dan tangani kesalahan jika terjadi saat mencari data pengguna
      res.status(500).json({
        status: "error",
        message: error.message, // Mengirim pesan kesalahan dalam respons
      });
    });
});

// Mendefinisikan endpoint POST '/search' untuk mencari pengguna berdasarkan nama pengguna, dengan middleware 'auth' untuk autentikasi
app.post("/search", auth, (req, res) => {
  // Mencari data pengguna dalam database berdasarkan nama pengguna yang mengandung kata kunci yang diberikan
  user
    .findAll({
      where: {
        [Op.or]: [{ nama_user: { [Op.like]: "%" + req.body.nama_user + "%" } }], // Mencari nama pengguna yang mengandung kata kunci
      },
    })
    .then((result) => {
      // Jika pencarian berhasil, kembalikan respon dengan data pengguna yang sesuai dalam bentuk JSON
      res.json({
        user: result, // Mengirim data pengguna yang sesuai dalam respons
      });
    })
    .catch((error) => {
      // Tangkap dan tangani kesalahan jika terjadi saat melakukan pencarian
      res.json({
        message: error.message, // Mengirim pesan kesalahan dalam respons
      });
    });
});

// Mendefinisikan endpoint POST '/' (root endpoint) dengan middleware 'upload.single("foto")' untuk mengunggah satu file gambar
app.post("/", upload.single("foto"), async (req, res) => {
  try {
    // Mencari apakah ada pelanggan dengan nama yang sama dalam database
    const existingUser = await user.findOne({
      where: { nama_user: req.body.nama_user },
    });

    // Jika pelanggan dengan nama yang sama sudah ada, kembalikan respon dengan status 400 (Bad Request)
    if (existingUser) {
      return res.status(400).json({ message: "Nama sudah digunakan" });
    }

    // Jika tidak ada file yang diunggah, kembalikan respon dengan pesan bahwa tidak ada file yang diunggah
    if (!req.file) {
      return res.json({ message: "No uploaded file" });
    }

    // Membuat objek 'data' yang berisi data pelanggan yang akan ditambahkan ke database
    let data = {
      nama_user: req.body.nama_user,
      foto: req.file.filename,
      email: req.body.email,
      password: md5(req.body.password),
      role: req.body.role,
    };

    // Membuat entri pelanggan baru dalam database dengan data yang telah ditentukan
    const newUser = await user.create(data);

    // Jika pembuatan entri berhasil, kembalikan respon dengan pesan sukses
    if (newUser) {
      return res.json({ message: "Selesai Menambahkan Data Baru" });
    } else {
      // Jika pembuatan entri gagal, kembalikan respon dengan status 500 (Internal Server Error)
      return res.status(500).json({ message: "Gagal menambahkan data" });
    }
  } catch (error) {
    // Tangkap dan tangani kesalahan jika terjadi
    return res.status(500).json({ message: error.message });
  }
});

// Mendefinisikan endpoint PUT '/:id' untuk mengubah data pengguna dengan ID tertentu, dengan middleware 'upload.single("foto")' untuk mengunggah satu file gambar dan middleware 'auth' untuk autentikasi
// app.put("/:id", upload.single("foto"),  async (req, res) => {
//   try {
//     // Mencari apakah ada pengguna dengan nama pengguna yang sama dalam database
//     const existingUser = await user.findOne({
//       where: { nama_user: req.body.nama_user },
//     });

//     // Jika ada pengguna dengan nama pengguna yang sama dan ID pengguna tidak sama
//     if (existingUser && existingUser.id_user != req.params.id) {
//       return res.status(400).json({ message: "Nama pengguna sudah ada" });
//     }

//     // Menyiapkan parameter pencarian berdasarkan ID pengguna yang akan diubah
//     let param = { id_user: req.params.id };

//     // Menyiapkan objek 'data' yang berisi data yang akan diubah pada pengguna
//     let data = {
//       nama_user: req.body.nama_user,
//       email: req.body.email,
//       role: req.body.role,
//     };

//     // Jika ada file gambar yang diunggah
//     if (req.file) {
//       // Mencari data pengguna berdasarkan ID
//       const result = await user.findOne({ where: param });
//       if (result) {
//         let oldFileName = result.image;

//         // Menghapus file gambar lama
//         let dir = path.join(__dirname, "../backend/image/user", oldFileName);
//         fs.unlink(dir, (err) => {
//           if (err) console.log(err);
//         });
//       }

//       // Mengatur nama file gambar yang baru
//       data.foto = req.file.filename;
//     }

//     // Jika ada perubahan password, meng-hash password yang baru menggunakan md5
//     if (req.body.password) {
//       data.password = md5(req.body.password);
//     }

//     // Melakukan pembaruan data pengguna dalam database berdasarkan ID pengguna
//     const updateResult = await user.update(data, { where: param });

//     // Jika pembaruan berhasil, kembalikan respon sukses
//     if (updateResult[0]) {
//       return res.json({ message: "Selesai Update Data?" });
//     } else {
//       // Jika pembaruan gagal, kembalikan respon dengan status 500 (Internal Server Error)
//       return res.status(500).json({ message: "Gagal memperbarui data" });
//     }
//   } catch (error) {
//     // Tangkap dan tangani kesalahan jika terjadi
//     return res.status(500).json({ message: error.message });
//   }
// });

//edit data by id
app.put("/:id", upload.single("foto"), auth, (req, res) =>{
  let param = { id_user: req.params.id}
  let data = {
      nama_user : req.body.nama_user,
      email : req.body.email,
      role : req.body.role
  }
  if (req.file) {
      // get data by id
      const row = user.findOne({where: param})
      .then(result => {
          let oldFileName = result.image
         
          // delete old file
          let dir = path.join(__dirname,"../backend/image/user",oldFileName)
          fs.unlink(dir, err => console.log(err))
      })
      .catch(error => {
          console.log(error.message);
      })

      // set new filename
      data.foto = req.file.filename
  }

  if(req.body.password){
      data.password = md5(req.body.password)
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


// Mendefinisikan endpoint DELETE '/:id' untuk menghapus data pengguna dengan ID tertentu, dengan middleware 'auth' untuk autentikasi
app.delete("/:id", auth, (req, res) => {
  // Menyiapkan parameter pencarian berdasarkan ID pengguna yang akan dihapus
  let param = {
    id_user: req.params.id,
  };

  // Menghapus data pengguna dari database berdasarkan parameter yang telah disiapkan
  user
    .destroy({ where: param }) // Menghapus data pengguna dengan ID tertentu
    .then((result) => {
      if (result === 1) {
        // Jika satu entri data berhasil dihapus, kembalikan respon sukses
        res.json({
          status: "success",
          message: "Data has been deleted",
        });
      } else {
        // Jika tidak ada data yang dihapus (ID tidak ditemukan), kembalikan respon dengan status 404 (Not Found)
        res.status(404).json({
          status: "error",
          message: "User tidak ditemukan",
        });
      }
    })
    .catch((error) => {
      // Tangkap dan tangani kesalahan jika terjadi saat menghapus data
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    });
});

module.exports = app;
