const test = require('node:test')
const assert = require('node:assert')
const {
    formatEvent,
    formatEvents
} = require('../src/format')

test('formats push event with multiple commits', function() {
    const event = {
        type: 'PushEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {
            commits: [{}, {}, {}]
        }
    }

    assert.strictEqual(
        formatEvent(event),
        'Pushed 3 commits to freemancodz/test-repo'
    )
})

test('formats push event with one commit', function() {
    const event = {
        type: 'PushEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {
            commits: [{}]
        }
    }

    assert.strictEqual(
        formatEvent(event),
        'Pushed 1 commit to freemancodz/test-repo'
    )
})

test('formats issues event', function() {
    const event = {
        type: 'IssuesEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {
            action: 'opened'
        }
    }

    assert.strictEqual(
        formatEvent(event),
        'Opened an issue in freemancodz/test-repo'
    )
})

test('formats watch event', function() {
    const event = {
        type: 'WatchEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {}
    }

    assert.strictEqual(
        formatEvent(event),
        'Starred freemancodz/test-repo'
    )
})

test('formats fork event', function() {
    const event = {
        type: 'ForkEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {}
    }

    assert.strictEqual(
        formatEvent(event),
        'Forked freemancodz/test-repo'
    )
})

test('formats create event', function() {
    const event = {
        type: 'CreateEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {
            ref_type: 'repository'
        }
    }

    assert.strictEqual(
        formatEvent(event),
        'Created repository in freemancodz/test-repo'
    )
})

test('formats unknown event with fallback output', function() {
    const event = {
        type: 'PullRequestEvent',
        repo: {
            name: 'freemancodz/test-repo'
        },
        payload: {}
    }

    assert.strictEqual(
        formatEvent(event),
        'PullRequestEvent in freemancodz/test-repo'
    )
})

test('formats event list with bullet prefixes', function() {
    const events = [
        {
            type: 'WatchEvent',
            repo: {
                name: 'freemancodz/test-repo'
            },
            payload: {}
        }
    ]

    assert.deepStrictEqual(
        formatEvents(events),
        ['- Starred freemancodz/test-repo']
    )
})

test('formats empty event list', function() {
    assert.deepStrictEqual(
        formatEvents([]),
        ['No recent activity found']
    )
})
