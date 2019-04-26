import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import Cockpit from '../components/Cockpit/Cockpit'
class App extends Component {
  state = {
    people: [
      { id: 'uniq1', name: 'sean', age: 11 },
      { id: 'uniq2', name: 'huang', age: 22 },
    ],
    another: 'another',
    showPeople: false
  };

  switchNameHandle = () => {
    this.setState( {
      people: [
        { name: 'sean1111', age: 11 },
        { name: 'sean2222', age: 222 }
      ]
    }, () => console.log(this.state)) 
    
    {/* 
      state 定義一開始 class component 的狀態， 用 this.setState 去設定新的值
      新值跟舊值會自動 merge 成一份 data
    */} 
  };

  switchNameHandle2 = (newName='EEEE') => {
    this.setState( {
      people: [
        { name: newName, age: 11 },
        { name: 'sean2222', age: 222 }
      ]
    }, () => console.log(this.state)) 
  };

  onChangeHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(p => {
      return p.id === id;
    });
    
    //Important！！
    //要改變 state 裡的值的時候維持原始的 data 不被變動 (Immutable data)
    //所以要改的值都必須要複製一份出來改(作為一個新的object)
    // Preference: https://blog.techbridge.cc/2018/01/05/react-render-optimization/
    const copyPerson = {...this.state.people[personIndex]};
    const copyPeople = [...this.state.people];

    copyPerson.name = event.target.value;
    copyPeople[personIndex] = copyPerson;

    this.setState({
      people: copyPeople
    });
  };

  myStyle = () => {
    return {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      marginRight: '5px',
    }
  }

  togglePeople = () => {
    const isShowPeople = this.state.showPeople
    this.setState({
      showPeople: !isShowPeople
    })
  }

  deletePersonHandle = (personIndex) => {
    // const people = this.state.people.slice(1);//good practice, because of it won't mutate the original data
    // console.log(this.state.people) //[{…}, {…}]
    // or
    
    const people = [...this.state.people] // use [] array to wrap spread operator(equal copy array)
    people.splice(personIndex, 1)
    console.log(people)
    this.setState({
      people: people
    })
  }

  render() {
    let people = null;

    if(this.state.showPeople) {
      people = <Persons 
                  persons={this.state.people}
                  clicked={this.deletePersonHandle}
                  changed={this.onChangeHandler}/>
    }

    return (
      <div className={classes.App}>
        <Cockpit 
          title={this.props.title}
          showPersons={this.state.showPeople}
          persons={this.state.people}
          clicked={this.togglePeople}/>
        <ErrorBoundary>
          { people }
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

