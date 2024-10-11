import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { registerWithEmailAndPassword } from "../Firebase/auth";
import { HOME_URL } from "../Constants/Url";
import { useUserContext } from "../Context/UserContext";
import { useUsers } from "../Hooks/useUser";

function Register() {

    const [formData, setData] = useState({});
    const navigate = useNavigate();
    const newErrors = {};
    const {usuarios, getUsuarios} = useUsers()
    const [errors, setErrors] = useState({});

    const onSuccess = () => {
        navigate(HOME_URL);
      };


    const onFail = (_error) => {
        newErrors.email = "El correo electrónico es inválido o ya ha sido tomado";
      };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email) {
          newErrors.email = "El correo electrónico es obligatorio";
        }
        if (!formData.name) {
          newErrors.name = "El nombre de usuario es obligatorio";
        } else if(formData.name.length < 4){
          newErrors.name="El mínimo de caracteres para el nombre de usuario es 4"
        } else if(formData.name.length > 16){
          newErrors.name="El límite es de 16 caracteres"
        }else if (formData.name.includes(" ")) { 
            newErrors.name = "El nombre de usuario no puede contener espacios en blanco";}
            usuarios.map((usuario)=>{
          if (usuario.name == formData.name){
            newErrors.name = "El nombre de usuario ya ha sido registrado";}
          })
        if (!formData.fullname){
          newErrors.fullname = "El nombre y apellido es obligatorio";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
          newErrors.fullname = "El nombre y apellido solo pueden contener letras y espacios en blanco";
        }
       else if (formData.fullname.trim().length !== formData.fullname.length) {
        newErrors.fullname = "El nombre y apellido no pueden comenzar ni terminar con espacios en blanco";
      }

        if (!formData.password) {
          newErrors.password = "La contraseña es obligatoria";
        } else if(formData.password.length < 8){
          newErrors.password="Verifica que la contraseña contenga 8 caracteres"
        }
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        await registerWithEmailAndPassword({
          userData: formData,
          onSuccess,
          onFail,
        });
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      };
    
    const onChange = (event) => {
        setData((oldData) => ({
          ...oldData,
          [event.target.name]: event.target.value,
        }));
      };

    return (
        <div className="min-h-screen  md:bg-[url('https://de.scalable.capital/images/kcbf79ije7q7/5ef6c9cjoexQ9B1z1HLDFY/aeb7421530c3dd1bc48dd3398bb4977c/Crypto_LP_Header_-_EN.png')] bg-no-repeat lg: bg-left bg-contain bg-cyan-900">
    
                <div className="flex flex-col items-center justify-center ">
                    <div className="bg-coin-yellow shadow relative lg:rounded-none md: rounded-xl lg:px-28 md: px-10 md: pb-10 lg:min-h-screen lg:ms-auto md: h-5/6 lg:w-1/2 md: w-5/6  lg:mt-0 md: mt-10">
                     <div className="scale-90">   
                        <p tabIndex="0" className="focus:outline-none text-sm mt-1 font-medium leading-none text-gray-500 font-montserrat text-right">¿Ya tienes una cuenta? <a href="/login"   className="hover:text-orange-700 focus:text-orange-700 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-blue-800 cursor-pointer font-montserrat"> Inicia sesión</a></p>
                        <p tabIndex="0" className="focus:outline-none text-3xl font-extrabold leading-6  font-raleway text-[#001A72] text-center lg:mt-14 md: mt-10">Registrarse</p>

                            <div className='mt-6'>
                                <label id="email" className="text-sm font-medium leading-none text-gray-800 font-montserrat" >
                                    Correo electrónico
                                </label>
                                <input aria-labelledby="email" type="email" name="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" id="email" placeholder="Ej. ejemplo@gmail.com" onChange={onChange}/>
                                {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email}</p>)}
                            </div>

                            <div className='mt-4'>
                                <label id="fullname" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre y apellido 
                                </label>
                                <input aria-labelledby="email" type="text" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" pattern="[A-Za-z]+" required  placeholder="Ej. Pedro Perez" name="fullname" onChange={onChange}/>
                                {errors.fullname && (<p className="text-red-500 text-xs mt-1">{errors.fullname}</p>)}
                            </div>

                            <div className='mt-4'>
                                <label id="username" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre de usuario
                                </label>
                                <input aria-labelledby="email" type="text" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" pattern="[A-Za-z]+" required  placeholder="@simoncito" name="name" onChange={onChange}/>
                                {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name}</p>)}
                            </div>

                            <div className="mt-4  w-full">
                                <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Contraseña
                                </label>
                               <div className="relative flex items-center justify-center">
                                <input id="pass" type="password" name="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"  placeholder="********" onChange={onChange}/>
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">             
                                </div>
                               </div>
                               {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}
                            </div>
                            <div className="mt-8">
                                <button type="submit" role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-700 py-4 w-full" onClick={handleSubmit}>Registrarse</button>
                            </div>
                
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Register