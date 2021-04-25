import { useState, useEffect } from 'react'

const FormWithText = ({placeholderText, submitLabel, submitEvent}) => {
    const [text, setText] = useState('');
  
    const onSubmit = (e) => {
      e.preventDefault();
      if(!text)
      {
        alert(`Enter a ${placeholderText}!`);
        return;
      }
  
      submitEvent(text)
    }
  
    return (
      <form onSubmit={onSubmit}>
        <input type="text" placeholder={placeholderText} value={text} onChange={ (e) => setText(e.target.value) }/>
        <input type="submit" value={submitLabel}/>
      </form>
    )
  }

  FormWithText.defaultProps = {
    submitLabel: 'Submit',
    placeholderText: 'Type Something'
  }

  export default FormWithText