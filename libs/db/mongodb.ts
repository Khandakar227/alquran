import { ConnectionStates, connect } from 'mongoose'

var connection:{isConnected?: ConnectionStates} = {};


export async function dbConnect() {
    if (connection.isConnected) {
        return;
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('Add Mongo URI to .env.local')
    }
    const db = await connect(process.env.MONGODB_URI as string, {
        dbName: process.env.DBNAME,
    });

    connection.isConnected = db.connections[0]?.readyState;
}
