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
import { HashRouter, Route, Routes } from 'react-router-dom';
import FeedbackCompra from './Components/FeedbackCompra/FeedbackCompra';
import Footer from './Components/Footer/Footer';
import WhatsappWidget from './Components/WhatsappWidget/WhatsappWidget';
import InConstruction from './Components/InConstruction/InConstruction';
import ObtenerOrdenes from './Components/ObtenerOrdenes/ObtenerOrdenes';
import ObtenerOrden from './Components/ObtenerOrden/ObtenerOrden';

function App() {

  const inConstruction = false;

  return (

    <div>
      {inConstruction ? (
        <InConstruction />
      ) : (
        <div>
          <HashRouter>
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
                  <Route exact path='/feedback/:compraEf' element={<FeedbackCompra />} />
                  <Route exact path='/obtenerOrdenes/' element={<ObtenerOrdenes />} />
                  <Route exact path='/obtenerOrden/:idOrdenComprador' element={<ObtenerOrden />} />
                </Routes>
                <WhatsappWidget />
                <footer>
                  <Footer />
                </footer>
              </ItemsProvider>
            </AdminIsLoggedProvider>
          </HashRouter>
        </div>
      )}
    </div>
  );
}

export default App;
