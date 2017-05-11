// Using beepboop-persist because this is a public GitHub repository. We're going to make calls to JIRA using
// a private userid/password. So the challenge is how do we get those at runtime (without checking in to GitHub)
// Solution: make a REST PUT call (outside of this source) to store the userid and password on BeepBoop persistence
// Then, when we use beepboop-persist to read the values, they'll already be set in our VM (and nobody on GitHub is the wiser ;-)

const BeepBoopPersist = require('beepboop-persist')
var kv = BeepBoopPersist({serialize: false}) // need to set this to false, otherwise, slapp persist will attempt to JSON.parse the uid in the kv.get call below

module.exports.getJiraUserid = function () {
  var jirauserid = ''
  // this works - the trick is to make sure the serialize option is false (above)
  kv.list('jirauserid', function (err, keys) {
    if (err) {
      console.log('ERROR: Cannot find jirauserid kv')
    }
    // console.log('found jirauserid - attempt to get value')
    if (!err && keys.length) {
      kv.get('jirauserid', function (err, val) {
        if (!err && val) {
          console.log('jirauserid found and set to ' + val)
          jirauserid = val
        } else {
          console.log('ERROR: jirauserid not found on the kv')
        }
      })
    }
  })
  return jirauserid
}
