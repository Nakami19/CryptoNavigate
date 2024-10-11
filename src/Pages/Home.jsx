import React, { useEffect, useState } from "react"
import { Fetch_price } from "../Api/api"
import { Link } from "react-router-dom"
import { AllCrypto_URL } from "../Constants/Url"
import { useUserContext } from "../Context/UserContext"


function Home() {

    const [precio, setPrecios]=useState([])
    const [loading, setLoading]=useState(true)
    const [alldata, setAllData]=useState([])
    const { user, isLoadingUser } = useUserContext();
    const SaldoUsuario = [
        { symbol: 'BTC', price: '0.0123' },
        { symbol: 'ETH', price: '1.2345' },
        { symbol: 'BNB', price: '2.3456' }
      ];
    
    

    useEffect(()=>{
        setLoading(true)
        const actualizarPrecios = () => {
            Fetch_price().then((data) =>{setPrecios(data.slice(-15)); setAllData(data)} ).finally(()=>setLoading(false))
          }
        
        actualizarPrecios()
        
        const intervalo = setInterval(actualizarPrecios, 30000);

        return () => clearInterval(intervalo)
    }
    ,[])

    return (
        <div className="bg-cyan-900 min-h-screen">
        <div className="p-4">
      <div className="bg-gray-100 p-2 rounded-lg shadow-md">
        <h3 className="text-sm font-semibold md:text-xl">Total de Criptomonedas</h3>
        <p className="text-sm font-bold md:text-xl">{alldata.length}</p>
      </div>
    </div>

    <h1 className="px-4 font-semibold text-white md:p-4 md:text-xl">Criptomonedas más recientes</h1>
    <Link to={AllCrypto_URL}>
    <h2 className="flex justify-end px-4 text-white font-semibold text-xs md:text-sm">Ver todas las criptomonedas</h2>
    </Link>
    {loading ? (
        <div className="flex justify-center h-screen items-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-blue-600" /> 
        </div>
    ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {precio.map((crypto)=>(
            <Link to={`/crypto/${crypto.symbol}`}>
            <div key={crypto.symbol} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold md:text-lg">{crypto.symbol}</h2>
              </div>
              <p className="text-sm text-gray-600">Precio: {crypto.price}$</p>
            </div>
            </Link>
            
        )
    )}
    </div> 
    )
    }
    {!isLoadingUser && (
            <>
                {!!user ?  (
                <>
                <h1 className="px-4 font-semibold text-white md:p-4 md:text-xl">Su saldo</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
                {SaldoUsuario.map((crypto)=>(
                    <div key={crypto.symbol} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow">
                        <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold md:text-lg">{crypto.symbol}</h2>
                        </div>
                        <p className="text-sm text-gray-600">Precio: {crypto.price}$</p>
                    </div>
                )
                )}   
                </div>  
                 </>  
                ) : (
                <></>
          )}
        </>
      )}
    
        </div>
      )
}

export default Home