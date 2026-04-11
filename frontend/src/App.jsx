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
import Transactions from "./components/Transactions/Transactions";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./context/authContext";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./components/Profile/Profile";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthContext();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [active,setActive] = useState(1)
  const global = useGlobalContext()

  const displayData = ()=>{
    switch(active){
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Incomes />;
      case 4:
        return <Expenses />;
      case 5:
        return <Profile />;
      default:
        return <Dashboard />
    }
  }
  const orbMemo = useMemo(()=>{
    return <Orb/>
  },[])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      style={{ height: '100%' }}
                    >
                      {displayData()}
                    </motion.div>
                  </AnimatePresence>
                </main>
              </MainLayout>
            </ProtectedRoute>
          } />
        </Routes>
      </AnimatePresence>
    </AppStyled>
  )
}
const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-size: cover;
  position:relative;
  main{
    flex:1;
    background: rgba(252,246,249,0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(10px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    animation: appear 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.08);

    &::-webkit-scrollbar{
      width: 6px;
    }
    &::-webkit-scrollbar-thumb{
      background: rgba(34, 34, 96, 0.2);
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track{
      background: transparent;
    }
  }
`;

export default App
