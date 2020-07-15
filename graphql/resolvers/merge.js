const Event = require('../../models/event')
const User = require('../../models/user')
const { dateToIsoString } = require('../../utils/date')


const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    return events.map(event => {
      return transformEvent(event)
    })
  } catch {
    throw error
  }
}

const user = async userID => {
  try {
    const user = await User.findById(userID)
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    }
  } catch (error) {
    throw error
  }
}

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId)
    return transformEvent(event)
  } catch (error) {
    throw error
  }
}

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToIsoString(event._doc.date),
    creator: user.bind(this, event.creator)
  }
}

const transformBooking = booking => {
  return {
    ...booking._doc, _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToIsoString(booking._doc.createdAt),
    updatedAt: dateToIsoString(booking._doc.updatedAt)
  }
}

exports.transformBooking = transformBooking
exports.transformEvent = transformEvent
// exports.user = user
// exports.singleEvent = singleEvent
// exports.events = events