import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import axios from 'axios'
import { CariKamar, DetailPemesanan, DetailTipeKamar, LandingPage, Login, Riwayat, PemesananKamar, RincianPemesanan, Register } from './pages'
import API_BASE_URL from './constants/api'

const App = () => {
  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/customer/me/verify`, {
            headers: { 
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          });

          if (response.data.logged) {
            console.log("Token verified successfully");
          }
        } catch (error) {
          console.log("Token verification failed:", error.message);
          sessionStorage.clear();
          window.location.href = "/login";
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to="/login" />} />
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