import React, { useState } from 'react'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import axios from 'axios'


export default function ResourceForm() {
  const [people, setPeople] = useState(null)

  const peopleOptions = [
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
    const reqConfig = {
      method: 'GET',
      url: 'http://localhost:8080/people/list',
      responseType: 'json'
    }
    try {
      if (!people) {
        const result = await axios(reqConfig)
        const peopleOptions = result.data.people.map(name => {
          return {value: name, label: name}
        })
        setPeople(peopleOptions)
        return peopleOptions.filter(option => option.label.includes(inputValue))
      }
      return people.filter(option => option.label.includes(inputValue))
    } catch (err) {
      alert(err)
    }
  }

  return (
    <>
      <h1>Resource Collector</h1>
      <p>I'm an un-styled prototype of a forking form.</p>
      <div style={{maxWidth:'30%'}}>
        <h4>Who are you?</h4>
        <AsyncSelect cacheOptions={true} defaultOptions={peopleOptions} loadOptions={loadPeople} />
      </div>
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
