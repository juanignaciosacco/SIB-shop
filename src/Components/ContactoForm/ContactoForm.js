import './ContactoForm.css'

const ContactoForm = () => {

    return (
        <div id="contactoForm">
            <form className="form">
                <label htmlFor="nombre">Nombre</label>
                <input name="nombre" id="nombre" className='formInputs' />
                <label htmlFor="apellido">Apellido</label>
                <input name="apellido" id="apellido" className='formInputs' />
                <label htmlFor="email">Email</label>
                <input name="email" id="email" className='formInputs' />
                <label htmlFor="mensaje">Mensaje</label>
                <textarea name="mensaje" id="mensaje" rows='10' cols='50' className='formInputs' />
                <div>
                    <button className='btnForm'>Enviar</button>
                    <button className='btnForm'>Resetear</button>
                </div>
            </form>
        </div>
    )
}

export default ContactoForm;