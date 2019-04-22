import React from 'react';

const person = (props) => {
  return (
    <div>
      <p onClick={props.click}>My name is {props.name} and my age is {props.age}</p>
      <p>{props.children}</p>
      {/* 
      Two way binding
      用 props 傳進來的 function 改變 parent 的 state
      然後改變過的 state 再經由 props 傳進來顯示在input上
      */}
      <input type="text" onChange={props.changed} value={props.name}/>
    </div>
  )
}

//<Person name="xxx", age="123"><p>childern</p></Person>
// props.name #=> 'xxx'
// props.age #=> '123'
// props.children #=> <p>childern</p>
export default person