import React, { useEffect, useRef, useState } from 'react'
import { addUser } from './Firebase-db'

function UserForm () {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([])
    const nameEl = useRef(null)


    useEffect(() => {
        console.log('Component Mounted!')
        nameEl.current.focus()
        return () => {
            console.log('Component willUnmount!')
        }
    }, [])

    useEffect(() => {
        console.log('Component Updated!, name or passowrd')
    }, [name, password])



    const formSubmitHandler = (event) => {
        event.preventDefault()
        let userObj = {
            name,
            email,
            password
        }
        // setUsers([ ...users, userObj ])
        addUser(name, email, password)

    }


    return <form onSubmit={formSubmitHandler} >
        <label htmlFor="name" > Name:- </label>
        <input ref={nameEl} id='name' name='name' type="text" value={name} onChange={(event) => setName(event.target.value)}
         />

        <label htmlFor="email" > Email:- </label>
        <input id='email' name='email' type="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="password" > Password:- </label>
        <input id='password' name='password' type="password" value={password} onChange={(event) => setPassword(event.target.value)}  />

        <button type='submit' > Submit </button>
    </form>

}

export default UserForm;