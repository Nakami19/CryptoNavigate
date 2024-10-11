import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HOME_URL, Login_URL, Register_URL } from '../Constants/Url'
import cryptoNavigate from '../assets/cryptonavigate.png';
import { useUserContext } from '../Context/UserContext';
import {doc,onSnapshot} from 'firebase/firestore';
import { db } from '../Firebase/config';
import { logout } from '../Firebase/auth';


function NavBar () {

    const handleLogout = async () => {
        await logout(() => navigate(HOME_URL));
      };
    const navigate = useNavigate();
    const { user, isLoadingUser } = useUserContext();
    const [imagenFirebase, setImagenFirebase] = useState(null);
    const [nombreusuario, setNombreusuario] = useState(null);

    useEffect(() => {
        if (user && user.id) {
          const userDocRef = doc(db, "users", user.id);
      
          const unsubscribe = onSnapshot(userDocRef, (doc) => {
            setImagenFirebase(doc.data().url);
            setNombreusuario(doc.data().name)
          });
      
          return () => unsubscribe();
        }
      }, [user]);

    return (
        <nav className='bg-white h-16 md:h-20'>
            <ul className='flex justify-between items-center'>
                <ol className=''>
                    <a href={HOME_URL}>
                      <img src={cryptoNavigate} alt='CryptoNavigate' className='w-28 h-12 md:w-80 md:h-16 md:pl-16'/>  
                    </a>
                </ol>
                <div className='flex space-x-6 md:space-x-20 items-center'>
                   <ol className='text-sm font-sans md:text-lg'>
                    <Link to={HOME_URL}>
                        <h1>Inicio</h1>
                    </Link>
                    </ol>

        {!isLoadingUser && (
            <ul className='flex justify-between items-center'>
                {!!user ?  (
                    <>
                    <ol className="flex md:pr-12 md:space-x-8 items-center text-sm md:text-lg">
                    <button type='button' className="font-montserrat" onClick={handleLogout}>Cerrar sesión</button>
                <div className='flex items-center gap-3'>
                    <h1 className='font-montserrat hidden md:flex'>{nombreusuario}</h1>
                    <div className="">
                        <div className="md:w-16 w-12 h-14 rounded-full pt-1 md:pt-0">
                        {imagenFirebase ? (
                        <img src={imagenFirebase} alt="Profile"/>
                        ) : (
                        <img src="" alt="Profile" />
                        )}
                        </div>
                    </div>
                </div>
              </ol>
            </>     
                ) : (
                <div className='flex space-x-4 pr-2 md:pr-12'>
                    <ol className='text-xs border-2 border-coin-yellow p-px rounded hover:text-white hover:bg-coin-yellow md:text-lg md:px-2'>
                        <Link to={Register_URL}>
                        <button type='button' className="">Registrarse</button>
                        </Link>
                        
                    </ol>
                    <ol className='text-xs border-2 border-coin-yellow p-px rounded hover:text-white hover:bg-coin-yellow md:text-lg md:px-2'> 
                        <Link to={Login_URL}>
                        <button type='button' className="">Iniciar sesión</button>
                        </Link>
                        
                    </ol>  
                </div> 
          )}
        </ul>
      )}
                </div>  
            </ul>
        </nav>
    )
}

export default NavBar