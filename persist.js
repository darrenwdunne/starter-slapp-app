// Using beepboop-persist because this is a public GitHub repository. We're going to make calls to JIRA using
// a private userid/password. So the challenge is how do we get those at runtime (without checking in to GitHub)
// Solution: make a REST PUT call (outside of this source) to store the userid and password on BeepBoop persistence
// Then, when we use beepboop-persist to read the values, they'll already be set in our VM (and nobody on GitHub is the wiser ;-)

const BeepBoopPersist = require('beepboop-persist')
var kv = BeepBoopPersist({serialize: false}) // need to set this to false, otherwise, slapp persist will attempt to JSON.parse the uid in the kv.get call below

module.exports.getCreds = function () {
  return new Promise((resolve, reject) => {
    // this works - the trick is to make sure the serialize option is false (above)
    kv.get('jirau', function (err, val) {
      if (!err && val) {
        // console.log('jirau found and set to ' + val)
        const jirau = val
        kv.get('jirap', function (err, val) {
          if (!err && val) {
            // console.log('jirap found and set to ' + val)
            const jirap = val
            kv.get('jiraurl', function (err, val) {
              if (!err && val) {
                // console.log('jiraurl found and set to ' + val)
                const jiraurl = val
                resolve({
                  jirau: jirau, jirap: jirap, jiraurl: jiraurl
                })
              } else {
                reject(new Error('ERROR: jiraurl not found on the kv'))
              }
            })
          } else {
            reject(new Error('ERROR: jirap not found on the kv'))
          }
        })
      } else {
        reject(new Error('ERROR: jirau not found on the kv'))
      }
    })
  })
}

