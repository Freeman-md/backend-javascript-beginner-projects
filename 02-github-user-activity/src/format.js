function formatEvent(event) {
    const eventType = event.type
    const repoName = event.repo && event.repo.name

    if (eventType === 'PushEvent') {
        const commitCount = event.payload.commits.length
        const commitLabel = commitCount === 1 ? 'commit' : 'commits'

        return `Pushed ${commitCount} ${commitLabel} to ${repoName}`
    }

    if (eventType === 'IssuesEvent') {
        return `${capitalize(event.payload.action)} an issue in ${repoName}`
    }

    if (eventType === 'WatchEvent') {
        return `Starred ${repoName}`
    }

    if (eventType === 'ForkEvent') {
        return `Forked ${repoName}`
    }

    if (eventType === 'CreateEvent') {
        return `Created ${event.payload.ref_type} in ${repoName}`
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

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1)
}

module.exports = {
    formatEvent,
    formatEvents
}
