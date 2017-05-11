// Using beepboop-persist because this is a public GitHub repository. We're going to make calls to JIRA using
// a private userid/password. So the challenge is how do we get those at runtime (without checking in to GitHub)
// Solution: make a REST PUT call (outside of this source) to store the userid and password on BeepBoop persistence
// Then, when we use beepboop-persist to read the values, they'll already be set in our VM (and nobody on GitHub is the wiser ;-)

const BeepBoopPersist = require('beepboop-persist')
var kv = BeepBoopPersist({serialize: false}) // need to set this to false, otherwise, slapp persist will attempt to JSON.parse the uid in the kv.get call below

// const getContent = function(url) {
//   // return new pending promise
//   return new Promise((resolve, reject) => {
//     // select http or https module, depending on reqested url
//     const lib = url.startsWith('https') ? require('https') : require('http')
//     const request = lib.get(url, (response) => {
//       // handle http errors
//       if (response.statusCode < 200 || response.statusCode > 299) {
//          reject(new Error('Failed to load page, status code: ' + response.statusCode))
//        }
//       // temporary data holder
//       const body = []
//       // on every content chunk, push it to the data array
//       response.on('data', (chunk) => body.push(chunk))
//       // we are done, resolve promise with those joined chunks
//       response.on('end', () => resolve(body.join('')))
//     })
//     // handle connection errors of the request
//     request.on('error', (err) => reject(err))
//     })
// }

module.exports.getJiraU = function () {
  // return new pending promise
  return new Promise((resolve, reject) => {
    // this works - the trick is to make sure the serialize option is false (above)
    kv.get('jirau', function (err, val) {
      if (!err && val) {
        console.log('jirau found and set to ' + val)
        const jirau = val
        kv.get('jirap', function (err, val) {
          if (!err && val) {
            console.log('jirap found and set to ' + val)
            const jirap = val
            resolve({
              jirau: jirau, jirap: jirap
            })
          } else {
            reject(new Error('ERROR: jirap not found on the kv'))
          }
        })
      } else {
        reject(new Error('ERROR: jirap not found on the kv'))
      }
    })
  })
}

// module.exports.getJiraP = function () {
//   var jirap = ''
//   // this works - the trick is to make sure the serialize option is false (above)
//   kv.list('jirap', function (err, keys) {
//     if (err) {
//       console.log('ERROR: Cannot find jirap kv')
//     }
//     if (!err && keys.length) {
//       kv.get('jirap', function (err, val) {
//         if (!err && val) {
//           console.log('jirap found and set to ' + val)
//           jirap = val
//         } else {
//           console.log('ERROR: jirap not found on the kv')
//         }
//         return jirap
//       })
//     }
//   })
// }
