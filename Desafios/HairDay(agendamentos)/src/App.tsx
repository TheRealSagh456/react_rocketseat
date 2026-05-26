import { BrowserRouter, Route, Routes } from "react-router";
import PageComponents from "./pages/components";
import HomePage from "./pages/home";


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/componentes" element={<PageComponents/>}/>
        <Route path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  )
   
  
}
