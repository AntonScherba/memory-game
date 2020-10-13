import React, { useContext } from 'react';
import { Context } from '../../context';
import './Form.css';

const Form = ({column, row}) => {
    const dispatch = useContext(Context);

    const onFormSubmit = (event) => {
        event.preventDefault();
        if ((column*row)%2) {
            alert('Grid Size Must be EVEN!');
        } else {
            dispatch({type: 'START_GAME'})
        }
    }

    return (
        <form onSubmit={onFormSubmit}>
            <h1 className="text">Enter grid size and press Start button</h1>
            <p>{`The Grid Size is ${column}x${row}`}</p>
            <label className="lable" htmlFor="column">Column (between 1 and 10)</label>
            <input
                type="number" 
                name="column"
                value={column}
                onChange={e => dispatch({type: 'CHANGE_COLUMN', payload: Number(e.target.value)})} 
                min="1" 
                max="10"
            />            
            <label className="lable" htmlFor="row">Row (between 1 and 10)</label>
            <input
                type="number"
                name="row" 
                value={row}
                onChange={e => dispatch({type: 'CHANGE_ROW', payload: Number(e.target.value)})} 
                min="1" 
                max="10"
            />
            <button className="btn-start" type="submit">Start</button>
        </form>        
    ) 
}

export default Form