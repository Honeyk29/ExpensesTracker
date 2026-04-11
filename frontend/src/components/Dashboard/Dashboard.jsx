import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/layouts';
import Chart from '../Chart/Chart';
import { dollar } from '../../utils/icons';
import { useGlobalContext } from '../../context/globalContext';
import HistoryItem from '../../HistoryItem/HistoryItem';
import { motion } from 'framer-motion';

function Dashboard() {
  const {totalExpense,totalIncome,totalBalance,getIncome,getExpense,incomes,expenses} = useGlobalContext()
  useEffect(() => {
    getIncome()
    getExpense()
  }, [])
  
  return (
    <DashboardStyled>
      <InnerLayout as={motion.div} initial={{opacity:0}} animate={{opacity:1}} transition={{staggerChildren:0.1}}>
        <motion.h1 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}}>All Transactions</motion.h1>
        <motion.div className="stats-con" initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}}>
          <div className="chart-con">
            <Chart/>
            <div className="amount-con">
              <motion.div className="income" whileHover={{scale:1.05}}>
                <h2>Total Income</h2>
                <p>
                  {dollar} {totalIncome()}
                </p>
              </motion.div>
              <motion.div className="expense" whileHover={{scale:1.05}}>
                <h2>Total Expense</h2>
                <p>
                  {dollar} {totalExpense()}
                </p>
              </motion.div>
              <motion.div className="balance" whileHover={{scale:1.05}}>
                <h2>Total Balance</h2>
                <p>
                  {dollar} {totalBalance()}
                </p>
              </motion.div>
            </div>
          </div>
          <div className="history-con">
            <HistoryItem/>
            <h2 className="salary-title">
              Min <span>Income</span> Max
            </h2>
            <motion.div className="salary-item" whileHover={{scale:1.03}}>
              <p>
                {Math.min(...incomes.map(item=>item.amount))}
              </p>
              <p>
                {Math.max(...incomes.map(item=>item.amount))}
              </p>
            </motion.div>
            <h2 className="salary-title">
              Min <span>Expense</span> Max
            </h2>
            <motion.div className="salary-item" whileHover={{scale:1.03}}>
              <p>
                {Math.min(...expenses.map(item=>item.amount))}
              </p>
              <p>
                {Math.max(...expenses.map(item=>item.amount))}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </InnerLayout>
    </DashboardStyled>
  )
}

const DashboardStyled = styled.div`
  .stats-con{
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 2rem;
    .chart-con{
      grid-column: 1/4;
      height: 400px;
      .amount-con{
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 2rem;
        margin-top: 2rem;
        .income, .expense{
          grid-column: span 2;
        }
        .income, .expense, .balance{
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0px 8px 32px rgba(0,0,0,0.05);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 1.5rem;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-5px);
            box-shadow: 0px 12px 40px rgba(0,0,0,0.1);
          }

          p{
            font-size: 3rem;
            font-weight: 700;
          }
        }
        .balance{
          grid-column: 2/4;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, rgba(239, 237, 250, 1) 0%, rgba(206, 196, 255, 1) 100%);
          border: 1px solid rgba(255, 255, 255, 0.5);
          
          p{
            background: linear-gradient(to right, #42AD00, #219653);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 4rem;
            font-weight: 800;
          }
        }
      }
    }
    .history-con{
      grid-column: 4/-1;
      h2{
        margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title{
        font-size: 1.2rem;
        span{
          font-size: 1.8rem;
          background: var(--color-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }
      .salary-item{
        background: rgba(255, 255, 255, 0.7);
        border: 1px solid rgba(255, 255, 255, 0.5);
        box-shadow: 0px 8px 32px rgba(0,0,0,0.05);
        backdrop-filter: blur(10px);
        padding: 1rem 1.5rem;
        border-radius: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0px 10px 30px rgba(0,0,0,0.08);
        }

        p{
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    }
  }
`;

export default Dashboard
