const { readExpenses, writeExpenses } = require('./storage')

function addExpense(description, amount) {
    validateDescription(description)
    const parsedAmount = validateAmount(amount)

    const expenses = readExpenses()

    const newExpense = {
        id: getNextExpenseId(expenses),
        description: description.trim(),
        amount: parsedAmount,
        date: new Date().toISOString().slice(0, 10)
    }

    expenses.push(newExpense)
    writeExpenses(expenses)

    return newExpense
}

function updateExpense(id, description, amount) {
    const parsedId = validateExpenseId(id)
    validateDescription(description)
    const parsedAmount = validateAmount(amount)

    const expenses = readExpenses()
    const expense = findExpenseById(expenses, parsedId)

    expense.description = description.trim()
    expense.amount = parsedAmount

    writeExpenses(expenses)

    return expense
}

function deleteExpense(id) {
    const parsedId = validateExpenseId(id)

    const expenses = readExpenses()
    const expense = findExpenseById(expenses, parsedId)

    const updatedExpenses = expenses.filter(function(currentExpense) {
        return currentExpense.id !== parsedId
    })

    writeExpenses(updatedExpenses)

    return expense
}

function listExpenses() {
    return readExpenses()
}

function getTotalExpenses() {
    const expenses = readExpenses()

    return expenses.reduce(function(total, expense) {
        return total + expense.amount
    }, 0)
}

function getMonthlyExpensesTotal(month) {
    const parsedMonth = validateMonth(month)
    const currentYear = new Date().getFullYear()

    const expenses = readExpenses()

    const monthlyExpenses = expenses.filter(function(expense) {
        const expenseDate = new Date(expense.date)

        return (
            expenseDate.getFullYear() === currentYear &&
            expenseDate.getMonth() + 1 === parsedMonth
        )
    })

    return monthlyExpenses.reduce(function(total, expense) {
        return total + expense.amount
    }, 0)
}

function getNextExpenseId(expenses) {
    if (expenses.length === 0) {
        return 1
    }

    const expenseIds = expenses.map(function(expense) {
        return expense.id
    })

    return Math.max(...expenseIds) + 1
}

function findExpenseById(expenses, id) {
    const expense = expenses.find(function(currentExpense) {
        return currentExpense.id === id
    })

    if (!expense) {
        throw new Error(`Expense with id ${id} was not found`)
    }

    return expense
}

function validateExpenseId(id) {
    const parsedId = Number(id)

    if (!Number.isInteger(parsedId) || parsedId < 1) {
        throw new Error('Expense id must be a positive number')
    }

    return parsedId
}

function validateDescription(description) {
    if (!description || description.trim() === '') {
        throw new Error('Expense description is required')
    }
}

function validateAmount(amount) {
    const parsedAmount = Number(amount)

    if (!Number.isFinite(parsedAmount)) {
        throw new Error('Expense amount must be a valid number')
    }

    if (parsedAmount <= 0) {
        throw new Error('Expense amount must be greater than 0')
    }

    return parsedAmount
}

function validateMonth(month) {
    const parsedMonth = Number(month)

    if (!Number.isInteger(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
        throw new Error('Month must be a number between 1 and 12')
    }

    return parsedMonth
}

module.exports = {
    addExpense,
    updateExpense,
    deleteExpense,
    listExpenses,
    getTotalExpenses,
    getMonthlyExpensesTotal
}
