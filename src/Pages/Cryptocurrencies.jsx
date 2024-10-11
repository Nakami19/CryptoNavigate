import React, { useEffect, useState } from "react";
import { Fetch_price } from "../Api/api";
import { Link } from "react-router-dom";



function CryptoCurrencies() {

    const [loading, setLoading]=useState(true)
    const [alldata, setAllData]=useState([])
    const [busqueda, setBusqueda]=useState("");
    const [mostrado, setMostrado]=useState([])
    const [filtrado, setFiltrado]=useState("sin filtro")
    const handleChange= (e)=> {
        const buscado=e.target.value.toUpperCase()
        setBusqueda(buscado)
        if (buscado!="") {
            const filtered = alldata.filter((crypto) => {
               const igualaSimbolo=crypto.symbol.toUpperCase().includes(buscado)
                const igualaPrecio=crypto.price.includes(buscado)
                return igualaPrecio||igualaSimbolo 
            }
            );
            setMostrado(filtered)
          }
        else {
            setMostrado(alldata)
        }
    }

    const handleSortChange = (e) => {
        const filtrar=e.target.value
        setFiltrado(filtrar);
        if(filtrar==="precio") {
            const ordenar = mostrado.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
            setMostrado(ordenar)
        } else {
            const ordenaralpha= mostrado.sort((a, b) => a.symbol.localeCompare(b.symbol))
            setMostrado(ordenaralpha)
        }
    }


    useEffect(()=> {
    },[busqueda])

    useEffect(()=>{
        setLoading(true)
        const actualizarPrecios = () => {
            Fetch_price().then((data) =>{setAllData(data); setMostrado(data)} ).finally(()=>setLoading(false))
          }
        
        actualizarPrecios()
        
        const intervalo = setInterval(actualizarPrecios, 30000);

        return () => clearInterval(intervalo)
    }
    ,[])

    return (
    <div className="bg-cyan-900 min-h-screen">
    <h1 className="p-4 font-semibold text-white md:p-4 md:text-xl">Criptomonedas</h1>
    <div className="flex justify-start p-3 h-12">
        <input className="w-1/2 border-2 border-[#22254b] rounded-md p-2 md:h-10" placeholder="Buscar por nombre o precio" onChange={handleChange}/>
    </div>

    <div className="px-4 md:p-4">
    <label className="mr-4 text-white">
        <input type="radio" value="alfabético" className="mr-1" checked={filtrado === 'alfabético'} onChange={handleSortChange}/>
        Orden Alfabético
    </label>
    <label className="text-white">
        <input type="radio" value="precio" className="mr-1" checked={filtrado === 'precio'} onChange={handleSortChange}/>
        Ordenar por Precio
    </label>
    <label className="text-white ml-2">
        <input type="radio" value="sin filtro" className="mr-1" checked={filtrado === 'sin filtro'} onChange={handleSortChange}/>
        Sin ordenar
    </label>
    </div>

    {loading ? (
        <div className="flex justify-center h-screen items-center">
        <div className="border-gray-300 h-12 w-12 animate-spin rounded-full border-8 border-t-blue-600" /> 
        </div>
    ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
        {mostrado.map((crypto)=>(
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
        </div>
      )
}

export default CryptoCurrencies