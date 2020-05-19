import React, { useReducer, useCallback, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from "./GreetingFunctional";
import ListCreator, { ListItem } from './ListCreator';

const messageReducer = (state: any, action: any) => {
  switch(action.type) {
    case "message":
      return { ...state, message: `Hello, ${action.payload}` }
    default:
      throw new Error("Invalid action type " + action.type);
  }
}

const enteredNameReducer = (state: any, action: any) => {
  console.log("enteredNameReducer");
  switch(action.type) {
    case "enteredName":
      if(state.enteredName === action.payload) {
        return state;
      }
      return { ...state, enteredName: action.payload}
    default:
      throw new Error("Invalid action type " + action.type);
  }
}

const initialState = {
  enteredName: "",
  message: "",
};

function App() {  
  const [{ message }, dispatchMsg] = useReducer(messageReducer, initialState);
  const [{ enteredName }, dispatchName ] = useReducer(enteredNameReducer, initialState);
  const [startCount, setStartCount] = useState(0);
  const [count, setCount] = useState(0);
  const setCountCallback = useCallback(() => {
    const inc = count + 1 > startCount ? count + 1 : Number(count + 1) + startCount;
    setCount(inc);
  }, [count, startCount]);
  const [listItems, setListItems] = useState<Array<ListItem>>();

  useEffect(() => {
    const li = [];
    for(let i = 0; i < count; i++) {
      li.push({ id: i });
    }
    setListItems(li);
  }, [count]);

  const onWelcomeBtnClick = () => {
    setCountCallback();
  }

  const onChangeStartCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartCount(Number(e.target.value));
  }

  console.log("App.tsx render");
  return (    
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      
      <Greeting 
        message={message} 
        enteredName={enteredName} 
        dispatchMsg={dispatchMsg} 
        dispatchName={dispatchName} />

      <div style={{marginTop: '10px'}}>
        <label>Enter a number and we'll increment it</label>
        <br/>
        <input value={startCount} onChange={onChangeStartCount} style={{width: '.75rem'}} />&nbsp;
        <label>{count}</label>
        <br/>
        <button onClick={onWelcomeBtnClick}>Increment count</button>
      </div>

      <div>
        <ListCreator listItems={listItems} />
      </div>
    </header>
  </div>
  )
}

export default App;
