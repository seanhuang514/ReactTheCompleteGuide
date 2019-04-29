import React, { PureComponent } from 'react'
import Person from './Person/Person'
class Persons extends PureComponent {
  
  /* static getDerivedStateFromProps(props, state) {
    在這邊沒有 initial state 所以會報 warning
    console.log('[Persons.js ] getDerivedStateFromProps') 
    return null 
  } */

  // shouldComponentUpdate(nextProps, nextState){
  //   console.log('[Persons.js ] shouldComponentUpdated nextProps', nextProps);
  //   console.log('[Persons.js ] shouldComponentUpdated nextState', nextState);
  //   /* return boolean 用來決定是否 update component */
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   }else {
  //     return false;
  //   }
  // }

  /* 會接收改變之前的 props & state，然後可以 return 值給 componentDidUpdate */
  getSnapshotBeforeUpdate(prevProps, prevState){
    console.log('[Persons.js ] getSnapshotBeforeUpdate prevProps', prevProps);
    console.log('[Persons.js ] getSnapshotBeforeUpdate prevState', prevState);

    return {message: 'Snapshot!!'}
  }

  componentDidUpdate(prevProps, prevState, snapShot){
    console.log('[Persons.js ] getSnapshotBeforeUpdate prevProps', prevProps);
    console.log('[Persons.js ] getSnapshotBeforeUpdate prevState', prevState);
    console.log('[Persons.js ] componentDidUpdate', 'snapShout', snapShot); //message: 'Snapshot!!'
  }

  componentWillUnmount(){
    /* component 被從畫面上移除的時候觸發 */
    console.log('[Persons.js ] componentWillUnmount');
  }

  render() {
    return (
      this.props.persons.map((person, index) => {
        return <Person 
                  name={person.name} 
                  age={person.age}
                  click={() => { this.props.clicked(index) }}
                  key={person.id}
                  changed={(event) => this.props.changed(event, person.id)}
                  />
      })
    )
  }
}

export default Persons