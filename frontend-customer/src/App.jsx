import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { CariKamar, DetailPemesanan, DetailTipeKamar, LandingPage, Login, Riwayat, PemesananKamar, RincianPemesanan, Register } from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" exact element={<Login/>} /> 
        <Route path="/home" exact element={<LandingPage/>} /> 
        <Route path="/cariKamar" exact element={<CariKamar/>} /> 
        <Route path="/riwayat" exact element={<Riwayat/>} /> 
        <Route path="/detail" exact element={<DetailPemesanan/>} /> 
        <Route path="/detailKamar/:id" exact element={<DetailTipeKamar/>} /> 
        <Route path="/pemesananKamar" exact element={<PemesananKamar/>} /> 
        <Route path="/rincianPemesanan/:id" exact element={<RincianPemesanan/>} /> 
        <Route path="/register" exact element={<Register/>} /> 
      </Routes>
    </Router>
  )
}

export default App