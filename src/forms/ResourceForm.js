import React, { useState, useContext } from 'react'
import Select from 'react-select'
import StrInput from './questions/StrInput'
import SingleSelectModal from './questions/SingleSelectModal'
import AsyncMultiSelectAdd from './questions/MultiSelectAdd'
import PeopleForm from './PeopleForm'
import { LLPeople, ToolsMeds, ResourceTypes } from '../Data'


export default function ResourceForm() {
  const llPeople = useContext(LLPeople)
  const toolsMeds = useContext(ToolsMeds)
  const resourceTypes = useContext(ResourceTypes)
  const [formValues, setformValues] = useState({
    who: '',
    title: '',
    type: [],
    tool: '',
    link: ''
  })

  const setValue = (e, key) => {
    setformValues({...formValues, [key]: e.target? (e.target.value === ''? '' : e.target.value) : e})
  }

  return (
    <div style={{marginLeft: '5%', marginTop: '5%'}}>
      <h1>Resource Collector</h1>
      <p>(I'm an un-styled prototype of a forking form.)</p>
      <SingleSelectModal
        value={formValues.who}
        setValue={setValue}
        ModalForm={PeopleForm}
        valKey='who'
        data={llPeople}
        text='Who are you?'
        />
      <StrInput title='Title of your resource'
        value={formValues.title}
        setValue={setValue}
        valKey='title'
        />
      <div style={{maxWidth:'30%'}}>
        <h4>Type?</h4>
        <p>Which of the following most accurately describes your resource? Pick as many as make sense!</p>
        <Select options isMulti={true} />
      </div>
      <AsyncMultiSelectAdd
        value={formValues.tool}
        setValue={setValue}
        valKey='tool'
        data={toolsMeds}
        text='Tool or Medium'
        />
      <StrInput
        title='Link to your resource'
        value={formValues.link}
        setValue={setValue}
        valKey='link'
        />
    </div>
  )
}
