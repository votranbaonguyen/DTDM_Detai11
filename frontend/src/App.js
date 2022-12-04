import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css';
import './sass/Main.scss'
import { AllTable } from "./pages/alltable/AllTable";
import { Main } from "./template/main/Main";
import { MyTable } from "./pages/table/MyTable";
import { Login } from "./pages/authentication/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main/>}>
            <Route path="/" element={<AllTable/>} />
            <Route path="/table/:tablename" element={<MyTable/>} />
          </Route>
          <Route index path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
