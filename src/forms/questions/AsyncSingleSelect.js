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

export default function AsyncSingleSelect(props) {
  const { value, setValue, valKey, data, text, ModalForm, createdId } = props
  const [options, setoptions] = useState(null)
  const [showModal, setShowModal] = useState(false)
  console.log(data)

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
      setoptions(formatted)
      return formatted.filter(option => option.label?.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return options.filter(option => option.label?.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const showModalForm = (inputValue) => {
    console.log(inputValue)
    setValue({id: null, name: inputValue}, valKey)
    setShowModal(true)
  }
  const handleChange = (inputValue) => {
    setValue(inputValue?.value? {id: inputValue.value, name: inputValue.label} : '', valKey)
  }


  return (
    <ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>{text}</h4>
        <p style={{fontSize: '12px'}}>(I'm an async select form field. Start typing and I'll find matchng options for you. If you can't find what you're looking for, I can also pop out a modal with a new form for you to create a new record.)</p>
        <AsyncCreatableSelect
          isClearable
          value={value && {value: value.id, label: value.name}}
          defaultOptions={defaultOptions}
          loadOptions={loadOptions}
          onChange={handleChange}
          onCreateOption={showModalForm}
          />
        {ModalForm && <StyledModal
          isOpen={showModal}
          onBackgroundClick={() => setShowModal(false)}
          >
          {/*is this value prop problemmatic for scaling...??*/}
          <ModalForm value={value.name} createdId={createdId} />
        </StyledModal>}
      </div>
    </ModalProvider>
  )
}
