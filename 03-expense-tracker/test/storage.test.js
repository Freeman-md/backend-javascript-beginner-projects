const { test, beforeEach } = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const storage = require('../src/storage')

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

test('creates data directory and expenses file when missing', function() {
    assert.strictEqual(fs.existsSync(dataDirectory), true)
    assert.strictEqual(fs.existsSync(expensesFilePath), true)
    assert.deepStrictEqual(storage.readExpenses(), [])
})

test('keeps valid expense array unchanged', function() {
    const validExpenses = [
        {
            id: 1,
            description: 'Lunch',
            amount: 20,
            date: '2026-04-30'
        }
    ]

    fs.writeFileSync(expensesFilePath, JSON.stringify(validExpenses, null, 2))

    storage.ensureExpensesFileExists()

    assert.deepStrictEqual(storage.readExpenses(), validExpenses)
})

test('resets empty expenses file to an empty array', function() {
    fs.writeFileSync(expensesFilePath, '')

    storage.ensureExpensesFileExists()

    assert.deepStrictEqual(storage.readExpenses(), [])
})

test('resets corrupted JSON to an empty array', function() {
    fs.writeFileSync(expensesFilePath, '{ broken json')

    storage.ensureExpensesFileExists()

    assert.deepStrictEqual(storage.readExpenses(), [])
})

test('resets valid JSON with wrong shape to an empty array', function() {
    fs.writeFileSync(expensesFilePath, JSON.stringify({ expenses: [] }, null, 2))

    storage.ensureExpensesFileExists()

    assert.deepStrictEqual(storage.readExpenses(), [])
})
