import React from 'react'

export default function NewDataType({ dataType, handleDelete }) {

    function handlePressedDelete(event) {
        handleDelete(dataType.key)
    }

    const text = dataType.type;
    const result = text.replace(/([A-K][M-Q][S-T][V-Z])/g, " $1"); //crazy regex is to leave out "U" "R" and "L"
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return (
    <div id = 'new_data_type'>
        {finalResult}
        <button className='X-button' onClick={handlePressedDelete}>X</button>
    </div>
  )
}
