import React, { useContext } from 'react';
import { Context } from '../../context';
import { init } from '../../functions';

import './Form.css';

const Form = ({column, row}) => {
    const dispatch = useContext(Context);

    const onFormSubmit = (event) => {
        event.preventDefault();
        if ((column*row)%2) {
            alert('Grid Size Must be EVEN!');
        } else {
            dispatch({type: 'START_GAME', payload: init(column, row)})
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <h1 className="text">Enter grid size and press Start button</h1>
            <h3>{`The Grid Size is ${column}x${row}`}</h3>
                <div>
                    <input
                        className="input-number"
                        type="number" 
                        value={column}
                        onChange={e => dispatch({type: 'CHANGE_COLUMN', payload: Number(e.target.value)})} 
                        min="1" 
                        max="10"
                    />            
                    <input
                        className="input-number"
                        type="number"
                        value={row}
                        onChange={e => dispatch({type: 'CHANGE_ROW', payload: Number(e.target.value)})} 
                        min="1" 
                        max="10"
                    />
                </div>
            <button className="btn-start" type="submit">Start</button>
        </form>        
    ) 
}

export default Form