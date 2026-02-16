import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import axios from 'axios'
import { DataKamar, AddDataKamar, EditDataKamar, LoginAdmin, DataTipeKamar, AddDataTipeKamar, EditDataTipeKamar, DataUser, AddDataUser, EditDataUser, DataPemesanan, EditDataPemesanan } from './pages'
import API_BASE_URL from './constants/api'

const App = () => {
  useEffect(() => {
    const verifyToken = async () => {
      const token = sessionStorage.getItem("token");
      
      if (token) {
        try { 
          const response = await axios.get(`${API_BASE_URL}/user/me/verify`, {
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
          window.location.href = "/loginAdmin";
        }
      }
    };

    verifyToken();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Navigate to="/loginAdmin" />} />
        <Route path="/loginAdmin" exact element={<LoginAdmin/>} /> 
        <Route path="/dataKamar" exact element={<DataKamar/>} /> 
        <Route path="/addDataKamar" exact element={<AddDataKamar/>} /> 
        <Route path="/editDataKamar/:id" exact element={<EditDataKamar/>} /> 
        <Route path="/dataTipeKamar" exact element={<DataTipeKamar/>} /> 
        <Route path="/addDataTipeKamar" exact element={<AddDataTipeKamar/>} /> 
        <Route path="/editDataTipeKamar/:id" exact element={<EditDataTipeKamar/>} /> 
        <Route path="/dataUser" exact element={<DataUser/>} /> 
        <Route path="/addDataUser" exact element={<AddDataUser/>} /> 
        <Route path="/editDataUser/:id" exact element={<EditDataUser/>} /> 
        <Route path="/dataPemesanan" exact element={<DataPemesanan/>} /> 
        <Route path="/editPemesanan/:id" exact element={<EditDataPemesanan/>} /> 
      </Routes>
    </Router>
  )
}

export default App