import './ItemDetails.css'
import { useEffect, useState } from "react";
import { getFirestore, getDoc,  doc} from "firebase/firestore";
import { Carousel } from 'react-carousel-minimal';

const ItemDetails = ({idProd}) => {
    
    const [producto, setProducto] = useState({})
    const [images2, setImages] = useState([])

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
            key === 'imgUrl' && producto[key].map((key) => {list.push({image: key})})
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
                    <h2>{producto.Nombre}</h2>
                    <h3>${producto.Precio}</h3>
                    <hr />
                    <h4>Hecho en Uruguay</h4>
                    <p>Materiales: {producto.Materiales}</p>
                    <hr />
                    <h4>Medidas</h4>
                    <p>Talle único</p>
                    <p>- Largo: {producto.Largo} cm</p>
                    <p>- Ancho Busto: {producto.AnchoBusto} cm</p>
                    <p>- Ruedo: {producto.Ruedo} cm</p>
                    <ul>

                    </ul>
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