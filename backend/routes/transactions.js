const { addIncome, deleteIncome, getIncome } = require('../controllers/income')
const {deleteExpense,addExpense,getExpense} = require('../controllers/expense')
const router = require('express').Router()


router.post('/add-income',addIncome)
        .get('/get-incomes',getIncome)
        .delete('/delete-income/:id',deleteIncome)
        .post('/add-expense',addExpense)
        .get('/get-expenses',getExpense)
        .delete('/delete-expense/:id',deleteExpense)


module.exports = router