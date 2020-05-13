import React, { useState } from 'react'


export default function PeopleForm({ name }) {

  const createPerson = () => {
    alert(`ready to send ${name} to airtable`)
  }

  return (
    <>
      <h1>hello {name}!</h1>
      <p>Sorry we can't find you in our airtable. Use this form add your info.</p>
      <h4>first name</h4>
      <input type="text" />
      <h4>last name</h4>
      <input type="text" />
      <h4>email</h4>
      <input type="text" />
      <button onClick={createPerson} style={{marginTop: '15px'}}>Submit</button>
    </>
  )
}
