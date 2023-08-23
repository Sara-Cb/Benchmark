import "./style/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import Welcome from "./components/Welcome";
import PageNotFound from "./components/PageNotFound";
import Benchmark from "./components/Benchmark";
import Result from "./components/Result";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <MyNavbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/test" element={<Benchmark />} />
            <Route path="/result" element={<Result />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
