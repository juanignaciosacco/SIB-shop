import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Routes/Home/Home';
import ItemListContainer from './Routes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './Routes/ItemDetailcontainer/ItemDetailContainer';
import Contacto from './Routes/Contacto/Contacto';
import { AdminIsLoggedProvider } from './Contextos/AdminContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccesoAdmin from './Components/AccesoAdmin/AccesoAdmin';


function App() {

  return (
    <BrowserRouter>
      <AdminIsLoggedProvider>
      <nav>
        <Navbar />
      </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/tienda" element={<ItemListContainer />} />
          <Route exact path='/login' element={<AccesoAdmin />} />
          <Route exact path="/tienda/producto/:id" element={<ItemDetailContainer />} />
          <Route exact path='/contacto' element={<Contacto />} />
        </Routes>
      </AdminIsLoggedProvider>
    </BrowserRouter>
  );
}

export default App;
