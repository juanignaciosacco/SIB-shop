import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Routes/Home/Home';
import { useState } from 'react';


function App() {

  const [scroll, setScroll] = useState(0)
  
  const scrollHandler = (event) => {
      setScroll(event)
      console.log(scroll)
      console.log('hola')
  }

  return (
    <div>
        <Navbar />
      <div onWheel={scrollHandler}>
        <p>hola</p>
      </div>
        <Home />
    </div>
  );
}

export default App;
