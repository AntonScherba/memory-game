import React from 'react';

const Form = ({onInputChange, onButtonSubmit}) => {
    return (
        <div>
            <p>Enter grid size and press Start button</p>
            <div>
                <input onChange={onInputChange} type="text" placeholder="default 4x4"/>
                <button onClick={onButtonSubmit} >Start</button>
            </div>
        </div>
    ) 
}

export default Form