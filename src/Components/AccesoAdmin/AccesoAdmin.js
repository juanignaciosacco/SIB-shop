import './AccesoAdmin.css'
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth'
import { useContext, useState } from 'react'
import { AdminContext } from '../../Contextos/AdminContext'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const AccesoAdmin = () => {

    const [email, setMail] = useState()
    const [password, setPassword] = useState()
    const { adminIsLogged, logged } = useContext(AdminContext)
    const [isLogged, setIsLogged] = useState(logged)
    const auth = getAuth()

    const logInHandler = (ev) => {
        ev.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setIsLogged(true)
            adminIsLogged()
            Swal.fire("Login exitoso", "Has iniciado sesion correctamente", "success")
        }).catch((error) => {
            switch (error.code) {
                case 'auth/user-not-found':
                    Swal.fire('Error de validacion', "El usuario ingresado no existe!", 'error');
                    break;
                case 'auth/wrong-password':
                    Swal.fire('Error de validacion', "La contraseña es incorrecta!", 'error');
                    break;
                default:
                    break;
            }
        })
    }

    const logOutHandler = () => {
        signOut(auth).then(() => {
            Swal.fire('Logout', 'Cerraste sesion correctamente', "warning")
            setIsLogged(false)
            adminIsLogged()
        }).catch((error) => {
            throw error;
        })
    }

    const updatePassHandler = () => {
        if (email !== undefined && email !== null) {
            sendPasswordResetEmail(auth, email).then(() => {
                Swal.fire('Email enviado', 'Email enviado correctamente', 'success')
                setMail(undefined)
            }).catch((error) => {
               throw error;
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
                {
                    isLogged ? (
                        <div className="btns-accesoAdmin">
                            <Link to={'/obtenerOrdenes'}>
                                <button className='btn'>Ordenes</button>
                            </Link>
                            <button className='btn'
                                onClick={logOutHandler}>Cerrar sesion</button>
                        </div>
                    ) : (
                        <form className='formLogIn'
                            onSubmit={logInHandler}>
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email"
                                onChange={mailChangeHandler} />
                            <label htmlFor="password">Contraseña</label>
                            <input type='password' id="password" name="password"
                                onChange={passChangeHandler} />
                            <button className='btn'>Log in</button>
                            <p onClick={updatePassHandler}>Restablecer Contraseña</p>
                        </form>
                    )
                } </div>
        </div>
    )
}

export default AccesoAdmin;
