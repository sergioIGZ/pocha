import mongo from '../server-middleware/mongo'

export default function() {
  this.nuxt.hook('render:setupMiddleware', async () => {
    await mongo.connect()
  })
}
