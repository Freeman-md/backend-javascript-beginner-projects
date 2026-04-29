const {
    addTask,
    updateTask,
    deleteTask,
    markTask,
    listTasks
} = require('./tasks')

function run(argv) {
    const command = argv[2]
    const firstArgument = argv[3]
    const secondArgument = argv[4]

    try {
        if (!command) {
            printHelp()
            return
        }

        if (command === 'add') {
            const task = addTask(firstArgument)
            console.log(`Task added successfully (ID: ${task.id})`)
            return
        }

        if (command === 'update') {
            const task = updateTask(firstArgument, secondArgument)
            console.log(`Task updated successfully (ID: ${task.id})`)
            return
        }

        if (command === 'delete') {
            const task = deleteTask(firstArgument)
            console.log(`Task deleted successfully (ID: ${task.id})`)
            return
        }

        if (command === 'mark-in-progress') {
            const task = markTask(firstArgument, 'in-progress')
            console.log(`Task marked as in-progress (ID: ${task.id})`)
            return
        }

        if (command === 'mark-done') {
            const task = markTask(firstArgument, 'done')
            console.log(`Task marked as done (ID: ${task.id})`)
            return
        }

        if (command === 'list') {
            const tasks = listTasks(firstArgument)
            printTasks(tasks)
            return
        }

        throw new Error(`Unknown command: ${command}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exitCode = 1
    }
}

function printTasks(tasks) {
    if (tasks.length === 0) {
        console.log('No tasks found')
        return
    }

    tasks.forEach(function(task) {
        console.log(`${task.id}. [${task.status}] ${task.description}`)
    })
}

function printHelp() {
    console.log('Task CLI')
    console.log('')
    console.log('Usage:')
    console.log('  task-cli add "Buy groceries"')
    console.log('  task-cli update 1 "Buy groceries and cook dinner"')
    console.log('  task-cli delete 1')
    console.log('  task-cli mark-in-progress 1')
    console.log('  task-cli mark-done 1')
    console.log('  task-cli list')
    console.log('  task-cli list todo')
    console.log('  task-cli list in-progress')
    console.log('  task-cli list done')
}

module.exports = {
    run
}
