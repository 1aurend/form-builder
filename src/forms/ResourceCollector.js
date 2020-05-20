import React, { useState, useContext, useRef, useEffect } from 'react'
import axios from 'axios'
import StrInput from './questions/StrInput'
import AsyncSingleSelect from './questions/AsyncSingleSelect'
import AsyncMultiSelect from './questions/AsyncMultiSelect'
import MultiSelect from './questions/MultiSelect'
import PeopleForm from './PeopleForm'
import ToolMedCheckbox from './ToolMedCheckbox'
import { LLPeople, ToolsMeds, ResourceTypes } from '../Data'


export default function ResourceCollector() {
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
  const newResourceId = useRef(null)
  const newPersonId = useRef(null)
  const [newToolMedId, setNewToolMedId] = useState(null)

  useEffect(() => {
    if (newPersonId.current && !formValues.who.id ) {
      setformValues({...formValues, who: {id: newPersonId.current, name: formValues.who.name} })
      newPersonId.current = null
    }
  }, [newPersonId, formValues])
  useEffect(() => {
    if (newToolMedId && !formValues.tool[formValues.tool.length-1].id ) {
      const withId = {...formValues.tool[formValues.tool.length-1], id: newToolMedId}
      formValues.tool.pop()
      const updatedTools = [...formValues.tool, withId]
      setformValues({...formValues, tool: updatedTools })
      setNewToolMedId(null)
    }
  }, [newToolMedId, formValues])

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
        newResourceId.current = result.data.record.id
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
        <p>Resource {formValues.title} created with record ID {newResourceId.current}</p>
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
        createdId={newPersonId}
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
        createdId={setNewToolMedId}
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
