import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'
class App extends Component {
  state = {
    people: [
      { name: 'sean', age: 11 },
      { name: 'kuro', age: 22 },
    ],
    another: 'another'
  }

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
  }

  switchNameHandle2 = (newName='EEEE') => {
    this.setState( {
      people: [
        { name: newName, age: 11 },
        { name: 'sean2222', age: 222 }
      ]
    }, () => console.log(this.state)) 
  }

  render() {
    return (
      <div className="App">
        <h1>I am a React App</h1>
        <p>TEST</p>
        {/* React 的 click event 要用 onClick 而不是用 native js 的 onclick，然後呼叫的時候不用 ()  */}
        <button onClick={this.switchNameHandle}>Switch name</button>

        {/* 兩種帶參數給 function 的方法 */}
        <button onClick={() => this.switchNameHandle2('QQQ')}>Switch name 2</button>
        <button onClick={this.switchNameHandle2.bind(this,'WWWW')}>Switch name 3</button>
        <Person 
          name={this.state.people[0].name}
          age={this.state.people[0].age}
        >
        </Person>
        <Person name={this.state.people[1].name} age={this.state.people[1].age}></Person>
      </div>
    );
  }
}

export default App;

