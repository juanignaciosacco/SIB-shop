import './WhatsappWidget.css'
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WhatsappWidget = () => {

    return (
        <div id='whatsapp'>
            <a target='_blank' rel="noreferrer" href='https://wa.link/epy9s8'><i><FontAwesomeIcon className='sticky' icon={faWhatsapp} /></i></a>
        </div>
    )
}

export default WhatsappWidget;