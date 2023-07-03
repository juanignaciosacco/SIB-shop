import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import './InstagramWidget.css'

const InstagramWidget = () => {


    return (
        <div>
            <i className="ig"><FontAwesomeIcon icon={faInstagram} /></i>
        </div>
    )
}

export default InstagramWidget;