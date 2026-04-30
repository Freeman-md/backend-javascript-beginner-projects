function formatEvent(event) {
    const eventType = event.type
    const repoName = getRepoName(event)

    if (eventType === 'PushEvent') {
        const commits = event.payload && Array.isArray(event.payload.commits)
            ? event.payload.commits
            : []

        if (commits.length === 0) {
            return `Pushed to ${repoName}`
        }

        const commitLabel = commits.length === 1 ? 'commit' : 'commits'

        return `Pushed ${commits.length} ${commitLabel} to ${repoName}`
    }

    if (eventType === 'IssuesEvent') {
        const action = event.payload && event.payload.action
            ? capitalize(event.payload.action)
            : 'Updated'

        return `${action} an issue in ${repoName}`
    }

    if (eventType === 'WatchEvent') {
        return `Starred ${repoName}`
    }

    if (eventType === 'ForkEvent') {
        return `Forked ${repoName}`
    }

    if (eventType === 'CreateEvent') {
        const refType = event.payload && event.payload.ref_type
            ? event.payload.ref_type
            : 'resource'

        return `Created ${refType} in ${repoName}`
    }

    return `${eventType} in ${repoName}`
}

function formatEvents(events) {
    if (events.length === 0) {
        return ['No recent activity found']
    }

    return events.map(function(event) {
        return `- ${formatEvent(event)}`
    })
}

function getRepoName(event) {
    if (event.repo && event.repo.name) {
        return event.repo.name
    }

    return 'unknown repository'
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

module.exports = {
    formatEvent,
    formatEvents
}
