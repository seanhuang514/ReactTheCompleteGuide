import React, { PureComponent } from 'react';
import classes from './Person.css';
import Aux from '../../../higherOrderComponent/Aux';
import withClass from '../../../higherOrderComponent/withClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context'

class Person extends PureComponent {
  // throw new Error('Errorrrrr!');
  
  constructor (props){
    super(props)
    this.inputElementRef = React.createRef();
  }

  componentDidMount (){
    this.inputElementRef.current.focus();
  }
  
  render () {
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
        <AuthContext.Consumer>
          {(context) => {
            console.log('AuthContext', context)
            return context.isLogin ? <p>Authentcated!</p> : <p>Please Login</p>
          }}
        </AuthContext.Consumer>
        <p key="e1">My name is {this.props.name} and my age is {this.props.age}</p>
        <p key="e2">{this.props.children}</p>
        {/*
        Two way binding
        用 props 傳進來的 function 改變 parent 的 state
        然後改變過的 state 再經由 props 傳進來顯示在input上
        */}
        <input ref={this.inputElementRef} key="e3" type="text" onChange={this.props.changed} value={this.props.name}/>
        <button  key="e4" onClick={this.props.click}>Delete</button>
      </Aux>
    )
  }
}

Person.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  click: PropTypes.func,
  changed: PropTypes.func
}

//<Person name="xxx", age="123"><p>childern</p></Person>
// props.name #=> 'xxx'
// props.age #=> '123'
// props.children #=> <p>childern</p>
/* App -> Persons -> withClass -> Person */
export default withClass(Person, classes.Person)
