import React, { useState } from 'react';
import './App.css';
import Person from '../components/Person/Person'
const appWithHook = props => {
  // useState會回傳兩個 element 在 array裡
  // 第一個是 get state 用，第二個是 set state 用
  const [personState, setPersonState] = useState({
    people: [
      { name: 'sean', age: 11 },
      { name: 'kuro', age: 22 },
    ],
    anotherState: '🚀'
  });

  // useState 可以用很多次去設定不同的 state
  const [otherState, setOtherState] = useState({
    otherState: '🚀🚀🚀🚀'
  });

  

  const switchNameHandle = () => {
    // setPersonState 跟 class component裡的 setState 行為不一樣
    // setPersonState 會重新assign一個新的狀態進去，也就是重新 assign 後
    // 原本存在的 anotherState 就會不見
    setPersonState({
      people: [
        { name: 'sean1111', age: 11 },
        { name: 'sean2222', age: 222 }
      ]
    });
  };

  console.log(personState, otherState)

  return (
    <div className="App">
      <h1>I am a React App</h1>
      <p>TEST</p>
      {/* 不需要 this 就可以拿到 state */}
      <button onClick={switchNameHandle}>Switch name</button>
      <Person name={personState.people[0].name} age={personState.people[0].age}></Person>
      <Person name={personState.people[1].name} age={personState.people[1].age}></Person>
    </div>
  );
}

export default appWithHook;