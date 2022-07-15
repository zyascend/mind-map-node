const { BroadcastChannel } = require('broadcast-channel')

module.exports = {
  setCodeStatus: () => new BroadcastChannel('setCodeStatus'),
}
