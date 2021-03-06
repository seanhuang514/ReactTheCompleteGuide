import React, { useEffect, useRef } from 'react'
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context'
const Cockpit = (props) => {
  let btnClass = classes.Green;
  const assignedClasses = [];
  const toggleBtnRef = useRef();

  useEffect(() => {
    //https://tecky.io/en/blog/%E5%88%B0%E5%BA%95react-hooks%E6%9C%89%E4%BD%95%E7%89%B9%E5%88%A5-%E4%BA%8C-%E6%B7%BA%E8%AB%87useeffect%E5%8F%8Ausereducer/
    //相當於 class-base component 裡的 componentDidMount
    console.log('[Cockpit.js] useEffect componentDidMount');

    // simulate Http request
    // setTimeout(() => {
    //   alert('Fetch data')
    // }, 1000);
    toggleBtnRef.current.click();
    
    
    return () => {
      /*
      return function 裡的行為相當於 class-base component 裡的 componentWillUnmount 
      在 useEffect 有帶第二個參數並且 array 裡的值有變動的時候會觸發
    */
      console.log('[Cockpit.js] useEffect componentWillUnmount');
    }

    /* useEffect 的第二個參數可以帶入一個 array
       第二個參數是此 effect 的 dependency，
       React會儲起每次這個 array 的數值，
       如果在下一次 update 的時候發現這個 array 改變了，
       就代表了這個 effect 需要重新運行。
       由於一個 empty array永遠都是一樣，
       所以我們這個 useEffect 只會運行一次！如果沒有了第二個參數，那就變成了 componentDidUpdate +componentDidMount了
    */

    /* 
    * [props.persons] 當 props 改變時才會執行
    * [] 如果是 empty array 的話只有在  initial 的時候才會執行，只執行一次
    */
  },[])

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => console.log('[Cockpit.js] 2nd useEffect un-mount');
  })

  if(props.showPersons) btnClass = classes.Red;
  if(props.personsLength <= 2){
    assignedClasses.push(classes.red);
  }

  if(props.personsLength <= 1){
    assignedClasses.push(classes.bold);
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>Dynamic class</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>Toggle People</button>
      <AuthContext.Consumer>
        { context => <button onClick={context.loginHandler}>LogIn</button> }
      </AuthContext.Consumer>
    </div>
  )
}

export default React.memo(Cockpit)
/* 
memo only re-renders if props change 
所以沒有用memo包起來之前 person change的時候 cockpit 都會 re-render
但 person updated 的時候 cockpit 不應該也跟著 re-render
所以要把傳進來的 props.persons 改成只傳 length 進來，這樣當 props.persons 改變的時候
cockpit 就不會重新 re-render了
*/