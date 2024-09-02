import React from 'react';

const InputVar = (props) => {
    return (
        <div>
            <h2>{props.value}</h2>
            <input type="number" onChange={(e) => props.setvalue(e.target.value)} placeholder='0'/>
        </div>
    );
}

export default InputVar;