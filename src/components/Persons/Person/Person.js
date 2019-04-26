import React from 'react';
import classes from './Person.css'

const person = (props) => {
  // throw new Error('Errorrrrr!');

  return (
    <div className={classes.Person}>
      <p>My name is {props.name} and my age is {props.age}</p>
      <p>{props.children}</p>
      {/* 
      Two way binding
      用 props 傳進來的 function 改變 parent 的 state
      然後改變過的 state 再經由 props 傳進來顯示在input上
      */}
      <input type="text" onChange={props.changed} value={props.name}/>
      <button onClick={props.click}>Delete</button>
    </div>
  )
}

//<Person name="xxx", age="123"><p>childern</p></Person>
// props.name #=> 'xxx'
// props.age #=> '123'
// props.children #=> <p>childern</p>
export default person