const {
    addExpense,
    updateExpense,
    deleteExpense,
    listExpenses,
    getTotalExpenses,
    getMonthlyExpensesTotal
} = require('./expenses')
const {
    formatExpenses,
    formatTotalSummary,
    formatMonthlySummary
} = require('./format')

function run(argv) {
    const command = argv[2]
    const args = parseArgs(argv.slice(3))

    try {
        if (!command) {
            printHelp()
            return
        }

        if (command === 'add') {
            const expense = addExpense(args.description, args.amount)
            console.log(`Expense added successfully (ID: ${expense.id})`)
            return
        }

        if (command === 'update') {
            const expense = updateExpense(args.id, args.description, args.amount)
            console.log(`Expense updated successfully (ID: ${expense.id})`)
            return
        }

        if (command === 'delete') {
            const expense = deleteExpense(args.id)
            console.log(`Expense deleted successfully (ID: ${expense.id})`)
            return
        }

        if (command === 'list') {
            const lines = formatExpenses(listExpenses())
            lines.forEach(function(line) {
                console.log(line)
            })
            return
        }

        if (command === 'summary') {
            if (args.month) {
                const total = getMonthlyExpensesTotal(args.month)
                console.log(formatMonthlySummary(args.month, total))
                return
            }

            const total = getTotalExpenses()
            console.log(formatTotalSummary(total))
            return
        }

        throw new Error(`Unknown command: ${command}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exitCode = 1
    }
}

function parseArgs(args) {
    const parsedArgs = {}

    for (let index = 0; index < args.length; index += 2) {
        const key = args[index]
        const value = args[index + 1]

        if (!key || !key.startsWith('--')) {
            throw new Error(`Invalid argument: ${key}`)
        }

        if (value === undefined) {
            throw new Error(`Missing value for ${key}`)
        }

        parsedArgs[key.slice(2)] = value
    }

    return parsedArgs
}

function printHelp() {
    console.log('Expense Tracker')
    console.log('')
    console.log('Usage:')
    console.log('  expense-tracker add --description "Lunch" --amount 20')
    console.log('  expense-tracker update --id 1 --description "Lunch with client" --amount 25')
    console.log('  expense-tracker delete --id 1')
    console.log('  expense-tracker list')
    console.log('  expense-tracker summary')
    console.log('  expense-tracker summary --month 8')
}

module.exports = {
    run
}
