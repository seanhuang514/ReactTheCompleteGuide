import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person'

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
    let btnClass = classes.Green;

    if(this.state.showPeople) {
      people = (
        <div>
          {
            this.state.people.map((person, index) => {
              return <Person 
                        name={person.name} 
                        age={person.age}
                        click={this.deletePersonHandle.bind(this, index)}
                        // or
                        // click={() => this.deletePersonHandle(index)}
                        key={person.id}
                        changed={(event) => this.onChangeHandler(event, person.id)}
                        />
            })
          }
        </div>
      );

      btnClass = classes.Red
    }

    const assignedClasses = []

    if(this.state.people.length <= 2){
      assignedClasses.push(classes.red);
    }

    if(this.state.people.length <= 1){
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={classes.App}>
        <h1>I am a React App</h1>
        <p className={assignedClasses.join(' ')}>Dynamic class</p>
        {/* React 的 click event 要用 onClick 而不是用 native js 的 onclick，然後呼叫的時候不用 ()  */}
        <button style={this.myStyle()} onClick={this.switchNameHandle}>Switch name</button>

        {/* 兩種帶參數給 function 的方法 */}
        <button className={btnClass} onClick={() => this.switchNameHandle2('QQQ')}>Switch name 2</button>
        <button onClick={this.switchNameHandle2.bind(this,'WWWW')}>Switch name 3</button>
        <button onClick={this.togglePeople}>Toggle People</button>
          { people }
      </div>
    );
  }
}

export default App;

