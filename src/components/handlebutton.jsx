import React from "react";
import './styles.css'

const Handlebutton = (props) => {
    console.log(props); 
  return ( 
    <button
      className="Handlebutton animate-fade-in-up"
      onClick={props.handle}
      disabled={props.state}
    >
      {props.content}
    </button>
  );
};

export default Handlebutton;
