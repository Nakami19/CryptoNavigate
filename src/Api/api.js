let endpoint_prices = "https://api.binance.com/api/v3/ticker/price"
let endpoint_details="https://api.binance.com/api/v3/klines"


export async function Fetch_price() {
    return fetch(endpoint_prices).then(response => response.json()).catch(e => console.log(e)) 
} 

export async function fetch_details(symbol) {
    const data = await fetch(`https://api.binance.com/api/v3/klines?symbol=NEIROFDUSD&interval=1M`).then(response => response.json()).then((data)=>{
        return data.map(atribute => ({
        time: atribute[0], //tiempo de apertura
        open: atribute[1], //precio de apertura
        high: atribute[2], //precio mas alto en intervalo
        low: atribute[3], //precio mas bajo en intervalo
        close: atribute[4], //precio de cierre
        volume: atribute[5] //volumen negociado en intervalo
      }))
    }).catch(e => console.log(e))
    

    return data

}