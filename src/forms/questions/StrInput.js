import React from 'react'


export default function StrInput(props) {
  const { title, value, setValue, valKey } = props

  return (
    <div style={{maxWidth:'30%'}}>
      <h4>{title}</h4>
      <input
        type='text'
        value={value}
        onChange={e => setValue(e, valKey)}
        style={{width: '100%', height: '25px'}}
        />
    </div>
  )
}
