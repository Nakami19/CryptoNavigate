import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetch_details } from '../Api/api';

function CryptoDetail() {
    const [detalles, setDetalles] = useState([]);
    const [loading, setLoading] = useState(true);
    const {coinId}=useParams();
    const navigate = useNavigate()

    useEffect(()=>{
        setLoading(true)
        const obtenerDetalles = () => {
            fetch_details(coinId)
            .then((data) => {
              setDetalles(data[0]);
            })
            .finally(() => setLoading(false));
          }
        
        obtenerDetalles()
        
    }
    ,[])
    
    return (
        <div className="p-6 bg-cyan-900 text-white min-h-screen">
      {loading ? (
        <div className="flex justify-center h-screen items-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-blue-600" /> 
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-lg font-semibold md:text-2xl">
            Simbolo: {coinId}
            </h2>
            <p className='p-1 text-sm md:text-xl'>Información acerca de la criptomoneda en el último mes</p>
          </div>
          
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="mb-6">
                <p className="text-sm text-gray-400 font-semibold md:text-lg">
                Una visión general que muestra las estadísticas de {coinId}, como su precio de apertura y cierre, su precio más alto y el volumen de negociación.
                </p>
            </div>
            <div className='text-sm space-y-3 md:text-lg'>
                <h1>Precio de apertura: {detalles.open} $</h1>
                <h1>Precio más alto: {detalles.high} $</h1>
                <h1>Precio más bajo: {detalles.low} $</h1>
                <h1>Volumen negociado: {detalles.volume} </h1>  
            </div>
            </div>

            <div className="mt-6 flex justify-end">
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-blue-600 w-24">
                    Volver
                </button>
            </div>
        
        </>
      )}
    </div>
    )
}

export default CryptoDetail;