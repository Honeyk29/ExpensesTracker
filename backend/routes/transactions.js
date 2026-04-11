const { addIncome, deleteIncome, getIncome } = require('../controllers/income')
const {deleteExpense,addExpense,getExpense} = require('../controllers/expense')
const { protect } = require('../middlewares/authMiddleware')
const router = require('express').Router()


router.post('/add-income', protect, addIncome)
        .get('/get-incomes', protect, getIncome)
        .delete('/delete-income/:id', protect, deleteIncome)
        .post('/add-expense', protect, addExpense)
        .get('/get-expenses', protect, getExpense)
        .delete('/delete-expense/:id', protect, deleteExpense)


module.exports = router