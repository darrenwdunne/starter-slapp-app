// Using beepboop-persist because this is a public GitHub repository. We're going to make calls to JIRA using
// a private userid/password. So the challenge is how do we get those at runtime (without checking in to GitHub)
// Solution: make a REST PUT call (outside of this source) to store the userid and password on BeepBoop persistence
// Then, when we use beepboop-persist to read the values, they'll already be set in our VM (and nobody on GitHub is the wiser ;-)

const BeepBoopPersist = require('beepboop-persist')
var kv = BeepBoopPersist({serialize: false}) // need to set this to false, otherwise, slapp persist will attempt to JSON.parse the uid in the kv.get call below

module.exports.getJiraU = function () {
  var jirau = ''
  // this works - the trick is to make sure the serialize option is false (above)
  kv.list('jirau', function (err, keys) {
    if (err) {
      console.log('ERROR: Cannot find jirau kv')
    }
    if (!err && keys.length) {
      kv.get('jirau', function (err, val) {
        if (!err && val) {
          console.log('jirau found and set to ' + val)
          jirau = val
        } else {
          console.log('ERROR: jirau not found on the kv')
        }
      })
    }
    return jirau
  })
}

module.exports.getJiraP = function () {
  var jirap = ''
  // this works - the trick is to make sure the serialize option is false (above)
  kv.list('jirap', function (err, keys) {
    if (err) {
      console.log('ERROR: Cannot find jirap kv')
    }
    if (!err && keys.length) {
      kv.get('jirap', function (err, val) {
        if (!err && val) {
          console.log('jirap found and set to ' + val)
          jirap = val
        } else {
          console.log('ERROR: jirap not found on the kv')
        }
      })
    }
    return jirap
  })
}
