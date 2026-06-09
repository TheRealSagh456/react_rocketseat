
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Components from './pages/componentes'
import HomePage from './pages/home-page'
import MainHeader from './pages/outlet-header'
import Refund from './pages/new-refund'
import GetRefund from './pages/existent-refund'
import Confirmation from './pages/confirmation'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<MainHeader/>}>
          <Route path='/confirmation' element={<Confirmation/>}/>
          <Route path='/new-refund' element={<Refund/>}/>
          <Route path='/refunds/:id' element={<GetRefund/>}/>
          <Route path='/componentes' element={<Components/>}/>
          <Route index element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

