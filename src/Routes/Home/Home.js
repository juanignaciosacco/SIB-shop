import './Home.css'
import image from '../../assets/image.jpg'
import ItemList from '../../Components/ItemList/ItemList'
import UploadItem from '../../Components/UploadItem/UploadItem'

const Home = () => {

    return (
        <div>
            <div >
                <img src={image} alt='Imagen portada'/>
            </div>
            <ItemList />
            <UploadItem />
        </div>
        
    )
}

export default Home