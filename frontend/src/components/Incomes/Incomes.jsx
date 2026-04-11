import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import Forms from '../Forms/Forms';
import IncomeItem from '../IncomeItem/IncomeItem';
import { dollar } from '../../utils/icons';
import { motion, AnimatePresence } from 'framer-motion';

function Incomes() {
    const {addIncome,incomes,getIncome,deleteIncome,totalIncome} = useGlobalContext();

    useEffect(()=>{
        getIncome()
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
        <IncomesStyled>
            <InnerLayout>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>Incomes</motion.h1>
                <motion.h2 className='total-income' initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 }}>
                    Total Income: <span>{dollar}{totalIncome()}</span>
                </motion.h2>
                <div className="income-content">
                    <motion.div className="form-container" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                        <Forms/>
                    </motion.div>
                    <motion.div className="incomes" variants={containerVariants} initial="hidden" animate="visible">
                        <AnimatePresence>
                            {incomes.map((income) =>{
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
                                            indicatorColor="var(--color-green)"
                                            deleteItem={deleteIncome}
                                        />
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    )
}

const IncomesStyled = styled.div`
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
            color: var(--color-green);
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
export default Incomes
