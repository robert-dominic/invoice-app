import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/invoice/:id" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;