const test = require('node:test')
const assert = require('node:assert')
const fs = require('fs')
const path = require('path')
const storage = require('../src/storage')

const tasksFilePath = storage.getTasksFilePath()
const dataDirectory = path.dirname(tasksFilePath)

function resetDataDirectory() {
    if (fs.existsSync(dataDirectory)) {
        fs.rmSync(dataDirectory, { recursive: true, force: true })
    }
}

test('creates data directory and tasks file when missing', function () {
    resetDataDirectory()

    storage.ensureTasksFileExists()

    assert.strictEqual(fs.existsSync(dataDirectory), true)
    assert.strictEqual(fs.existsSync(tasksFilePath), true)
    assert.deepStrictEqual(storage.readTasks(), [])
})

test('keeps valid task array unchanged', function() {
    resetDataDirectory()

    storage.ensureTasksFileExists()

    const validTasks = [
        {
            id: 1,
            description: 'Buy groceries',
            status: 'todo',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ]

    fs.writeFileSync(tasksFilePath, JSON.stringify(validTasks, null, 2))

    storage.ensureTasksFileExists();

    assert.deepStrictEqual(storage.readTasks(), validTasks)
})

test('resets empty tasks file to an empty array', function() {
    resetDataDirectory()
    storage.ensureTasksFileExists()

    fs.writeFileSync(tasksFilePath, '')

    storage.ensureTasksFileExists()

    assert.deepStrictEqual(storage.readTasks(), [])
})

test('resets corrupted JSON to an empty array', function() {
    resetDataDirectory()
    storage.ensureTasksFileExists()

    fs.writeFileSync(tasksFilePath, '{ broken json')

    storage.ensureTasksFileExists()

    assert.deepStrictEqual(storage.readTasks(), [])
})

test('resets valid JSON with wrong shape to an empty array', function() {
    resetDataDirectory()
    storage.ensureTasksFileExists()

     fs.writeFileSync(tasksFilePath, JSON.stringify({ tasks: [] }, null, 2))

    storage.ensureTasksFileExists()

    assert.deepStrictEqual(storage.readTasks(), [])
})