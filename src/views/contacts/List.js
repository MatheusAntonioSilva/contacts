import React, { useState } from 'react'
import Form from './Form'
import Row from './Row'
import { contacts } from './data'

export default function List() {
  let [list, setList] = useState(contacts)
  let [contact, setContact] = useState({ name: '', email: '', company: '', role: '' })

  const removeContact = (id) => {
    return setList(list.filter(row => row.id !== id))
  }
  
  let rows = list.map(contact => (
    <Row key={contact.id} data={contact} remove={removeContact} edit={setContact} />
  ))
  
  const addContact = (contact) => setList([...list, contact])

  const updateContact = (id, data) => {
    if(!data) { return null }
    
    let row = list.filter(row => row.id === id)
    
    row.name = data.name
    row.email = data.email
    row.company = data.company
    row.role = data.role

    setList([list.filter(row => row.id !== id), row])
    setContact({ name: '', email: '', company: '', role: '' })
  } 

  return (
    <div className="w-full mb-12 xl:mb-0 px-4">
      <div className="relative flex flex-col min-w-0 break-words bg-gray w-full mb-6 shadow-lg rounded mt-20">
        {contact.name}
        <Form save={addContact} update={updateContact} contact={contact} name={contact.name} />
      </div>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-20">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-gray-800">
                Contatos
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Nome
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  E-mail
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                Empresa
                </th>
                <th className="px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Cargo
                </th>
                <th className="px-6 bg-gray-100 text-center text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}