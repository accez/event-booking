const userResolver = require('./user')
const bookingResolver = require('./booking')
const eventsResolver = require('./events')

const rootResolver = {
  ...userResolver,
  ...bookingResolver,
  ...eventsResolver
}

module.exports = rootResolver