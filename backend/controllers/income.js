const IncomeSchema = require("../models/incomemodel")
exports.addIncome = async(req,res)=>{
    const {title,amount,category,description,date} = req.body

    const income = IncomeSchema({
        user: req.user.id,
        title,
        amount,
        category,
        description,
        date
    })
    try {
        if(!title || !category || !description || !date){
            return res.status(400).json({message:'All fields are required'})
        }
        if(amount <= 0 || !amount==='number'){
            return res.status(400).json({message:'Amount must be a positive number'})
        }
        await income.save()
        res.status(200).json({message:'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server error'})
    }
    console.log(income)

}
exports.getIncome = async(req,res)=>{
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({createdAt:-1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}
exports.deleteIncome = async(req,res)=>{
    const {id} = req.params;
    IncomeSchema.findOneAndDelete({_id: id, user: req.user.id})
        .then((income) =>{
            res.status(200).json({message:'Income deleted'})
        })
        .catch((err)=>{
            res.status(500).json({message:'Server Error'})
        })
    }

