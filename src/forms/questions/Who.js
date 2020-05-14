import React, { useState, useContext } from 'react'
import AsyncCreatableSelect from 'react-select/async-creatable'
import Modal, { ModalProvider } from 'styled-react-modal'
import { LLPeople } from '../../Data'
import PeopleForm from '../PeopleForm'


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

export default function Who(props) {
  const { value, setValue } = props
  const llPeople = useContext(LLPeople)
  const [peopleOptions, setPeopleOptions] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const defaultOptions = [
    {value: llPeople[0], label: llPeople[0]},
    {value: llPeople[1], label: llPeople[1]},
    {value: llPeople[2], label: llPeople[2]}
  ]

  //NB: async-select only works with async load function
  const loadPeople = async (inputValue) => {
    if (!peopleOptions) {
      const formatted = llPeople.map(name => {
        return {value: name, label: name}
      })
      setPeopleOptions(formatted)
      return formatted.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
    }
    return peopleOptions.filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
  }

  const showPeopleForm = (inputValue) => {
    setValue(inputValue, 'who')
    setShowModal(true)
  }
  const handleChange = (inputValue) => {
    setValue(inputValue?.value? inputValue.value : '', 'who')
  }


  return (
    <ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>Who are you?</h4>
        <p>(I'm an async select form field. Start typing and I'll find matchng options for you.)</p>
        <AsyncCreatableSelect
          isClearable
          value={value && {value: value, label: value}}
          defaultOptions={defaultOptions}
          loadOptions={loadPeople}
          onChange={handleChange}
          onCreateOption={showPeopleForm}
          />
        <PeopleModal
          isOpen={showModal}
          onBackgroundClick={() => setShowModal(false)}
          >
          <PeopleForm name={value} />
        </PeopleModal>
      </div>
    </ModalProvider>
  )
}
