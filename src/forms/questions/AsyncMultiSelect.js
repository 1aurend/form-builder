import React, { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import Modal, { ModalProvider } from 'styled-react-modal'
import _ from 'lodash'


const StyledModal = Modal.styled`
  width: 40vmin;
  height: 20vmin;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
`

export default function AsyncMultiSelect(props) {
  const { value, setValue, valKey, data, text, ModalContent } = props
  const formattedValue = _.isString(value)? '' : value.map(item => {
    return {value: item.id, label: item.name}
  })
  const [options, setOptions] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const defaultOptions = [
    {value: data[0].id, label: data[0].name},
    {value: data[1].id, label: data[1].name},
    {value: data[2].id, label: data[2].name}
  ]

  //NB: async-select only works with async load function
  const loadOptions = async (inputValue) => {
    if (!options) {
      const formatted = data.map(item => {
        return {value: item.id, label: item.name}
      })
      setOptions(formatted)
      return formatted.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const showModalSelector = (inputValue) => {
    setValue([...value, {id: inputValue.value, name: inputValue.label}], valKey)
    setShowModal(true)
  }
  const handleChange = (inputValue) => {
    setValue(inputValue? inputValue.map(item => {return {id: item.value, name: item.label}}) : '', valKey)
  }


  return (
    <ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>{text}</h4>
        <p style={{fontSize: '12px'}}>(I'm an async multi-select form field. Start typing and I'll find matchng options for you. You can add as many as you want! If you can't find what you're looking for, I can also help you add options.)</p>
        <AsyncCreatableSelect
          isClearable
          isMulti
          value={formattedValue}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          onChange={handleChange}
          onCreateOption={showModalSelector}
          />
        {ModalContent && <StyledModal
          isOpen={showModal}
          onBackgroundClick={() => setShowModal(false)}
          >
          <ModalContent input={value} setShowModal={setShowModal}/>
        </StyledModal>}
      </div>
    </ModalProvider>
  )
}
