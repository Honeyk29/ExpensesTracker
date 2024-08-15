import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/layouts';
import { useGlobalContext } from '../../context/globalContext';
import Forms from '../Forms/Forms';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForms from '../Forms/Expenseforms';
import { dollar } from '../../utils/icons';
function Expenses() {
    const {addExpense,expenses,getExpense,deleteExpense,totalExpense} = useGlobalContext();

    useEffect(()=>{
        getExpense()
    },[])
    return (
        <ExpenseStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <h2 className='total-income'>Total Expense: <span>{dollar}{totalExpense()}</span></h2>
                <div className="income-content">
                    <div className="form-container">
                        <ExpenseForms/>
                    </div>
                    <div className="incomes">
                        {expenses.map((expense) =>{
                            const {_id,title,amount,date,category,description,type} = expense;
                            return <IncomeItem
                                key = {_id}
                                id = {_id}
                                title={title}
                                description = {description}
                                amount = {amount}
                                date = {date}
                                category = {category}
                                type={type}
                                indicatorColor="red"
                                deleteItem={deleteExpense}
                            />
                        })}
                    </div>
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
