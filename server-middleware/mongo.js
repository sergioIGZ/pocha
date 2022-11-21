import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost')

export default client
