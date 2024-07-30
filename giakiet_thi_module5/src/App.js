import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./components/book/List";
import Create from "./components/book/create";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/bill" element={<List/>} />
          <Route path="/create" element={<Create/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </>
  );
}
export default App;
