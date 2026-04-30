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

## Command Examples

```bash
expense-tracker add --description "Lunch" --amount 20
expense-tracker update --id 1 --description "Lunch with client" --amount 25
expense-tracker delete --id 2
expense-tracker list
expense-tracker summary
expense-tracker summary --month 8
```
