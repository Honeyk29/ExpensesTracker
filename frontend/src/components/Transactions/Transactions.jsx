import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import { motion, AnimatePresence } from 'framer-motion';

function Transactions() {
    const { getIncome, getExpense, fullTransactionHistory, deleteIncome, deleteExpense } = useGlobalContext();

    useEffect(() => {
        getIncome();
        getExpense();
    }, []);

    const history = fullTransactionHistory();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
    };

    return (
        <TransationStyled>
            <InnerLayout>
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>All Transactions</motion.h1>
                <motion.div className="history-content" variants={containerVariants} initial="hidden" animate="visible">
                    <AnimatePresence>
                        {history.length > 0 ? (
                            history.map((item) => {
                                const { _id, title, amount, date, category, description, type } = item;
                                const isExpense = type === 'expense';
                                return (
                                    <motion.div key={_id} variants={itemVariants} exit={{ opacity: 0, scale: 0.9 }}>
                                        <IncomeItem
                                            id={_id}
                                            title={title}
                                            description={description}
                                            amount={amount}
                                            date={date}
                                            category={category}
                                            type={type}
                                            indicatorColor={isExpense ? 'red' : 'green'}
                                            deleteItem={isExpense ? deleteExpense : deleteIncome}
                                        />
                                    </motion.div>
                                )
                            })
                        ) : (
                            <motion.div className="empty-state" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                                <span className="empty-icon">📂</span>
                                <h2 className="no-transactions">No transactions yet...</h2>
                                <p>Once you add incomes or expenses, they will appear here beautifully!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </InnerLayout>
        </TransationStyled>
    )
}

const TransationStyled = styled.div`
    display: flex;
    overflow: auto;
    
    .history-content {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .empty-state {
        text-align: center;
        padding: 5rem 2rem;
        background: rgba(255,255,255,0.4);
        border-radius: 20px;
        border: 2px dashed rgba(34,34,96,0.2);
        
        .empty-icon {
            font-size: 4rem;
            margin-bottom: 1rem;
            display: inline-block;
            opacity: 0.7;
        }
        
        .no-transactions {
            color: rgba(34,34,96,.8);
            font-weight: 700;
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
        }
        
        p {
            color: rgba(34,34,96,.5);
            font-size: 1.1rem;
        }
    }
`;
export default Transactions
