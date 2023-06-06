import './WhatsappWidget.css'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhatsappWidget = () => {

    return (
        <div id='whatsapp'>
            <i><FontAwesomeIcon icon={faWhatsapp} /></i>
        </div>
    )
}

export default WhatsappWidget;