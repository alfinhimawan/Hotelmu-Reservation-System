const sequelize = require(`sequelize`);
const operator = sequelize.Op;

const express = require("express")

const app = express()
app.use(express.json())

const models = require("../models/index")
const Kamar = models.kamar
const Tp_kamar = models.tipe_kamar
const detail_pemesanan = models.detail_pemesanan

app.post('/', auth, async (req, res) => {

  let checkInDate = req.body.check_in_date;
  let checkOutDate = req.body.check_out_date;

  let roomData = await Tp_kamar.findAll({
      include: [
          {
              model: Kamar,
              as: "kamar",
              include: [
                  {
                      model: detail_pemesanan,
                      as: "detail_pemesanan",
                      attributes: ["tgl_akses"],
                      where: {
                          tgl_akses: {
                              [operator.between]: [checkInDate, checkOutDate],
                          },
                      },
                      required: false, // Use this to perform a left join
                  },
              ],
          },
      ],
  });

  let availableByType = [];

  for (let i = 0; i < roomData.length; i++) {
      let roomType = {};
      roomType.id_tipe_kamar = roomData[i].id_tipe_kamar;
      roomType.nama_tipe_kamar = roomData[i].nama_tipe_kamar;
      roomType.harga = roomData[i].harga;
      roomType.deskripsi = roomData[i].deskripsi;
      roomType.foto = roomData[i].foto;
      roomType.kamar = [];

      // Filter kamar yang tersedia
      roomData[i].kamar.forEach((kamar) => {
          if (!kamar.detail_pemesanan || kamar.detail_pemesanan.length === 0) {
              roomType.kamar.push(kamar);
          }
      });

      if (roomType.kamar.length > 0) {
          availableByType.push(roomType);
      }
  }
  
  return res.json({ room: availableByType });
})

module.exports = app