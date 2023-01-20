/**
 * @module mainContainer.jsx
 * @description Stateful container for functional compononents
 */

import React, { useEffect, useState, useRef } from 'react';
import DataSelector from '../components/DataSelector.jsx'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'
import copyIcon from '../copyIcon.svg'

const MainContainer = () => {

  const [dataTypes, setDataTypes] = useState([])
  const dataInput = useRef()
  const quantInput = useRef()
  const textAreaInput = useRef()
  const outputInput = useRef()

  function handleAdd(event) {
    const typeOfData = dataInput.current.value;
    // all of this insane logic inside of setDataTypes is just my way of preventing
    // the user from adding the same dataType twice
    setDataTypes(prevTypes => {
      let alreadyExists = false;

      [...prevTypes].forEach((element) => {
        if (element.type === typeOfData) {
          alreadyExists = true;
        }
      })
      if (alreadyExists === false) {
        return [...prevTypes, { key: uuidv4(), type: typeOfData }] //goes through all controllers, all selected values are concated to url parameters
      } else {
        return [...prevTypes]
      }

    })
  }

  function handleDelete(theKey) {
    setDataTypes(prevTypes => {
      return [...prevTypes].filter((element) => element.key !== theKey)
    })
  }

  function handleSubmit(event) {
    const stateData = dataTypes
    const quantity = quantInput.current.value
    const output = outputInput.current.value
    let fetchString = `http://localhost:3000/api?quantity=${quantity}&output=${output}`

    // build our url with all of the datatypes in the query string
    stateData.forEach((element) => {
      fetchString += `&${element.type}=true`
    })

    axios.get(fetchString)
    .then((response) => {
      if (output === 'array') textAreaInput.current.value = JSON.stringify(response.data)
      else textAreaInput.current.value = response.data
    })
    .catch((err) => console.log('something wrong with axios request', err))
  }

  function handleCopy(event) {
    navigator.clipboard.writeText(textAreaInput.current.value)
  }

  return (
    <div id="main_container">
      <div id='form'>
        <label className='quantity_selector-label'> Quantity:
          <input ref={quantInput} className="quantity_selector" type="number" min='1' max = '100' defaultValue= '5'/>
        </label>
        <select ref={dataInput} name="dataSelect" id="dataSelect">
          <option value="firstName">First Name</option>
          <option value="fullName">Full Name</option>
          <option value="fullNameMiddle">First Middle Last Name</option>
          <option value="email">Email</option>
          <option value="phoneNumber">Phone Number</option>
          <option value="country">Country</option>
          <option value="birthday">Birthday</option>
          <option value="coordinates">Coordinates</option>
          <option value="URLs">URLs</option>
        </select>
        <button id='add_button' onClick={handleAdd} >Add Data Type</button>
      </div>

      <div id="datatype_selector">
        <DataSelector dataTypes={dataTypes} handleDelete={handleDelete}/>
      </div>
      {/* make a button to add new DataType */}
      <div id = 'add_and_submit'>

        <button id="submit_button" onClick={handleSubmit} >Generate Data</button>
        <div id='csv'>
        <label >Select output format: </label>
        <select ref={outputInput} name="CSVSelect" id="CSVSelect">
          <option value="CSV">CSV</option>
          <option value="array">JSON</option>
        </select>
      </div>
      </div>
      <div id= 'text_box_and_copy'>
        <textarea ref={textAreaInput} id="text_output">
        </textarea>
        <button id='copy' onClick={handleCopy} ><img src='../copyIcon.svg' alt="copy to clipboard" /></button>
      </div>
    </div>
  )
};

export default MainContainer;
