import React from 'react';

const person = (props) => {
  const personDefaultName = 'Person default name';
  
  return (
    <div>
      <p onClick={props.click.bind(this, personDefaultName)}>My name is {props.name} and my age is {props.age}</p>
      <p>{props.children}</p>
    </div>
  )
}

//<Person name="xxx", age="123"><p>childern</p></Person>
// props.name #=> 'xxx'
// props.age #=> '123'
// props.children #=> <p>childern</p>
export default person