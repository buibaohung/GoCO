require('dotenv').config()
global.fetch = require('node-fetch')
global.WebSocket = require('ws')

const { createDfuseClient } = require("@dfuse/client")

const client = createDfuseClient({
    apiKey: process.env.DFUSE_API_KEY,
    network: "testnet.eos.dfuse.io",
})

// You must use a `$cursor` variable so stream starts back at last marked cursor on reconnect!
const operation = `subscription($cursor: String!) {
    searchTransactionsForward(query:"receiver:${process.env.CONTRACT}", cursor: $cursor) {
        undo cursor
        trace {
            id
            status
            matchingActions {
                seq
                name
                account
                json
                authorization {
                    actor
                }
            }
        }
    }
}`

async function main() {
    const stream = await client.graphql(operation, async (message) => {
        if (message.type === "data") {
            const { undo, cursor, trace: { id, matchingActions } } = message.data.searchTransactionsForward
            console.log(id, matchingActions);

            for (let i = 0; i < matchingActions.length; i++) {
                const action = matchingActions[i];
                let func = require('./controller/' + action.name) || (() => Promise.resolve())
                await func(action.json, action.authorization, id)
            }

            // Mark stream at cursor location, on re-connect, we will start back at cursor
            stream.mark({ cursor })
        }

        if (message.type === "error") {
            console.log("An error occurred", message.errors, message.terminal)
        }

        if (message.type === "complete") {
            console.log("Completed")
        }
    })

    // Waits until the stream completes, or forever
    await stream.join()
    await client.release()
}

main().catch((error) => console.log("Unexpected error", error))
