import React, { useState } from 'react'
import axios from 'axios'


export default function ToolMedRadio({ input, setShowModal, createdId }) {
  const [value, setValue] = useState(true)
  console.log(input)

  const createToolMed = async () => {
    const reqConfig = {
      method: 'POST',
      url: 'http://localhost:8080/toolsmeds/create',
      responseType: 'json',
      data: {
        input: input.name,
        type: value? 'TOOL' : 'MEDIA',
      }
    }
    try {
      const result = await axios(reqConfig)
      console.log(result)
      createdId(result.data.result[1].id)
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
