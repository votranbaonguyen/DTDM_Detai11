import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import './sass/Main.scss'
import { AllTable } from "./pages/alltable/AllTable";
import { Main } from "./template/main/Main";
import { MyTable } from "./pages/table/MyTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main/>}>
            <Route index path="/" element={<AllTable/>} />
            <Route index path="/table/:tableid" element={<MyTable/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
