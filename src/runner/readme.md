# Runner

## API

the runner has simper api:

- `submitCode(code, tests, variableName, submissionId) => Promise<results>`
- `refreshWorker() => Promise<void>`

## Organization

there are three different versions of the runner:

1. mobile version (legacy runner)
2. blob version (patched and concatenated to avoid `importScripts`)
3. standard version (uses imports, js files in public directory)

we ship either the mobile version or blob version in prod based off OS detection. standard version will start shipping once I figure out caching. until then, i will add all new features to standard and periodically update blob manually.

## Architecture

### Mobile (legacy)

this is the first version of the code runner I came up with; just 1 worker which is killed after every test

[add diagram here]

### Standard (latest)

[add description here]

[add diagram here]

### blob (current)

[add description here]
