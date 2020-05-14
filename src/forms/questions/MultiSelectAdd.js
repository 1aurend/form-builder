import React, { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import Modal, { ModalProvider } from 'styled-react-modal'


const PeopleModal = Modal.styled`
  width: 75vmin;
  height: 75vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 30;
`

export default function MultiSelectAdd(props) {
  const { value, setValue, valKey, data, text, ModalForm } = props
  const [options, setOptions] = useState(null)
  const [showCheckbox, setShowCheckbox] = useState(false)

  const defaultOptions = [
    {value: data[0], label: data[0]},
    {value: data[1], label: data[1]},
    {value: data[2], label: data[2]}
  ]

  //NB: async-select only works with async load function
  const loadOptions = async (inputValue) => {
    if (!options) {
      const formatted = data.map(item => {
        return {value: item, label: item}
      })
      setOptions(formatted)
      return formatted.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  // const showSelector = (inputValue) => {
  //   setValue(inputValue, valKey)
  //   setShowCheckbox(true)
  // }
  const handleChange = (inputValue) => {
    setValue(inputValue?.value? inputValue.value : '', valKey)
  }


  return (
    <ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>{text}</h4>
        <p style={{fontSize: '12px'}}>(I'm an async multi-select form field. Start typing and I'll find matchng options for you. You can add as many as you want! If you can't find what you're looking for, I can also help you add options.)</p>
        <AsyncCreatableSelect
          isClearable
          isMulti
          value={value && {value: value, label: value}}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          onChange={handleChange}
          onCreateOption={handleChange}
          />
      </div>
    </ModalProvider>
  )
}
