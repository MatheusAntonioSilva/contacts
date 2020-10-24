import React, { useState } from 'react'
import AlertError from './../../components/AlertError'
 
function getId() {
  return (5999 - Math.round(Math.random() * 392))
} 

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/
  return re.test(String(email).toLowerCase());
}
 
function validateContact(data, setErrors) {
  let errors = []
  setErrors(errors)

  if(data.name === '') { errors.push({ attribute: 'name', message: 'Nome não pode ficar em branco' }) }
  if(data.company === '') { errors.push({ attribute: 'company', message: 'Empresa não pode ficar em branco' }) }
  if(data.email === '' || !validateEmail(data.email)) { errors.push({ attribute: 'email', message: 'E-mail não é valido' }) }

  if (errors[0] == null) { return true }

  setErrors(errors)
}

function findAttribute(error, attribute) { 
  return error.attribute === attribute
}

function alertError(errors, attribute) {
  if(errors.length === 0) { return }

  let error = errors.find(e => findAttribute(e, attribute))
  if(!error) { return }

  return (<AlertError attribute={error.attribute} message={error.message} />)
}
 
export default function Form(props) {
  const [data, setData] = useState({ name: props.contact.name, 
                                     email: props.contact.email, 
                                     company: props.contact.company, 
                                     role: props.contact.role })

    const [errors, setErrors] = useState([])
  
  const changeField = (field) => {
    const change = (evt) =>  {
      setData({ ...data, [field]: evt.target.value })
    }
    return change
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    
    if (!validateContact(data, setErrors)) { return }
    if (!props.id) { return props.save({ ...data, id: getId() }) }
    
    props.update(this.id, data)

    setData({ name: '', email: '', company: '', role: '' })
  }
  
  return (
    <form onSubmit={handleSubmit} className="w-full px-4">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6">
        <div className="flex-auto p-5 lg:p-10">
          <div className="grid grid-cols-2 ">
            <div className="mr-10">
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >Nome</label
                ><input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Nome Completo"
                  value={data.name}
                  maxLength={35}
                  onChange={changeField('name')}
                />
                { alertError(errors, 'name') }
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >Email</label
                ><input
                  type="email"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Email"
                  maxLength={35} 
                  onChange={changeField('email')}
                />
                { alertError(errors, 'email') }
              </div>
            </div>
            <div className="ml-10">
              <div className="relative w-full mb-3 mt-8">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >Empresa</label
                ><input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Empresa"
                  maxLength={35}
                  onChange={changeField('company')}
                />
                { alertError(errors, 'company') }
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-gray-700 text-xs font-bold mb-2"
                  >Cargo</label
                ><input
                  type="text"
                  className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                  placeholder="Cargo"
                  maxLength={35} 
                  onChange={changeField('role')}
                />
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="submit"
            >
              {data.id ? 'Editar' : 'Adicionar'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}