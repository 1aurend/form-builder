import React, { useState, useEffect } from 'react'
import axios from 'axios'
import App from './App'


export const LLPeople = React.createContext()

export default function Data() {
  const [peopleList, setPeopleList] = useState()

  useEffect(() => {
    const loadPeople = async () => {
      const reqConfig = {
        method: 'GET',
        url: 'http://localhost:8080/people/list',
        responseType: 'json'
      }
      try {
        const result = await axios(reqConfig)
        setPeopleList(result.data.people)
      } catch (err) {
        alert(err)
      }
    }
    loadPeople()
  }, [])

  return (
    <LLPeople.Provider value={peopleList}>
      <App />
    </LLPeople.Provider>
  )

}
