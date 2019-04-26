import React from 'react'
import classes from './Cockpit.css'

const Cockpit = (props) => {
  let btnClass = classes.Green;
  const assignedClasses = []

  if(props.showPersons) btnClass = classes.Red;
  if(props.persons.length <= 2){
    assignedClasses.push(classes.red);
  }

  if(props.persons.length <= 1){
    assignedClasses.push(classes.bold);
  }

  return (
    <div>
      <h1>I am a React App</h1>
      <p className={assignedClasses.join(' ')}>Dynamic class</p>
      <button className={btnClass} onClick={props.clicked}>Toggle People</button>
    </div>
  )
}

export default Cockpit