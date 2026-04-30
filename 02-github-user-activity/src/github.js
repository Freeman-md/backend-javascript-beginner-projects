function buildGitHubEventsUrl(username) {
    return `https://api.github.com/users/${username}/events`
}

async function fetchGitHubActivity(username) {
    const response = await fetch(buildGitHubEventsUrl(username), {
        headers: {
            'Accept': 'application/vnd.github+json',
            'User-Agent': 'github-user-activity-cli'
        }
    })

    if (response.status === 404) {
        throw new Error(`GitHub user "${username}" was not found`)
    }

    if (!response.ok) {
        throw new Error(`GitHub API request failed with status ${response.status}`)
    }

    return response.json()
}

module.exports = {
    buildGitHubEventsUrl,
    fetchGitHubActivity
}
