import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { DataKamar, AddDataKamar, EditDataKamar, LoginAdmin, DataTipeKamar, AddDataTipeKamar, EditDataTipeKamar, DataUser, AddDataUser, EditDataUser, DataPemesanan, EditDataPemesanan } from './pages'

const App = () => {
  return (
    <Router>
      <Routes>
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