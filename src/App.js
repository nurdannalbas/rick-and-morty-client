import './App.css';
import { BasePage } from './pages/basePage/base-page';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import { DetailPage } from './pages/detailPage/detail-page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
