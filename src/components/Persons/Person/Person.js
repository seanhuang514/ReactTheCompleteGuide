import React from 'react';
import classes from './Person.css'
import Aux from '../../../higherOrderComponent/Aux'
import withClass from '../../../higherOrderComponent/withClass'
const person = (props) => {
  // throw new Error('Errorrrrr!');
  console.log('[Person.js] Person rendering')
  return (
    /* 
    you also can use Fragment from React, and don't forget import it
    import React, { Fragment } from 'react';
    <Fragment>
      children elements
    </Fragment>
    */
    <Aux> 
      <p key="e1">My name is {props.name} and my age is {props.age}</p>
      <p key="e2">{props.children}</p>
      {/*
      Two way binding
      用 props 傳進來的 function 改變 parent 的 state
      然後改變過的 state 再經由 props 傳進來顯示在input上
      */}
      <input key="e3" type="text" onChange={props.changed} value={props.name}/>
      <button  key="e4" onClick={props.click}>Delete</button>
    </Aux>
  )
}

//<Person name="xxx", age="123"><p>childern</p></Person>
// props.name #=> 'xxx'
// props.age #=> '123'
// props.children #=> <p>childern</p>
/* App -> Persons -> withClass -> Person */
export default withClass(person, classes.Person)
