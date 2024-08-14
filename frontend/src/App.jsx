import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/layouts'
import Orb from './components/Orb/Orb'
import Navigation from "./components/Navigation/Navigation";
import React,{ useMemo, useState } from "react";
import Incomes from "./components/Incomes/Incomes";
import Expenses from "./components/Expenses/Expenses";
import Dashboard from "./components/Dashboard/Dashboard";
import { useGlobalContext } from "./context/globalContext";
function App() {
  const [active,setActive] = useState(1)
  const global = useGlobalContext()
  console.log(global)

  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />
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
          {displayData()}
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
