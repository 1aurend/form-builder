import React, { useState, useContext, useRef } from 'react'
import axios from 'axios'
import StrInput from './questions/StrInput'
import AsyncSingleSelect from './questions/AsyncSingleSelect'
import AsyncMultiSelect from './questions/AsyncMultiSelect'
import MultiSelect from './questions/MultiSelect'
import PeopleForm from './PeopleForm'
import ToolMedCheckbox from './ToolMedCheckbox'
import { LLPeople, ToolsMeds, ResourceTypes } from '../Data'


export default function ResourceForm() {
  const llPeople = useContext(LLPeople)
  const toolsMeds = useContext(ToolsMeds)
  const resourceTypes = useContext(ResourceTypes)
  const [formValues, setformValues] = useState({
    who: '',
    title: '',
    type: [],
    tool: [],
    link: ''
  })
  const [status, setStatus] = useState('open')
  const id = useRef(null)

  const setValue = (e, key) => {
    switch (key) {
      case 'tool':
      case 'type':
        setformValues({...formValues, [key]: e.target? (e.target.value === []? '' : [...formValues.tool, e.target.value]) : e})
        return
      default:
        setformValues({...formValues, [key]: e.target? (e.target.value === ''? '' : e.target.value) : e})
    }
  }

  const onSubmit = async () => {
    const submitResource = async () => {
      const reqConfig = {
        method: 'POST',
        url: 'http://localhost:8080/resources/submit',
        responseType: 'json',
        data: {
          ...formValues,
          who: [formValues.who.id],
          tool: formValues.tool.map(item => item.id),
          type: formValues.type.map(item => item.name)
        }
      }
      try {
        const result = await axios(reqConfig)
        console.log(`Success! Resource ${formValues.title} created`)
        console.log(result)
        //add resulting record to context here?
        id.current = result.data.record.id
        setStatus('success')
      } catch (err) {
        alert(err)
      }
    }
    submitResource()
  }

  if (status === 'success') {
    return(
      <div style={{marginLeft: '5%', marginTop: '5%'}}>
        <h1>Success!</h1>
        <p>Resource {formValues.title} created with record ID {id.current}</p>
      </div>
    )
  }

  return (
    <div style={{marginLeft: '5%', marginTop: '5%'}}>
      <h1>Resource Collector</h1>
      <p>(I'm an un-styled prototype of a forking form.)</p>
      <AsyncSingleSelect
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
      <MultiSelect
        value={formValues.type}
        setValue={setValue}
        valKey='type'
        data={resourceTypes}
        text='Type?'
        subText='Which of the following most accurately describes your resource? Pick as many as make sense!'
        />
      <AsyncMultiSelect
        value={formValues.tool}
        setValue={setValue}
        valKey='tool'
        data={toolsMeds}
        text='Tool or Medium'
        ModalContent={ToolMedCheckbox}
        />
      <StrInput
        title='Link to your resource'
        value={formValues.link}
        setValue={setValue}
        valKey='link'
        />
      <button
        onClick={onSubmit}
        style={{marginTop: '20px'}}
        >
        Submit!
      </button>
    </div>
  )
}
