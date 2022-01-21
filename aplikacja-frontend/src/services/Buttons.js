import React from 'react'

export default props => 
  <div className='py-4 buttons fadein'>
    
    <div className='button'>
      <label htmlFor='single'>
      </label>
      <input type='file' id='single' onChange={props.onChange} /> 
    </div>

  </div>