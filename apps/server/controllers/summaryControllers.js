import {
    getAllExpensesSummaryCustomRange,
    getAllIncomesSummaryCustomRange,
    getAllMonthlyRecurringExpenseSummary, getAllNotRecurringExpenseSummary,
    getMonthlyIncomeSummary,
    getSumMonthlyIncomeSummary, getTotalMonthlyNotRecurringExpenseSummary, getTotalMonthlyRecurringExpenseSummary
} from "../models/summaryDB.js";


export const getMonthlySummary = async (req, res) => {
    const {month} = req.query;
    const id = req.user.id

    if (!/^[\d-]+$/.test(month) || !/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({Message: 'Month parameter is invalid.'});
    }

    try {
        const yearInputted = month.split('-')[0];
        const monthInputted = month.split('-')[1];
        const incomes = await getMonthlyIncomeSummary(monthInputted, yearInputted, id);
        const totalIncome = await getSumMonthlyIncomeSummary(monthInputted, yearInputted, id);
        if (totalIncome.rows[0].sum === null) {
            totalIncome.rows[0].sum = 0;
        }

        const recurringExpenses = await getAllMonthlyRecurringExpenseSummary(id);
        const regularExpenses = await getAllNotRecurringExpenseSummary(id);

        const sumRecurringExpenses = await getTotalMonthlyRecurringExpenseSummary(monthInputted, yearInputted, id);
        if (sumRecurringExpenses.rows[0].sum === null){
            sumRecurringExpenses.rows[0].sum = 0;
        }

        let sumRegularExpenses = await getTotalMonthlyNotRecurringExpenseSummary(monthInputted, yearInputted, id);
        if (sumRegularExpenses.rows[0].sum === null){
            sumRegularExpenses.rows[0].sum = 0;
        }

        const totalExpenses = sumRegularExpenses.rows[0].sum + sumRecurringExpenses.rows[0].sum;

        const differences = totalIncome.rows[0].sum - totalExpenses;

        return res.status(200).json({ monthlyIncomes: incomes.rows,
            totalMonthlyIncome: totalIncome.rows[0].sum,
            recurringExpenses: recurringExpenses.rows,
            regularExpenses: regularExpenses.rows,
            sumRecurringExpenses: sumRecurringExpenses.rows[0].sum,
            sumRegularExpenses: sumRegularExpenses.rows[0].sum,
            totalExpenses: totalExpenses,
            differences: differences });
    } catch (err) {
        console.log(err);
        return res.status(500).json({Message: 'An error occurred, please try again later'});
    }
}

export const getAlert = async (req, res) => {
    const id = req.user.id;

    const date = new Date();
    let currentMonth = date.getMonth() + 1;
    if (currentMonth < 10) {
        currentMonth = "0" + currentMonth;
    }
    const currentYear = date.getFullYear();

    const totalIncome = await getSumMonthlyIncomeSummary(currentMonth, currentYear, id);

    const sumRecurringExpenses = await getTotalMonthlyRecurringExpenseSummary(currentMonth, currentYear, id);
    const sumRegularExpenses = await getTotalMonthlyNotRecurringExpenseSummary(currentMonth, currentYear, id);
    const totalExpenses = sumRegularExpenses.rows[0].sum + sumRecurringExpenses.rows[0].sum;
    const differences = totalIncome.rows[0].sum - totalExpenses;

    if (totalExpenses > totalIncome.rows[0].sum) {
        return res.status(200).json({ Message: `Monthly budget exceeded by ${-differences}` })
    }
    return res.status(200).json({ Message: `you saved ${differences}` })
}

export const getCustomRangeSummary = async (req, res) => { // check later sql query issues
    const id = req.user.id;
    const { startDate, endDate } = req.query;

    if (!/^[\d-]+$/.test(startDate || endDate) || !/^\d{4}-\d{2}-\d{2}$/.test(startDate || endDate)) {
        return res.status(400).json({Message: 'Date parameter is invalid.'});
    }
    try{
        const incomesQueried = await getAllIncomesSummaryCustomRange(startDate, endDate, id);
        const expensesQueried = await getAllExpensesSummaryCustomRange(startDate, endDate, id);
        return res.status(200).json({ incomesQueried: incomesQueried.rows, expensesQueried: expensesQueried.rows });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ Message: 'An error occurred, please try again later' });
    }
}