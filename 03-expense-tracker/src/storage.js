const fs = require('fs')
const path = require('path')

const FILENAME = 'expenses.json'

function getExpensesFilePath() {
    return path.join(__dirname, '../data', FILENAME)
}

function ensureExpensesFileExists() {
    const expensesFilePath = getExpensesFilePath()
    const expensesDirectory = path.dirname(expensesFilePath)

    if (!fs.existsSync(expensesDirectory)) {
        fs.mkdirSync(expensesDirectory, { recursive: true })
    }

    if (!fs.existsSync(expensesFilePath)) {
        fs.writeFileSync(expensesFilePath, JSON.stringify([], null, 2))
        return
    }

    const fileContent = fs.readFileSync(expensesFilePath, 'utf-8')

    if (fileContent.trim() === '') {
        fs.writeFileSync(expensesFilePath, JSON.stringify([], null, 2))
        return
    }

    try {
        const expenses = JSON.parse(fileContent)

        if (!Array.isArray(expenses)) {
            fs.writeFileSync(expensesFilePath, JSON.stringify([], null, 2))
        }
    } catch (error) {
        fs.writeFileSync(expensesFilePath, JSON.stringify([], null, 2))
    }
}

function readExpenses() {
    ensureExpensesFileExists()

    const expensesFilePath = getExpensesFilePath()
    const fileContent = fs.readFileSync(expensesFilePath, 'utf-8')

    return JSON.parse(fileContent)
}

function writeExpenses(expenses) {
    ensureExpensesFileExists()

    const expensesFilePath = getExpensesFilePath()
    fs.writeFileSync(expensesFilePath, JSON.stringify(expenses, null, 2))
}

module.exports = {
    getExpensesFilePath,
    ensureExpensesFileExists,
    readExpenses,
    writeExpenses
}
