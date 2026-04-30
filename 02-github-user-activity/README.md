# GitHub User Activity CLI

This is the second project in the Backend Developer beginner roadmap.

Project page: https://roadmap.sh/projects/github-user-activity

## Project Purpose

This project reinforces my understanding of building CLI applications that consume external APIs using Node.js.

It focuses on:

- handling command-line arguments
- calling an external HTTP API
- working with JSON responses
- formatting terminal output
- handling API and user input errors gracefully
- testing deterministic formatting logic

## Features

- Fetch recent public GitHub activity for a username
- Display formatted activity in the terminal
- Handle missing usernames
- Handle invalid GitHub users
- Handle empty activity responses
- Handle sparse GitHub event payloads safely

## Setup

Install dependencies:

```bash
npm install
```

Link the CLI locally:

```bash
npm link
```

After linking, the `github-activity` command can be run from the terminal.

## Usage

```bash
github-activity <username>
```

Example:

```bash
github-activity Freeman-md
```

## Example Output

```plain text
- Pushed to Freeman-md/backend-javascript-beginner-projects
- Created branch in Freeman-md/backend-javascript-beginner-projects
- Forked kidzrockboom/FairRoom
- Closed an issue in kidzrockboom/FairRoom
```

If the user has no recent public activity:

```plain text
No recent activity found
```

If the user does not exist:

```plain text
Error: GitHub user "username" was not found
```

## API Source

The CLI fetches public activity from:

```plain text
https://api.github.com/users/<username>/events
```

## Supported Event Formatting

The formatter currently handles:

- `PushEvent`
- `IssuesEvent`
- `WatchEvent`
- `ForkEvent`
- `CreateEvent`

Unknown event types fall back to a generic format instead of crashing.

## Testing

Run the test suite:

```bash
npm test
```

The tests focus on deterministic event formatting, including sparse or incomplete payloads from the GitHub API.

## Constraints

This project intentionally avoids external libraries and frameworks.

It uses:

- Node.js built-in `fetch`
- `node:test`
- `node:assert`

## Learning Reflection

The main lesson was that external API payloads should not be treated as perfectly shaped internal data.

The first formatter assumed every `PushEvent` had a `payload.commits` array. A real GitHub response showed that this is not always true.

That changed the implementation from simple event formatting to safer boundary handling:

```plain text
external API response -> safe interpreter -> terminal output
```

The useful systems lesson is that API consumption is not just fetching data. It is validating and interpreting data at the boundary before the rest of the application depends on it.
