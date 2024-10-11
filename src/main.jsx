import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './index.css'
import Home from './Pages/Home'
import Layout from './Pages/Layout';
import { AllCrypto_URL, HOME_URL, Login_URL, Register_URL } from './Constants/Url';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CryptoCurrencies from './Pages/Cryptocurrencies';
import CryptoDetail from './Pages/CryptoDetail';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
      <Route path={HOME_URL} element={<Home/>}></Route>
      <Route path={Login_URL} element={<Login/>}></Route>
      <Route path={Register_URL} element={<Register/>}></Route>
      <Route path={AllCrypto_URL} element={<CryptoCurrencies/>}></Route>
      <Route path='/crypto/:coinId' element={<CryptoDetail/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
