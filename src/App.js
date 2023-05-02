import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Routes/Home/Home';
import ItemListContainer from './Routes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './Routes/ItemDetailcontainer/ItemDetailContainer';
import Contacto from './Routes/Contacto/Contacto';
import AccesoAdmin from './Components/AccesoAdmin/AccesoAdmin';
import Cart from './Components/Cart/Cart';
import { AdminIsLoggedProvider } from './Contextos/AdminContext';
import { ItemsProvider } from './Contextos/CartContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <AdminIsLoggedProvider>
        <ItemsProvider>
          <nav>
            <Navbar />
          </nav>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path="/tienda" element={<ItemListContainer />} />
              <Route exact path='/login' element={<AccesoAdmin />} />
              <Route exact path="/tienda/producto/:id" element={<ItemDetailContainer />} />
              <Route exact path='/contacto' element={<Contacto />} />
              <Route exact path='/carrito' element={<Cart />} />
            </Routes>
        </ItemsProvider>
      </AdminIsLoggedProvider>
    </BrowserRouter>
  );
}

export default App;
