function resetTracklist() {
  const $trackFormContainer = document.getElementById('track-form-container')
  let resetIndex = 1
  let $trackForm = document.querySelector('.track-form-' + resetIndex)
  while ($trackForm) {
    $trackFormContainer.removeChild($trackForm)
    resetIndex++
    $trackForm = document.querySelector('.track-form-' + resetIndex)
  }
}

module.exports = resetTracklist