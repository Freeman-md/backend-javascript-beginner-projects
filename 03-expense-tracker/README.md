# Expense Tracker CLI

This is the third project in the Backend Developer beginner roadmap.

Project page: https://roadmap.sh/projects/expense-tracker

## Project Purpose

This project reinforces my understanding of building CLI applications that manage local persisted data using Node.js.

It focuses on:

- handling command-line arguments
- storing and updating local data
- implementing CRUD operations
- validating numeric input
- generating summary output
- handling user input errors gracefully
- writing automated tests with Node's built-in test runner

## Features

- Add expenses
- Update expenses
- Delete expenses
- List all expenses
- Show total expense summary
- Show monthly expense summary for the current year

## Setup

```bash
npm install
npm link
```

## Usage

```bash
expense-tracker add --description "Lunch" --amount 20
expense-tracker update --id 1 --description "Lunch with client" --amount 25
expense-tracker delete --id 2
expense-tracker list
expense-tracker summary
expense-tracker summary --month 8
```

## Example Output

```text
Expense added successfully (ID: 1)
Expense added successfully (ID: 2)
ID  Description              Amount  Date
1   Lunch                    $20.00  2026-05-01
2   Dinner                   $10.00  2026-05-01
Total expenses: $30.00
Total expenses for month 5: $30.00
Expense deleted successfully (ID: 1)
```

## Data Storage

Expenses are stored locally in:

```plain text
data/expenses.json
```

The file is created automatically if it does not exist.

Each expense contains:

- `id`
- `description`
- `amount`
- `date`

## Testing

```bash
npm test
```

The project uses Node.js built-in test tooling:

```bash
node --test --test-concurrency=1
```

Test coverage includes:

- storage file creation and recovery
- expense creation, updates, and deletion
- numeric and ID validation
- total and monthly summaries
- output formatting

## Constraints

This project intentionally avoids external libraries and frameworks.

It uses Node.js built-in modules such as:

- `fs`
- `path`
- `process`
- `node:test`
- `node:assert`

## Learning Reflection

This project helped reinforce that even a small CLI benefits from clean boundaries.

The main system boundary is:

```plain text
CLI input -> parser -> expense domain logic -> JSON storage -> terminal output
```

The project is simple in scope, but it still required clear validation, structured persistence, readable formatting, and summary logic beyond basic CRUD.
