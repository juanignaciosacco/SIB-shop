import './ItemDetails.css'
import { useContext, useEffect, useState } from "react";
import { getFirestore, getDoc,  doc} from "firebase/firestore";
import { Carousel } from 'react-carousel-minimal';
import { CartContext } from '../../Contextos/CartContext';
import { Link } from 'react-router-dom';

const ItemDetails = ({idProd}) => {
    
    const [producto, setProducto] = useState({})
    const [images2, setImages] = useState([])
    const { addItemToCart } = useContext(CartContext)

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
            key === 'picture_url' && producto[key].map((key) => {list.push({image: key})})
        }
        list.shift()
        setImages(list)
    }, [producto])

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
      }

      const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
      }

      const addItemToCartList = () => {
        const productoACarrito = {...producto, quantity: 1}
        addItemToCart(productoACarrito)
      }

    return (

        <div>
        {images2.length !== 0 ? (
            <div className='itemDetails'>
                <div className="itemDetailCarousel">
                    <Carousel
                        data={images2}
                        time={2000}
                        width="750px"
                        height="600px"
                        captionStyle={captionStyle}
                        radius="10px"
                        slideNumber={false}
                        slideNumberStyle={slideNumberStyle}
                        captionPosition="bottom"
                        automatic={false}
                        dots={true}
                        pauseIconColor="black"
                        pauseIconSize="40px"
                        slideBackgroundColor="#fff"
                        slideImageFit="contain"
                        thumbnails={true}
                        thumbnailWidth="100px"
                        style={{
                            textAlign: "center",
                            maxWidth: "850px",
                            maxHeight: "500px",
                            margin: "0 auto",
                        }}
                    />
                </div>
                <div className='itemDetailInfo'>
                    <h2>{producto.title}</h2>
                    <h3>${producto.price}</h3>
                    <hr />
                    <h4>Hecho en Uruguay</h4>
                    <p>Materiales: {producto.Materiales}</p>
                    <hr />
                    <h4>Medidas</h4>
                    {producto.Talles.length > 1 ? (
                        <div>
                            <p>Talles: </p>
                            <select>
                                {producto.Talles.map((talle) =>( 
                                    <option name={talle} value={talle} id={talle}>{talle}</option>
                                ))}
                            </select>
                        </div>
                        ):(
                        <div>
                            <p>Talle unico: {producto.Talles}</p>
                        </div>    
                    )}
                    <p>- Largo: {producto.Largo} cm</p>
                    <p>- Ancho Busto: {producto.AnchoBusto} cm</p>
                    <p>- Ruedo: {producto.Ruedo} cm</p>
                    <hr />
                    <h4>Colores</h4>
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