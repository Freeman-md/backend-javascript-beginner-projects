function formatExpenses(expenses) {
    if (expenses.length === 0) {
        return ['No expenses found']
    }

    const lines = ['ID  Description              Amount  Date']

    expenses.forEach(function(expense) {
        const id = String(expense.id).padEnd(3)
        const description = expense.description.padEnd(24)
        const amount = formatAmount(expense.amount).padEnd(7)
        const date = expense.date

        lines.push(`${id} ${description} ${amount} ${date}`)
    })

    return lines
}

function formatTotalSummary(total) {
    return `Total expenses: ${formatAmount(total)}`
}

function formatMonthlySummary(month, total) {
    return `Total expenses for month ${month}: ${formatAmount(total)}`
}

function formatAmount(amount) {
    return `$${Number(amount).toFixed(2)}`
}

module.exports = {
    formatExpenses,
    formatTotalSummary,
    formatMonthlySummary
}
