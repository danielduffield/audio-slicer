const ffmpeg = require('fluent-ffmpeg')
const path = require('path')

const trackPromises = []

function sliceTrack(track, keyData) {
  const duration = calculateDuration(track)
  const fileName = parseTrackName(track)
  console.log('Duration: ', duration)
  console.log('Track start: ', track.trackStart)

  return new Promise((resolve, reject) => {
    ffmpeg(path.join(__dirname, '/../downloaded/' + keyData.videoId + '/album/' + keyData.videoId + '-album.mp3'))
      .setStartTime(track.trackStart)
      .setDuration(duration)
      .output(path.join(__dirname, '/../downloaded/' + keyData.videoId + '/tracks/' + fileName + '.mp3'))
      .on('end', function (err, data) {
        if (!err) {
          console.log('conversion Done')
          resolve()
        }
      })
      .on('error', function (err) {
        console.log(new Error(err))
        reject(err)
      }).run()
  })
}

function sliceTracklist(tracklist, keyData) {
  tracklist.forEach(track => {
    trackPromises.push(sliceTrack(track, keyData))
  })
  return trackPromises
}

function calculateDuration(track) {
  const parsedStart = parseTime(track.trackStart)
  const parsedEnd = parseTime(track.trackEnd)
  const parsedDuration = {}

  parsedDuration.hours = parsedEnd.hours - parsedStart.hours

  parsedDuration.minutes = parsedEnd.minutes - parsedStart.minutes

  parsedDuration.seconds = parsedEnd.seconds - parsedStart.seconds
  if (parsedDuration.seconds < 0) {
    parsedDuration.seconds += 60
    parsedDuration.minutes--
  }

  const duration = (parsedDuration.hours * 3600) + (parsedDuration.minutes * 60) + parsedDuration.seconds
  return duration
}

function parseTime(time) {
  const timeUnits = ['hours', 'minutes', 'seconds']
  const parsedTime = {}
  const split = time.split(':')
  split.forEach((division, index) => {
    parsedTime[timeUnits[index]] = parseInt(division, 10)
  })
  return parsedTime
}

function parseTrackName(track) {
  const parsedName = track.trackName.split(' ').join('-')
  return parsedName
}

module.exports = sliceTracklist
