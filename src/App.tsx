import { useState } from 'react'
import logoCertifikEDU from './assets/logoCertifikEDU.png'
import './App.css'

import AddressForm from './components/form/AddressForm.tsx'

function App() {
  return (
    <>
    <header className="bg-gray-800 text-white fixed w-full left-0 top-0 z-100">
      <div className="container mx-auto py-5">
        <a href="https://certifikedu.com" className="flex items-center">
          <img src={logoCertifikEDU} className="h-8 w-auto" alt="CertifikEDU logo" />
        </a>
      </div>
    </header>
    <body className=" pt-12">
      <div className=" p-10 bg-gray-100 rounded-lg">
        <AddressForm/>
      </div>
    </body>
    </>
  )
}

export default App
