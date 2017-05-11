const request = require('request')

module.exports.getIssue = function (jiraurl, jirau, jirap, issue) {
  return new Promise((resolve, reject) => {
    if (issue === undefined) {
      reject(new Error('ERROR: need to provide issue'))
    } else {
      const URL = jiraurl + '/rest/api/2/search?jql=key=' + issue + '&startAt=0&maxResults=15&fields=summary,assignee,status,priority,key,changelog&expand=changelog'
      console.log('fetching issue ' + issue)
      request(
        {
          url: URL,
          headers: {
            'Authorization': 'Basic ' + new Buffer(jirau + ':' + jirap).toString('base64')
          }
        },
        function (error, response, results) {
          if (error) {
            console.error('Error: ' + error)
          } else {
            // results is already json data
            var jiraData = JSON.parse(results)
            console.log('jiraData: ' + jiraData)
            // var changelog = jiraData.issues[0].changelog
            resolve({
              summary: jiraData.summary, assignee: jiraData.assignee
            })
          }
        }
      )
    }
  })
}

// console.log('Querying: ' + QUERY_STR)
// console.time('query')
// request(
//     {
//         url: URL,
//         headers: {
//             "Authorization": "Basic " + new Buffer(opt.username + ":" + opt.password).toString("base64")
//         }
//     },
//     function (error, response, results) {
//         // results is already json data
//         var jiraData = JSON.parse(results)
//         var changelog = jiraData.issues[0].changelog
//         console.timeEnd('query')
//     }
// )
