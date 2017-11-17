const minutes = 60 * 1000
const timeLimit = 20 * minutes

function populateQueue(active) {
  return active.then(dirInfo => {
    const queue = {}
    dirInfo.forEach(dir => {
      const entry = {}
      entry.expiration = Date.now() + timeLimit
      entry.dl = Promise.resolve(true)
      queue[dir.fileName] = entry
    })
    return queue
  })
}

module.exports = populateQueue