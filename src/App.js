import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Routes/Home/Home';
import ItemListContainer from './Routes/ItemListContainer/ItemListContainer';
import { ProdsProvider } from './Contextos/ProdsContext/ProdsContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
    <nav>
      <Navbar />
    </nav>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/tienda' element={<ItemListContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
