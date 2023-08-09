import './AccesoAdmin.css'
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { useContext, useState } from 'react'
import { AdminContext } from '../../Contextos/AdminContext'
import { Link } from 'react-router-dom'

const AccesoAdmin = () => {

    const [email, setMail] = useState()
    const [password, setPassword] = useState()
    const [isLogged, setIsLogged] = useState(false)
    const { adminIsLogged } = useContext(AdminContext)
    const auth = getAuth()

    const logInHandler = (ev) => {
        ev.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLogged(true)
                adminIsLogged()
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const logOutHandler = () => {
        signOut(auth)
            .then(() => {
                alert('Cerraste sesion correctamente')
                setIsLogged(false)
            }).catch((error) => {
                alert(error)
            })
    }

    const updatePassHandler = () => {
        if (email !== undefined && email !== null) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Email enviado correctamente')
                    setMail(undefined)
                }).catch((error) => {
                    alert(error)
                })
        } else {
            setMail(prompt('Ingrese su email registrado'))
            email === '' && setMail(undefined)
        }
    }

    const mailChangeHandler = (ev) => {
        setMail(ev.target.value)
    }

    const passChangeHandler = (ev) => {
        setPassword(ev.target.value)
    }
    

    return (
        <div className='login'>
            <h1>Login</h1>
            <div className='logInContainer'>
                {isLogged ? (
                    <div>
                        <Link to={'/obtenerOrdenes'}><button className='btn'>Ordenes</button></Link>
                        <button className='btn' onClick={logOutHandler}>Cerrar sesion</button>
                    </div>
                ):(
                    <form className='formLogIn' onSubmit={logInHandler}>
                        <label htmlFor="email">Email</label>
                        <input id="email" name="email" onChange={mailChangeHandler}/>
                        <label htmlFor="password">Contraseña</label>
                        <input type='password' id="password" name="password" onChange={passChangeHandler}/>
                        <button className='btn'>Log in</button>
                        <p onClick={updatePassHandler}>Restablecer Contraseña</p>
                    </form>
                )}
            </div>
        </div>
    )
}

export default AccesoAdmin;