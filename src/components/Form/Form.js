import React from 'react';
import './Form.css';

const Form = ({onInputChange, onButtonSubmit}) => {
    
    return (
        <div>
            <p className="text">Enter grid size and press Start button</p>
            <div className="input-container">
                <input className="input-grid" onChange={onInputChange} type="text" placeholder="default grid 4x4"/>
                <button className="btn-start" onClick={onButtonSubmit} >Start</button>
            </div>
        </div>
    ) 
}

export default Form