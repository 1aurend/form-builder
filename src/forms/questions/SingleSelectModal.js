import React, { useState } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import Modal, { ModalProvider } from 'styled-react-modal'


const StyledModal = Modal.styled`
  width: 75vmin;
  height: 75vmin;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  z-index: 30;
`

export default function SingleSelectModal(props) {
  const { value, setValue, valKey, data, text, ModalForm } = props
  const [options, setoptions] = useState(null)
  const [showModal, setShowModal] = useState(false)

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
      setoptions(formatted)
      return formatted.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return options.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const showModalForm = (inputValue) => {
    setValue(inputValue, valKey)
    setShowModal(true)
  }
  const handleChange = (inputValue) => {
    setValue(inputValue?.value? inputValue.value : '', valKey)
  }


  return (
    <ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>{text}</h4>
        <p style={{fontSize: '12px'}}>(I'm an async select form field. Start typing and I'll find matchng options for you. If you can't find what you're looking for, I can also pop out a modal with a new form for you to create a new record.)</p>
        <AsyncCreatableSelect
          isClearable
          value={value && {value: value, label: value}}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          onChange={handleChange}
          onCreateOption={showModalForm}
          />
        <StyledModal
          isOpen={showModal}
          onBackgroundClick={() => setShowModal(false)}
          >
          {/*this value prop is problemmatic for scaling...??*/}
          <ModalForm value={value} />
        </StyledModal>
      </div>
    </ModalProvider>
  )
}
