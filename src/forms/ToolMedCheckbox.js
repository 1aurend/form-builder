import React, { useState } from 'react'
import axios from 'axios'


export default function ToolMedRadio({ input, setShowModal }) {
  const [value, setValue] = useState(true)
  console.log(value)

  const createToolMed = async () => {
    const reqConfig = {
      method: 'POST',
      url: 'http://localhost:8080/tools/create',
      responseType: 'json',
      data: {
        input: input,
        type: value? 'tool' : 'medium',
      }
    }
    try {
      const result = await axios(reqConfig)
      console.log(result)
      //add resulting record to context here?
      setShowModal(false)
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div>
      <p>Is this a MEDIUM or a TOOL?</p>
        <input type='radio' value='tool' name='option' defaultChecked onChange={() => setValue(!value)}/>
        <label for='tool'>Tool</label>
        <input type='radio' value='medium' name='option' onChange={() => setValue(!value)}/>
        <label for='medium'>Medium</label>
      <button onClick={createToolMed}>ok!</button>
    </div>
  )
}
