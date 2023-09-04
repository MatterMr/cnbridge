<p align="center">
    <img width="500" alt="cnbridge logo" src="cnbridge_logo_draft.png">
</p>

# cnbridge

A Node CLI ([Notion Internal Integration](https://developers.notion.com/docs/getting-started#internal-integrations)) that imports your Canvas course data into your Notion workspace. AKA (Canvas Notion Bridge)

- Have you ever been confused on where to click to find your sylabus, teachers notes, assignments, and assesments on Canvas?

- Don't you wish that teachers showed you all your course information in the same way?

- Or do you just hate how the Canvas website is formatted!!!

cnbridge aims to solve this problem by allowing you to create a local template of your Canvas courses in Notion, then allowing you to customize each of those courses according to how they are formatted. All of the data from each of your courses is stored in a collection of unified databases, that allows the creation of a customizable dashboard for all of your classes combined.

cnbridge provides two main peices of functionality, syncing course data, and formatting your Notion workspace to successfully interface with that data.

## Status

This is a pet project that I am working in tandem to other things,

<p align="left">
    <img width="100" alt="petcrid" src="https://cdn.discordapp.com/emojis/1032388831749623818.gif?size=128&quality=lossless">
</p>
Soooooo... development will be slow, but will have set deadlines.

Project status will be tracked through a Notion workspace (Notion project uses notion :3).
While the projects main communication will be on the Mines ACM discord.

Notion: (TBA)

Discord: [Mines ACM](https://discord.gg/GJBCpnGhpa)

## Developing cnbridge

This project is reliant on [Node.js](https://nodejs.org/en/download) so make sure you have a copy for your platform.

### Downloading the source code

Clone the repository:

```shell
git clone https://github.com/MatterMr/CNBridge
cd cnbridge
```

The following commands must be run within the `cnbridge` directory:

To update the source code to the latest commit:

```shell
git pull
```

To install the projects dependancies:

```shell
npm install
```

To install the `cnbridge` command in your local enviorment:

```shell
npm install -g .
```

### Running

The `cnbridge` command should now be installed locally, so lets test it!

```shell
cnbridge --help
```

Unfortunatly the commands listed in the help menu right now are mainly placeholder until the backend services are finished.

### Testing

The most useful command in this instance is the test command, which allows us to test the backend while it is in development.

To create a test command create `test.js` in the `src/commands/` directory:

```shell
touch src/commands/test.js
```

Then paste this into `test.js`:

```javascript
exports.command = "test";
exports.describe = "test command";
exports.builder = {};
exports.handler = async function (argv) {};
```

Any code within the handler function will be run when `cnbridge test` is run.

### Backend Configuration

Currently the client configuration is stored in `src/config/config.json`, please create this file by copying the template and changing its name.

This configuration system is bound to change as time goes on, but for now it is used for storing api tokens and endpoints.

### Style Guide

Before committing, you should formatt your code. Please, I beg of you.

Personaly
