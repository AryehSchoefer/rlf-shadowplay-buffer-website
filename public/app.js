const dropdowns = document.querySelector('.dropdown-content')
const dropdownBtn = document.querySelector('.dropbtn')
const submitBtn = document.querySelector('.submit-buffer')
const loadingElement = document.querySelector('#loading')
const recordingCheckbox = document.querySelector('.stop-recording')
const errorSection = document.querySelector('.error-container')
const successSection = document.querySelector('.success-container')

window.onclick = (event) => {
  if (!event.target.matches('.dropbtn')) {
    if (dropdowns.classList.contains('show')) {
      dropdowns.classList.remove('show')
    }
  }

  if (event.target.matches('span')) {
    dropdownBtn.textContent = event.target.textContent
  }
}

recordingCheckbox.addEventListener('click', () => {
  if (recordingCheckbox.checked == true) {
    submitBtn.textContent = 'Stop Recording'
  } else {
    submitBtn.textContent = 'Start Recording'
  }
})

submitBtn.addEventListener('click', async () => {
  errorSection.style.display = 'none'
  const bufferValue = dropdownBtn.textContent.split(' ')[0]
  const stopRecording = recordingCheckbox.checked
  const information = { bufferValue, stopRecording }
  if (bufferValue != 'Click') {
    loadingElement.style.display = 'block'
    submitBtn.style.display = 'none'

    const response = await fetch('/savebuffer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(information),
    })
    const data = await response.json()
    console.log(data)

    loadingElement.style.display = 'none'
    successSection.style.display = 'block'
    setTimeout(() => {
      successSection.style.display = 'none'
      submitBtn.style.display = 'block'
    }, 1000)
  } else {
    errorSection.style.display = 'block'
  }
})

function activateDropdown() {
  dropdowns.classList.toggle('show')
}
