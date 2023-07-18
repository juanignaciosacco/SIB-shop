import './ItemDetails.css'
import { useContext, useEffect, useState } from "react";
import { getFirestore, getDoc,  doc} from "firebase/firestore";
import { CartContext } from '../../Contextos/CartContext';
import { Link } from 'react-router-dom';
import CarouselItemDetail from '../CarouselItemDetail/CarouselItemDetail';

const ItemDetails = ({idProd}) => {
    
    const [producto, setProducto] = useState({})
    const [images2, setImages] = useState([])
    const [talleSelec, setTalleSelec] = useState('')
    const [colorP, setColorP] = useState()
    const { addItemToCart } = useContext(CartContext)
    const [colorSeleccionado, setColorSeleccionado] = useState(false)
    const [talleSeleccionado, setTalleSeleccionado] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const db = getFirestore()
        const itemById = doc(db, 'productos', idProd)
        getDoc(itemById)
            .then((snapshot) => {
                if(snapshot.exists()) {
                    setProducto({id: snapshot.id, ...snapshot.data()})
                }
            })
    }, [idProd])
    
    useEffect(() => {
        let list = [{}]
        for (let key in producto) {
            // eslint-disable-next-line
            key === 'picture_url' && producto[key].map((key) => {list.push(key)})
        }
        list.shift()
        setImages(list)
    }, [producto])

      const selectTalleHandler = (ev) => {
        ev.target.value !== 'Selecciona un talle' ? (
            setTalleSelec(ev.target.value)
        ) : (
            setTalleSelec('')
        )
      }

      const addItemToCartList = () => {
        const productoACarrito = {
            ...producto, 
            quantity: 1,
            TalleSelec: talleSeleccionado, 
            ColorSelec: colorP,
            imageIndx: currentIndex
        }
        addItemToCart(productoACarrito)
      }

      const selectColor = (ev) => {
        setColorP(ev.target.id)
        setColorSeleccionado(true)
        setTalleSeleccionado('')
      }

      const selectTalle = (ev) => {
        setTalleSeleccionado(ev.target.id)
      }

    return (
        <div className='itemDetailsContainer'>
            {images2.length !== 0 ? (
                <div className='itemDetails'>
                    <div className="itemDetailCarousel">
                        <CarouselItemDetail currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} colorP={colorP} images={images2}/>
                    </div>
                    <div className='itemDetailInfo'>
                        <h1>{producto.title}</h1>
                        <h2>${producto.price}</h2>
                        <hr style={{marginBottom: '30px', marginTop: '30px'}}/>
                        <h3>Hecho en Uruguay</h3>
                        <p>Materiales: {producto.Materiales}</p>
                        <hr style={{marginBottom: '30px', marginTop: '30px'}}/>
                        <h3>Medidas</h3>
                        {producto.Talles.length >= 1 ? (
                            <div>
                                <p>Talles: </p>
                                <select onChange={selectTalleHandler}>
                                    <option>Selecciona un talle</option>
                                    {producto.Talles.map((prod) =>( 
                                        <option key={prod.id} name={prod.talle} value={prod.talle} id={prod.talle}>{prod.talle}</option>
                                    ))}
                                </select>
                            </div>
                            ):(
                            <div>
                                <p>Talle unico</p>
                            </div>    
                        )}
                        {producto.Largo !== '0' && producto.Largo !== '' &&  <p>- Largo: {producto.Largo} cm</p>}
                        {producto.AnchoBusto !== '0' && producto.AnchoBusto !== '' &&  <p>- Ancho Busto: {producto.AnchoBusto} cm</p>}
                        {producto.Ruedo !== '0' && producto.Ruedo !== '' && <p>- Ruedo: {producto.Ruedo} cm</p>}
                        <hr style={{marginBottom: '30px', marginTop: '30px'}}/>
                        <div id='coloresDetailsContainer'>
                            <h3>Colores:</h3>        
                            <div>
                            {producto.Colores.length !== 0 && (producto.Colores.map((color, index) => (
                                Object.keys(color.sizes).some((size) => size === talleSelec) ? (
                                    <button className='colorBtnItemDetails' onClick={selectColor} key={index} id={color.color} style={{backgroundColor: `${color.color}`}}/>
                                ):(talleSelec === '' && (
                                    <button className='colorBtnItemDetails' onClick={selectColor} key={index} id={color.color} style={{backgroundColor: `${color.color}`}}/>
                                ))
                                )))}
                            </div>
                            {colorSeleccionado && (
                                <div>
                                    <h3>Color seleccionado para agregar a carrito</h3>
                                    <div className='colorBtnItemDetails' style={{backgroundColor: `${colorP}`, marginBottom: '15px'}}></div>
                                    <label style={{marginRight: '10px'}}>Selecciona un talle:</label>
                                    <div className='talleSelection'>
                                        {producto.Colores.map((color) => (
                                            color.color === colorP && (
                                                Object.entries(color.sizes).map(([size, index]) => (
                                                    <div className={talleSeleccionado === size ? 'tallesDetails seleccionado' : 'tallesDetails'} onClick={selectTalle} id={size} key={index}>{size}</div>
                                                ))
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <Link to={'/carrito'}><button className='btn' onClick={addItemToCartList}>Agregar al carrito</button></Link>
                    </div>
                </div>
            ):(
                <div>
                    <p>Cargando...</p>
                </div>
                )
            }  
        </div>
    )
}

export default ItemDetails;