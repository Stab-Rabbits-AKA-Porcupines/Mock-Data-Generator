import React from 'react'

export default function NewDataType({ dataType, handleDelete }) {

    function handlePressedDelete(event) {
        handleDelete(dataType.key)
    }


   


  return (
    <div id = 'new_data_type'>
        {dataType.type}
        <button className='X-button' onClick={handlePressedDelete}>X</button>
    </div>
  )
}
