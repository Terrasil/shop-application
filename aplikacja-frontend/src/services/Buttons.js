import React from 'react'
const button  = props => 
  <div className='py-4 buttons fadein'>
    
    <div className='button'>
      <label htmlFor='single'>
      </label>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>

  </div>
export default button