const path = require('path')
const fs = require('fs')

const FILENAME = "tasks.json"

function getTasksFilePath() {
    return path.join(__dirname, "../data", FILENAME)
}

function ensureTasksFileExists() {
    const tasksFilePath = getTasksFilePath()
    const tasksDirectory = path.dirname(tasksFilePath)

    if (!fs.existsSync(tasksDirectory)) {
        fs.mkdirSync(tasksDirectory, { recursive: true })
    }

    if (!fs.existsSync(tasksFilePath)) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2))
        return
    }

    const fileContent = fs.readFileSync(tasksFilePath, 'utf-8')

    if (fileContent.trim() === '') {
        fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2))
        return
    }

    try {
        const tasks = JSON.parse(fileContent)

        if (!Array.isArray(tasks)) {
            fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2))
        }
    } catch (error) {
        fs.writeFileSync(tasksFilePath, JSON.stringify([], null, 2))
    }
}

function readTasks() {
    ensureTasksFileExists()

    const tasksFilePath = getTasksFilePath()
    const fileContent = fs.readFileSync(tasksFilePath, 'utf-8')

    return JSON.parse(fileContent)
}

function writeTasks(tasks) {
    ensureTasksFileExists()

    const tasksFilePath = getTasksFilePath()
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2))
}

module.exports = {
    getTasksFilePath,
    ensureTasksFileExists,
    readTasks,
    writeTasks
}
