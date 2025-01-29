import './App.css'
import AddressForm from './components/form/AddressForm.tsx'

function App() {
  return (
    <>
    <header className="bg-gray-800 fixed inset-x-0 top-0 py-3">
      <h1 className="font-black text-2xl text-white">Cadastrar Endereço via CEP</h1>
    </header>
    <body className="mt-12">
      <div className="p-10 bg-gray-100 rounded-lg">
        <AddressForm/>
      </div>
    </body>
    </>
  )
}

export default App
