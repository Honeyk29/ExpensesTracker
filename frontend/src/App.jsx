import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/layouts'
import Orb from './components/Orb/Orb'
import Navigation from "./components/Navigation/Navigation";
import React,{ useMemo, useState } from "react";
function App() {
  const [active,setActive] = useState(1);

  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard/>;
      case 2:
        return <h1>This is the Add Expense Page</h1>;
      case 3:
        return <h1>This is the View Expenses Page</h1>;
      default:
        return <h1>Welcome to your Expense Tracker!</h1>;
    }
  }
  const orbMemo = useMemo(()=>{
    return <Orb/>
  },[])

  return (
    <AppStyled bg = {bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active = {active} setActive = {setActive}/>
        <main>
          {displayData}
        </main>
      </MainLayout>
      
    </AppStyled>
  )
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position:relative;
  main{
    flex:1;
    background: rgba(252,246,249,0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App
