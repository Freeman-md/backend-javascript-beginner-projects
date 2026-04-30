const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const storage = require('../src/storage')
const {
    addExpense,
    updateExpense,
    deleteExpense,
    listExpenses,
    getTotalExpenses,
    getMonthlyExpensesTotal
} = require('../src/expenses')

const expensesFilePath = storage.getExpensesFilePath()
const dataDirectory = path.dirname(expensesFilePath)

function resetDataDirectory() {
    if (fs.existsSync(dataDirectory)) {
        fs.rmSync(dataDirectory, { recursive: true, force: true })
    }
}

beforeEach(function() {
    resetDataDirectory()
    storage.ensureExpensesFileExists()
})

test('adds an expense', function() {
    const expense = addExpense('Lunch', 20)

    assert.strictEqual(expense.id, 1)
    assert.strictEqual(expense.description, 'Lunch')
    assert.strictEqual(expense.amount, 20)
    assert.ok(expense.date)

    assert.deepStrictEqual(listExpenses(), [expense])
})

test('trims expense description when adding', function() {
    const expense = addExpense('  Lunch  ', 20)

    assert.strictEqual(expense.description, 'Lunch')
})

test('increments expense IDs', function() {
    const firstExpense = addExpense('Lunch', 20)
    const secondExpense = addExpense('Dinner', 10)

    assert.strictEqual(firstExpense.id, 1)
    assert.strictEqual(secondExpense.id, 2)
})

test('throws when description is missing', function() {
    assert.throws(function() {
        addExpense('', 20)
    }, /Expense description is required/)
})

test('throws when amount is invalid', function() {
    assert.throws(function() {
        addExpense('Lunch', 'abc')
    }, /Expense amount must be a valid number/)
})

test('throws when amount is zero or negative', function() {
    assert.throws(function() {
        addExpense('Lunch', 0)
    }, /Expense amount must be greater than 0/)

    assert.throws(function() {
        addExpense('Lunch', -5)
    }, /Expense amount must be greater than 0/)
})

test('updates an expense', function() {
    const expense = addExpense('Lunch', 20)
    const updatedExpense = updateExpense(expense.id, 'Lunch with client', 25)

    assert.strictEqual(updatedExpense.id, 1)
    assert.strictEqual(updatedExpense.description, 'Lunch with client')
    assert.strictEqual(updatedExpense.amount, 25)
})

test('throws when updating a missing expense', function() {
    assert.throws(function() {
        updateExpense(999, 'Lunch', 20)
    }, /Expense with id 999 was not found/)
})

test('deletes an expense', function() {
    const firstExpense = addExpense('Lunch', 20)
    const secondExpense = addExpense('Dinner', 10)

    const deletedExpense = deleteExpense(firstExpense.id)

    assert.strictEqual(deletedExpense.id, firstExpense.id)
    assert.deepStrictEqual(listExpenses(), [secondExpense])
})

test('throws when deleting a missing expense', function() {
    assert.throws(function() {
        deleteExpense(999)
    }, /Expense with id 999 was not found/)
})

test('lists all expenses', function() {
    const firstExpense = addExpense('Lunch', 20)
    const secondExpense = addExpense('Dinner', 10)

    assert.deepStrictEqual(listExpenses(), [firstExpense, secondExpense])
})

test('calculates total expenses', function() {
    addExpense('Lunch', 20)
    addExpense('Dinner', 10)

    assert.strictEqual(getTotalExpenses(), 30)
})

test('calculates monthly expenses total for the current month', function() {
    const currentMonth = new Date().getMonth() + 1

    addExpense('Lunch', 20)
    addExpense('Dinner', 10)

    assert.strictEqual(getMonthlyExpensesTotal(currentMonth), 30)
})

test('returns zero for month with no expenses', function() {
    addExpense('Lunch', 20)

    const currentMonth = new Date().getMonth() + 1
    const differentMonth = currentMonth === 12 ? 11 : 12

    assert.strictEqual(getMonthlyExpensesTotal(differentMonth), 0)
})

test('throws for invalid month', function() {
    assert.throws(function() {
        getMonthlyExpensesTotal(0)
    }, /Month must be a number between 1 and 12/)

    assert.throws(function() {
        getMonthlyExpensesTotal(13)
    }, /Month must be a number between 1 and 12/)
})

test('throws for invalid expense id', function() {
    assert.throws(function() {
        updateExpense('abc', 'Lunch', 20)
    }, /Expense id must be a positive number/)

    assert.throws(function() {
        deleteExpense(0)
    }, /Expense id must be a positive number/)
})
