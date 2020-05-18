import React from 'react'
import Select from 'react-select'
import _ from 'lodash'


export default function MultiSelect(props) {
  const { value, setValue, valKey, data, text, subText } = props
  const formattedValue = _.isString(value)? '' : value.map(item => {
    return {value: item.id, label: item.name}
  })
  const formattedOptions = data.map(item => {
    return {value: item.id, label: item.name}
  })

  const handleChange = (inputValue) => {
    setValue(inputValue? inputValue.map(item => {return {id: item.value, name: item.label}}) : '', valKey)
  }

  return (
    <div style={{maxWidth: '30%'}}>
      <h4>{text}</h4>
      <p>{subText}</p>
      <p style={{fontSize: '12px'}}>(I'm a basic multi-select with all the available options preloaded.)</p>
      <Select
        isMulti
        isClearable
        options={formattedOptions}
        value={formattedValue}
        onChange={handleChange}
        />
    </div>
  )
}
