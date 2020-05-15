import React, { useState, useContext } from 'react'
import Select from 'react-select'
import StrInput from './questions/StrInput'
import AsyncSingleSelectModal from './questions/AsyncSingleSelectModal'
import AsyncMultiSelectModal from './questions/AsyncMultiSelectModal'
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
    tool: '',
    link: ''
  })

  const setValue = (e, key) => {
    if (key === 'tool') {
      setformValues({...formValues, [key]: e.target? (e.target.value === []? '' : [...formValues.tool, e.target.value]) : e})
    }
    setformValues({...formValues, [key]: e.target? (e.target.value === ''? '' : e.target.value) : e})
  }

  const onSubmit = async () => {
    //post req goes here
  }

  return (
    <div style={{marginLeft: '5%', marginTop: '5%'}}>
      <h1>Resource Collector</h1>
      <p>(I'm an un-styled prototype of a forking form.)</p>
      <AsyncSingleSelectModal
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
        <Select options={resourceTypes} isMulti={true} />
      </div>
      <AsyncMultiSelectModal
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
      <button>
        Submit!
      </button>
    </div>
  )
}
