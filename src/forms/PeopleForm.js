import React, { useState } from 'react'
import axios from 'axios'


export default function PeopleForm({ value, createdId }) {
  const [formValues, setformValues] = useState({
    first: '',
    last: '',
    email: ''
  })
  const [success, setSuccess] = useState(false)

  const createPerson = async () => {
    const reqConfig = {
      method: 'POST',
      url: 'http://localhost:8080/people/create',
      responseType: 'json',
      data: {
        firstName: formValues.first,
        lastName: formValues.last,
        email: formValues.email,
        role: 'LL Staff'
      }
    }
    try {
      const result = await axios(reqConfig)
      console.log(result)
      createdId.current = result.data.result.id
      //add resulting record to context here?
      setSuccess(true)
    } catch (err) {
      alert(err)
    }
  }

  if (success) {
    return (
      <>
        <h1>Success!</h1>
        <p>{formValues.first} {formValues.last} added to Airtable</p>
        <p>Click anywhere in the background to finish filling out your form.</p>
      </>
    )
  }
  return (
    <>
      <h1>Hello {value}!</h1>
      <p>Sorry we can't find you in our airtable. Use this form add your info.</p>
      <h4>first name</h4>
      <input type="text" onChange={e => setformValues({...formValues, first: e.target.value})} />
      <h4>last name</h4>
      <input type="text" onChange={e => setformValues({...formValues, last: e.target.value})} />
      <h4>email</h4>
      <input type="text" onChange={e => setformValues({...formValues, email: e.target.value})} />
      <button onClick={createPerson} style={{marginTop: '15px'}}>Submit</button>
    </>
  )
}
