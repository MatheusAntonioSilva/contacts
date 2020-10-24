import React from 'react'
import './App.css'
import ContactList from './views/contacts/List'

function App() {
  return (
    <div className="w-full bg-gray-100">
      <div className="px-4 md:px-10 mx-auto w-full">
        <div className="flex flex-wrap">
          <ContactList />
        </div>
      </div>
    </div>
  )
}

export default App
