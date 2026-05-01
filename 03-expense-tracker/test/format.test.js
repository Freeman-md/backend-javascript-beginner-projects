const test = require('node:test')
const assert = require('node:assert')
const {
    formatExpenses,
    formatTotalSummary,
    formatMonthlySummary
} = require('../src/format')

test('formats empty expense list', function() {
    assert.deepStrictEqual(
        formatExpenses([]),
        ['No expenses found']
    )
})

test('formats expense list with header and rows', function() {
    const expenses = [
        {
            id: 1,
            description: 'Lunch',
            amount: 20,
            date: '2026-04-30'
        },
        {
            id: 2,
            description: 'Dinner',
            amount: 10.5,
            date: '2026-04-30'
        }
    ]

    const lines = formatExpenses(expenses)

    assert.strictEqual(lines[0], 'ID  Description              Amount  Date')
    assert.match(lines[1], /1/)
    assert.match(lines[1], /Lunch/)
    assert.match(lines[1], /\$20\.00/)
    assert.match(lines[1], /2026-04-30/)
    assert.match(lines[2], /2/)
    assert.match(lines[2], /Dinner/)
    assert.match(lines[2], /\$10\.50/)
})

test('formats total summary', function() {
    assert.strictEqual(
        formatTotalSummary(30),
        'Total expenses: $30.00'
    )
})

test('formats monthly summary', function() {
    assert.strictEqual(
        formatMonthlySummary(8, 45.75),
        'Total expenses for month 8: $45.75'
    )
})
