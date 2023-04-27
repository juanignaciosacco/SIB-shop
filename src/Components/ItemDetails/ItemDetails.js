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
        <div className="carousel">
            {images2.length !== 0 ? (
                <Carousel
                    data={images2}
                    time={2000}
                    width="850px"
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
                    slideBackgroundColor="#FAF7E6"
                    slideImageFit="contain"
                    thumbnails={true}
                    thumbnailWidth="100px"
                    style={{
                        textAlign: "center",
                        maxWidth: "850px",
                        maxHeight: "500px",
                        margin: "200px auto",
                    }}
                />
            ):(
                <div>
                    {console.log('hola')}
                    <p>Cargando...</p>
                </div>
                )
            }
        </div>
            
    )
}

export default ItemDetails;