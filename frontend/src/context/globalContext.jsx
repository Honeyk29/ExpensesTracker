import React from 'react';
import axios from 'axios';
import { useState, useContext } from 'react';
const BASE_URL = "http://localhost:5000/api/v1/";

const GlobalContext = React.createContext()



export const GlobalProvider = ({children})=>{

    const [incomes,setIncomes] = useState([]);
    const [expenses,setExpenses] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async(income)=>{
        const response = await axios.post(`${BASE_URL}add-income`,income)
            .catch((err)=>{
                setError(err.response.data.message)
            })
            getIncome()
    }

    const getIncome = async()=>{
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
    }

    const deleteIncome = async(id)=>{
        const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncome()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income)=>{
            totalIncome += income.amount
        })

        return totalIncome;
    }

    const addExpense = async(expense)=>{
        const response = await axios.post(`${BASE_URL}add-expense`,expense)
            .catch((err)=>{
                setError(err.response.data.message)
            })
            getExpense()
    }
    
    const getExpense = async()=>{
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
    }

    const deleteExpense = async(id)=>{
        const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpense()
    }

    const totalExpense = () => {
        let totalExpense = 0;
        expenses.forEach((expense)=>{
            totalExpense += expense.amount
        })

        return totalExpense;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense();
    }

    const transactionHistory = () =>{
        const history = [...incomes, ...expenses]
        history.sort((a,b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        return history.slice(0,6);
    }

    return (
        <GlobalContext.Provider value = {{
                addIncome,
                getIncome,
                incomes,
                deleteIncome,
                totalIncome,
                addExpense,
                getExpense,
                deleteExpense,
                totalExpense,
                expenses,
                totalBalance,
                transactionHistory,
                error,
                setError
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext)
}