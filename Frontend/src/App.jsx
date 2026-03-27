// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CodeTypeBar from "./pages/CodeTypeBar";
import Streaming from "./pages/Streaming";
import Portfolio from "./pages/Portfolio";
import GameServer from "./pages/GameServer";
import AccessInfo from "./pages/AccessInfo";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/codetype-bar" element={<CodeTypeBar />} />
          <Route path="/streaming" element={<Streaming />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/game-server" element={<GameServer />} />
          <Route path="/access-info" element={<AccessInfo />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
