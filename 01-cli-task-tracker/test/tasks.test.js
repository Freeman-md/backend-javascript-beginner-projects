const test = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const storage = require('../src/storage')
const {
    addTask,
    updateTask,
    deleteTask,
    markTask,
    listTasks
} = require('../src/tasks')

const tasksFilePath = storage.getTasksFilePath()
const dataDirectory = path.dirname(tasksFilePath)

function resetDataDirectory() {
    if (fs.existsSync(dataDirectory)) {
        fs.rmSync(dataDirectory, { recursive: true, force: true })
    }

    storage.ensureTasksFileExists()
}

test('adds a task with default todo status', function () {
    resetDataDirectory()

    const task = addTask('Buy groceries')

    assert.strictEqual(task.id, 1)
    assert.strictEqual(task.description, 'Buy groceries')
    assert.strictEqual(task.status, 'todo')
    assert.ok(task.createdAt)
    assert.ok(task.updatedAt)

    assert.deepStrictEqual(listTasks(), [task])
})

test('trims task description when adding a task', function () {
    resetDataDirectory()

    const task = addTask('  Buy groceries  ')

    assert.strictEqual(task.description, 'Buy groceries')
})

test('increments task IDs', function () {
    resetDataDirectory()

    const firstTask = addTask('Buy groceries')
    const secondTask = addTask('Read docs')

    assert.strictEqual(firstTask.id, 1)
    assert.strictEqual(secondTask.id, 2)
})

test('throws when adding an empty task description', function () {
    resetDataDirectory()

    assert.throws(function () {
        addTask('')
    }, /Task description is required/)
})

test('updates a task description', function () {
    resetDataDirectory()

    const task = addTask('Buy groceries')
    const updatedTask = updateTask(task.id, 'Buy groceries and cook dinner')

    assert.strictEqual(updatedTask.id, task.id)
    assert.strictEqual(updatedTask.description, 'Buy groceries and cook dinner')
    assert.strictEqual(updatedTask.status, 'todo')
})

test('throws when updating a missing task', function () {
    resetDataDirectory()

    assert.throws(function () {
        updateTask(999, 'New description')
    }, /Task with id 999 was not found/)
})

test('deletes a task', function () {
    resetDataDirectory()

    const firstTask = addTask('Buy groceries')
    const secondTask = addTask('Read docs')

    const deletedTask = deleteTask(firstTask.id)

    assert.strictEqual(deletedTask.id, firstTask.id)
    assert.deepStrictEqual(listTasks(), [secondTask])
})

test('throws when deleting a missing task', function () {
    resetDataDirectory()

    assert.throws(function () {
        deleteTask(999)
    }, /Task with id 999 was not found/)
})

test('marks a task as in-progress', function () {
    resetDataDirectory()

    const task = addTask('Buy groceries')
    const markedTask = markTask(task.id, 'in-progress')

    assert.strictEqual(markedTask.status, 'in-progress')
})

test('marks a task as done', function () {
    resetDataDirectory()

    const task = addTask('Buy groceries')
    const markedTask = markTask(task.id, 'done')

    assert.strictEqual(markedTask.status, 'done')
})

test('throws when marking with an invalid status', function () {
    resetDataDirectory()

    const task = addTask('Buy groceries')

    assert.throws(function () {
        markTask(task.id, 'blocked')
    }, /Status must be one of/)
})

test('lists all tasks', function () {
    resetDataDirectory()

    const firstTask = addTask('Buy groceries')
    const secondTask = addTask('Read docs')

    assert.deepStrictEqual(listTasks(), [firstTask, secondTask])
})

test('filters tasks by status', function () {
    resetDataDirectory()

    const firstTask = addTask('Buy groceries')
    const secondTask = addTask('Read docs')
    const thirdTask = addTask('Write code')

    const secondTaskUpdated = markTask(secondTask.id, 'in-progress')
    const thirdTaskUpdated = markTask(thirdTask.id, 'done')

    assert.deepStrictEqual(listTasks('todo'), [firstTask])
    assert.deepStrictEqual(listTasks('in-progress'), [secondTaskUpdated])
    assert.deepStrictEqual(listTasks('done'), [thirdTaskUpdated])
})

test('throws when listing with an invalid status', function () {
    resetDataDirectory()

    assert.throws(function () {
        listTasks('blocked')
    }, /Status must be one of/)
})
