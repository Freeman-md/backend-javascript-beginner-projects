# CLI Task Tracker

This is the first project in the Backend Developer beginner roadmap.

Project page: https://roadmap.sh/projects/task-tracker?fl=0

## Project Purpose

This project reinforces my understanding and capability to build CLI applications using Node.js.

It focuses on:

- handling command-line arguments
- working with the filesystem
- storing data in JSON
- implementing CRUD operations
- handling user input errors gracefully
- writing automated tests with Node's built-in test runner

## Features

- Add tasks
- Update tasks
- Delete tasks
- Mark tasks as in progress
- Mark tasks as done
- List all tasks
- Filter tasks by status

## Setup

Install dependencies:

```bash
npm install
```

Link the CLI locally:

```bash
npm link
```

After linking, the `task-cli` command can be run from the terminal.

## Usage

Add a task:

```bash
task-cli add "Buy groceries"
```

Update a task:

```bash
task-cli update 1 "Buy groceries and cook dinner"
```

Delete a task:

```bash
task-cli delete 1
```

Mark a task as in progress:

```bash
task-cli mark-in-progress 1
```

Mark a task as done:

```bash
task-cli mark-done 1
```

List all tasks:

```bash
task-cli list
```

Filter tasks by status:

```bash
task-cli list todo
task-cli list in-progress
task-cli list done
```

## Example Output

```plain text
Task added successfully (ID: 1)
Task updated successfully (ID: 1)
Task marked as in-progress (ID: 1)
Task marked as done (ID: 1)
1. [done] Buy groceries and cook dinner
Task deleted successfully (ID: 1)
No tasks found
```

## Data Storage

Tasks are stored locally in:

```plain text
data/tasks.json
```

The `data/` directory and `tasks.json` file are created automatically if they do not exist.

Each task includes:

- `id`
- `description`
- `status`
- `createdAt`
- `updatedAt`

Supported statuses:

- `todo`
- `in-progress`
- `done`

The storage layer also handles:

- missing task file
- empty task file
- corrupted JSON
- valid JSON with the wrong shape

## Testing

Run the test suite:

```bash
npm test
```

The project uses Node.js built-in test tooling:

```bash
node --test --test-concurrency=1
```

Test coverage includes:

- storage file creation
- invalid JSON recovery
- task creation
- task updates
- task deletion
- status changes
- status filtering
- validation errors

## Constraints

This project intentionally avoids external libraries and frameworks.

It uses Node.js built-in modules such as:

- `fs`
- `path`
- `process`
- `node:test`
- `node:assert`

## Learning Reflection

This project helped me understand how CLI applications connect command-line input to domain logic and local persistence.

The main system boundary is:

```plain text
CLI input -> command parser -> task domain logic -> JSON storage
```

Although the project is small, it reinforces useful backend engineering habits: separating concerns, validating input, testing edge cases, and keeping runtime data out of source control.
