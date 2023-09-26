import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages";
import "./styles.scss";
import { Navbar } from "./components/navbar";
import { CreateProposal } from "./pages/create-proposal";

const App = () => {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-proposal" element={<CreateProposal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
