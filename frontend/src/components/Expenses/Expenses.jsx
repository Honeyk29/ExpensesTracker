import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForms from '../Forms/ExpenseForms';
import { dollar } from '../../utils/icons';
import { motion, AnimatePresence } from 'framer-motion';

function Expenses() {
    const {addIncome,expenses,getExpense,deleteExpense,totalExpense} = useGlobalContext();

    useEffect(()=>{
        getExpense()
    },[])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <ExpenseStyled>
            <InnerLayout>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Expenses</motion.h1>
                <motion.h2 className='total-income' initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                    Total Expense: <span>{dollar}{totalExpense()}</span>
                </motion.h2>
                <div className="income-content">
                    <motion.div className="form-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <ExpenseForms/>
                    </motion.div>
                    <motion.div className="incomes" variants={containerVariants} initial="hidden" animate="visible">
                        <AnimatePresence>
                            {expenses.map((income) =>{
                                const {_id,title,amount,date,category,description} = income;
                                return (
                                    <motion.div key={_id} variants={itemVariants} exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}>
                                        <IncomeItem
                                            id = {_id}
                                            title={title}
                                            description = {description}
                                            amount = {amount}
                                            date = {date}
                                            category = {category}
                                            indicatorColor="red"
                                            deleteItem={deleteExpense}
                                        />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </InnerLayout>
        </ExpenseStyled>
    )
}
const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2 rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            color: red;
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;

        }
    }
`;
export default Expenses
