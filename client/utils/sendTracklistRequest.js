function sendTracklistPostRequest(tracklistWithData) {
  return fetch('/tracklist-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(tracklistWithData)
  })
}

module.exports = sendTracklistPostRequest
