const request = require('request')

module.exports.getIssue = function (issue) {
  return new Promise((resolve, reject) => {
    if (issue === undefined) {
      reject(new Error("ERROR: need to provide issue"))
    } else {
      console.log('fetching issue '+issue)
      resolve({
        summary: 'summary goes here', assignee: 'assignee goes here'
      })
    }
  })
}

// const QUERY_STR = "key = " + issue
// const URL = opt.jiraurl + '/rest/api/2/search?jql=key='+issue+'&startAt=0&maxResults=15&fields=summary,key,changelog&expand=changelog'


// console.log('Querying: ' + QUERY_STR)
// console.time('query');
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
//         console.timeEnd('query');
//     }
// );