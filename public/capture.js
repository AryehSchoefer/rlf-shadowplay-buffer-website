const loadingElement = document.querySelector('#loading')
const submitBtn = document.querySelector('#capture')

submitBtn.addEventListener('click', async () => {
  loadingElement.style.display = 'block'
  submitBtn.style.display = 'none'

  const response = await fetch('/savecapture', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ captureValue: true }),
  })

  const data = await response.json()
  console.log(data)

  setTimeout(() => {
    loadingElement.style.display = 'none'
    submitBtn.style.display = 'block'
  }, 1000)
})
