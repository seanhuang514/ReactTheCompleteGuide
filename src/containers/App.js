import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'
import Cockpit from '../components/Cockpit/Cockpit'
class App extends Component {
  constructor(props){
    console.log('[App.js constructor]', props)
    /**
     * 在 constructor 裡面初始化 state 要用 this.state，然後在這之前一定要 call
     * super(props)
     */
    super(props)
    this.state = {
      people: [
        { id: 'uniq1', name: 'sean', age: 11 },
        { id: 'uniq2', name: 'huang', age: 22 },
      ],
      another: 'another',
      showPeople: true
    };
  }

  static getDerivedStateFromProps(props, state) {
    /*
    https://5xruby.tw/posts/react-16-lifecycle-methods/
    從 props 設定 state 這段程式碼完全可以放在 constructor，拿來放在 getDerivedStateFromProps 好處是更加的直覺，他就純粹是用來設定 state，但在 constructor 裡面是還有可能做一些其他的事。
     */
    console.log('[App.js getDerivedStateFromProps props]', props)
    console.log('[App.js getDerivedStateFromProps state]', state)

    /**
     * 沒有要改變 state 的話可以直接 return state，如果需要新增加 state 的話
    可以 return 要新增的 state 這樣他會自動 merge 到現有的 state 
    (不建議因為每次重新render的時候都會覆蓋你 return 回去的 state)

    return {test: 'test'}
     */
    return state

    /*如果要在 return initial state 的話會出現這樣的 error
    Warning: `App` uses `getDerivedStateFromProps` but its initial state is undefined. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `App`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.
    所以如果真的要在這邊 initial state 的話，要先在 constructor 裡 initial 一個空的 state

    return {
      people: [
        { id: 'uniq1', name: 'sean', age: 11 },
        { id: 'uniq2', name: 'huang', age: 22 },
      ],
      another: 'another',
      showPeople: false
    };
    */
  }
  /**
   * Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.
     App uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
     componentWillMount
     The above lifecycles should be removed. Learn more about this warning here:

     當你使用 get­Derived­State­From­Props，也同時使用componentWillMount，WillMount會不執行，並且console會傳出警告，另外就算改用UNSAFE_componentWillMount也不會執行。
     componentWillMount(){
       console.log('[App.js] componentWillMount')
     }
   */

  componentDidMount(){
    /**
     * 在 child component render 完之後才會觸發。
     */
    console.log('[App.js] componentDidMount')
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
    console.log('[App.js] render state', this.state)
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

