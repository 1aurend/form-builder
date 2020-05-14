import React, { useState } from 'react'
import Who from './questions/Who'
import StrInput from './questions/StrInput'
import Select from 'react-select'


export default function ResourceForm() {
  const [formValues, setformValues] = useState({
    who: '',
    title: '',
    type: [],
    tool: '',
    link: ''
  })

  const typeOptions = [
    {value: 'll_curated', label: 'll_curated'},
    {value: 'll_created', label: 'll_created'}
  ]

  const toolOptions = [
    {value: 'photoshop', label: 'photoshop'},
    {value: 'fcpx', label: 'fcpx'}
  ]

  const setValue = (e, key) => {
    setformValues({...formValues, [key]: e.target?.value? e.target.value : e})
  }


  return (
    <>
      <h1>Resource Collector</h1>
      <p>(I'm an un-styled prototype of a forking form.)</p>
      <Who value={formValues.who} setValue={setValue} />
      <StrInput title='Title of your resource' value={formValues.title} setValue={setValue} label='title' />
      <div style={{maxWidth:'30%'}}>
        <h4>Type?</h4>
        <p>Which of the following most accurately describes your resource? Pick as many as make sense!</p>
        <Select options={typeOptions} isMulti={true} />
      </div>
      <div style={{maxWidth:'30%'}}>
        <h4>Tool or Medium</h4>
        <Select options={toolOptions} isMulti={true} />
      </div>
      <StrInput title='Link to your resource' value={formValues.link} setValue={setValue} label='link' />
    </>
  )
}
