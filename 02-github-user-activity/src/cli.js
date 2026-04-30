const { fetchGitHubActivity } = require('./github')
const { formatEvents } = require('./format')

async function run(argv) {
    const username = argv[2]

    try {
        if (!username) {
            printHelp()
            return
        }

        const events = await fetchGitHubActivity(username.trim())
        const formattedEvents = formatEvents(events)

        formattedEvents.forEach(function(event) {
            console.log(event)
        })
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exitCode = 1
    }
}

function printHelp() {
    console.log('GitHub User Activity')
    console.log('')
    console.log('Usage:')
    console.log('  github-activity <username>')
}

module.exports = {
    run
}
