import React, { useState, useContext } from 'react'
import Select from 'react-select'
import AsyncCreatableSelect from 'react-select/async-creatable'
import Modal, { ModalProvider } from 'styled-react-modal'
import { LLPeople } from './Data'
import PeopleForm from './PeopleForm'


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


export default function ResourceForm() {
  const llPeople = useContext(LLPeople)
  const [peopleOptions, setPeopleOptions] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [createName, setCreateName] = useState(null)

  const defaultPeopleOptions = [
    {value: 'lauren', label: 'lauren'},
    {value: 'katie', label: 'katie'}
  ]

  const typeOptions = [
    {value: 'll_curated', label: 'll_curated'},
    {value: 'll_created', label: 'll_created'}
  ]

  const toolOptions = [
    {value: 'photoshop', label: 'photoshop'},
    {value: 'fcpx', label: 'fcpx'}
  ]

  const loadPeople = async (inputValue) => {
    if (!peopleOptions) {
      const formatted = llPeople.map(name => {
        return {value: name, label: name}
      })
      setPeopleOptions(formatted)
      return formatted.filter(option => option.label.includes(inputValue))
    }
    return peopleOptions.filter(option => option.label.includes(inputValue))
  }

  const showPeopleForm = (inputValue) => {
    setCreateName(inputValue)
    setShowModal(true)
  }

  return (
    <>
      <h1>Resource Collector</h1>
      <p>(I'm an un-styled prototype of a forking form.)</p>
      <ModalProvider>
        <div style={{maxWidth:'30%'}}>
          <h4>Who are you?</h4>
          <p>(I'm an async select form field. Start typing and I'll find matchng options for you.)</p>
          <AsyncCreatableSelect
            cacheOptions
            defaultOptions={defaultPeopleOptions}
            loadOptions={loadPeople}
            onCreateOption={showPeopleForm}
            value={createName && {name: createName, label: createName}}
            />
          <PeopleModal
            isOpen={showModal}
            onBackgroundClick={() => setShowModal(false)}
            >
            <PeopleForm name={createName} />
          </PeopleModal>
        </div>
      </ModalProvider>
      <div style={{maxWidth:'30%'}}>
        <h4>Title of your resource</h4>
        <input type='text'/>
      </div>
      <div style={{maxWidth:'30%'}}>
        <h4>Type?</h4>
        <p>Which of the following most accurately describes your resource? Pick as many as make sense!</p>
        <Select options={typeOptions} isMulti={true} />
      </div>
      <div style={{maxWidth:'30%'}}>
        <h4>Tool or Medium</h4>
        <Select options={toolOptions} isMulti={true} />
      </div>
      <div style={{maxWidth:'30%'}}>
        <h4>Link to resource</h4>
        <input type='text'/>
      </div>
    </>
  )
}
