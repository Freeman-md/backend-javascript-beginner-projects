const { readTasks, writeTasks } = require('./storage')

const VALID_STATUSES = ['todo', 'in-progress', 'done']

function addTask(description) {
    validateDescription(description)

    const tasks = readTasks()
    const now = new Date().toISOString()

    const newTask = {
        id: getNextTaskId(tasks),
        description: description.trim(),
        status: 'todo',
        createdAt: now,
        updatedAt: now
    }

    tasks.push(newTask)
    writeTasks(tasks)

    return newTask
}

function updateTask(id, description) {
    validateTaskId(id)
    validateDescription(description)

    const tasks = readTasks()
    const task = findTaskById(tasks, id)

    task.description = description.trim()
    task.updatedAt = new Date().toISOString()

    writeTasks(tasks)

    return task
}

function deleteTask(id) {
    validateTaskId(id)

    const tasks = readTasks()
    const task = findTaskById(tasks, id)
    const updatedTasks = tasks.filter(function(currentTask) {
        return currentTask.id !== task.id
    })

    writeTasks(updatedTasks)

    return task
}

function markTask(id, status) {
    validateTaskId(id)
    validateStatus(status)

    const tasks = readTasks()
    const task = findTaskById(tasks, id)

    task.status = status
    task.updatedAt = new Date().toISOString()

    writeTasks(tasks)

    return task
}

function listTasks(status) {
    const tasks = readTasks()

    if (!status) {
        return tasks
    }

    validateStatus(status)

    return tasks.filter(function(task) {
        return task.status === status
    })
}

function getNextTaskId(tasks) {
    if (tasks.length === 0) {
        return 1
    }

    const taskIds = tasks.map(function(task) {
        return task.id
    })

    return Math.max(...taskIds) + 1
}

function findTaskById(tasks, id) {
    const taskId = Number(id)

    const task = tasks.find(function(currentTask) {
        return currentTask.id === taskId
    })

    if (!task) {
        throw new Error(`Task with id ${id} was not found`)
    }

    return task
}

function validateTaskId(id) {
    const taskId = Number(id)

    if (!Number.isInteger(taskId) || taskId < 1) {
        throw new Error('Task id must be a positive number')
    }
}

function validateDescription(description) {
    if (!description || description.trim() === '') {
        throw new Error('Task description is required')
    }
}

function validateStatus(status) {
    if (!VALID_STATUSES.includes(status)) {
        throw new Error(`Status must be one of: ${VALID_STATUSES.join(', ')}`)
    }
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    markTask,
    listTasks
}
