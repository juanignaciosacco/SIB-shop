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
import FeedbackCompra from './Components/feedbackCompra/FeedbackCompra';
import Footer from './Components/Footer/Footer';
import HistoryOrders from './Components/HistoryOrders/HistoryOrders';
import WhatsappWidget from './Components/WhatsappWidget/WhatsappWidget';
import { useState } from 'react';
import InConstruction from './Components/InConstruction/InConstruction';

function App() {

  const [inConstruction, setInConstruction] = useState(false)

  return (

    <div>
      {inConstruction ? (
        <InConstruction />
      ):(
      <div>
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
                      <Route exact path='/feedback' element={<FeedbackCompra />} />
                      <Route exact path='/historial' element={<HistoryOrders />} />
                  </Routes>
                  <WhatsappWidget />
              <footer>
                <Footer />
              </footer>
            </ItemsProvider>
          </AdminIsLoggedProvider>
        </BrowserRouter>
      </div>
      )}
    </div>
  );
}

export default App;
