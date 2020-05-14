import React from 'react'


export default function StrInput(props) {
  const { title, value, setValue, label } = props

  return (
    <div style={{maxWidth:'30%'}}>
      <h4>{title}</h4>
      <input type='text' value={value} onChange={e => setValue(e, label)} />
    </div>
  )
}
