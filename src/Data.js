import React, { useState, useEffect } from 'react'
import axios from 'axios'
import App from './App'


export const LLPeople = React.createContext()
export const ResourceTypes = React.createContext()
export const ToolsMeds = React.createContext()
export const ResourceList = React.createContext()

// TODO: deal with data load errors here
export default function Data() {
  const [peopleList, setPeopleList] = useState(['test', 'test2', 'test3'])
  const [types, setTypes] = useState(['test', 'test2'])
  const [toolsMedsList, setToolsMedsList] = useState(['test', 'test2', 'test3'])
  const [resourceList, setResourceList] = useState(['test'])

  useEffect(() => {
    const loadPeople = async () => {
      const reqConfig = {
        method: 'GET',
        url: 'http://localhost:8080/list/Summer2020Dev/LL_PEOPLE',
        responseType: 'json'
      }
      try {
        const result = await axios(reqConfig)
        const llPeople = result.data.records.map(record => {
          return {id: record.id, name: record.fields.LLPeopleName}
        })
        setPeopleList(llPeople)
      } catch (err) {
        alert(err)
      }
    }
    loadPeople()
  }, [])

  useEffect(() => {
    const loadResourceTypes = async () => {
      const reqConfig = {
        method: 'GET',
        url: 'http://localhost:8080/tags/resourcetypes',
        responseType: 'json'
      }
      try {
        const result = await axios(reqConfig)
        console.log(result)
        const types = result.data.options.map(tag => {
          return {id: tag, name: tag}
        })
        console.log(types)
        setTypes(types)
      } catch (err) {
        alert(err)
      }
    }
    loadResourceTypes()
  }, [])

  useEffect(() => {
    const loadToolsMeds = async () => {
      const reqConfig = {
        method: 'GET',
        url: 'http://localhost:8080/list/Summer2020Dev/TOOLS_AND_MEDIA',
        responseType: 'json'
      }
      try {
        const result = await axios(reqConfig)
        const toolsMeds = result.data.records.map(record => {
          return {id: record.id, name: record.fields["TOOL or MEDIA"]}
        })
        setToolsMedsList(toolsMeds)
      } catch (err) {
        alert(err)
      }
    }
    loadToolsMeds()
  }, [])

  useEffect(() => {
    const loadResourceList = async () => {
      const reqConfig = {
        method: 'GET',
        url: 'http://localhost:8080/list/Summer2020Dev/Resources',
        responseType: 'json'
      }
      try {
        const result = await axios(reqConfig)
        const resources = result.data.records.map(record => {
          return {id: record.id, name: record.fields.Title}
        })
        setResourceList(resources)
      } catch (err) {
        alert(err)
      }
    }
    loadResourceList()
  }, [])

  return (
    <LLPeople.Provider value={peopleList}>
      <ResourceTypes.Provider value={types}>
        <ToolsMeds.Provider value={toolsMedsList}>
          <ResourceList.Provider value={resourceList}>
            <App />
          </ResourceList.Provider>
        </ToolsMeds.Provider>
      </ResourceTypes.Provider>
    </LLPeople.Provider>
  )

}
