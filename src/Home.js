import React from 'react'
import { Link } from 'react-router-dom'


export default function Home() {
  return (
    <>
      <h1>Form Builder!</h1>
      <h4>Select a sample form below to test</h4>
      <ul>
        <li><Link to='/resource'>Resource Form</Link></li>
      </ul>
    </>
  )
}
