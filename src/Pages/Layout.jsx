import React from "react"
import { Outlet } from 'react-router-dom'
import NavBar from "../Components/Navbar/Navbar"
import { UserContextProvider } from "../Context/UserContext"

function Layout() {
    return (
        <main>
        <UserContextProvider>
            <NavBar/>
  
          <section className="body">
              <Outlet/>
          </section>
        </UserContextProvider>
          
  
      </main>
    )
}

export default Layout