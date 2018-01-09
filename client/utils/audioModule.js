class AudioModule {
  constructor($player, tracklist, path) {
    this.player = $player
    this.isContinuous = true
    this.isShuffled = false
    this.tracklist = tracklist
    this.shuffled = tracklist
    this.current = tracklist[0]
    this.index = 0
    this.path = path
    this.listener = $player.addEventListener('ended', () => this.isContinuous
      ? this.skipTrack()
      : false)

    this.skipTrack = this.skipTrack.bind(this)
    this.shuffleTracklist = this.shuffleTracklist.bind(this)
    console.log($player, tracklist)
  }
  skipTrack(isBackward) {
    if ((!isBackward && this.index === this.tracklist.length - 1) ||
      (isBackward && this.index === 0)) return
    const nextIndex = isBackward ? this.index - 1 : this.index + 1
    this.current = this.isShuffled ? this.shuffled[nextIndex] : this.tracklist[nextIndex]
    this.index = nextIndex

    this.player.pause()
    this.player.src = this.path + this.current.trackName.split(' ').join('-') + '.mp3'
    this.player.play()

    console.log(this)
  }
  shuffleTracklist() {
    const queued = this.tracklist.filter((track, index) => index !== this.index)
    this.shuffled = [this.current, ...shuffleArray(queued)]
    this.isShuffled = true
    console.log(this.tracklist, this.shuffled)
  }
}

function shuffleArray(array) {
  let shuffled = array.slice()
  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1))
    let temp = shuffled[i]
    shuffled[i] = shuffled[j]
    shuffled[j] = temp
  }
  return shuffled
}

module.exports = AudioModule