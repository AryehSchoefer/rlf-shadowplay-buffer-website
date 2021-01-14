const dropdowns = document.querySelector('.dropdown-content')
const dropdownBtn = document.querySelector('.dropbtn')
const submitBtn = document.querySelector('.submit-buffer')
const loadingElement = document.querySelector('#loading')

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

submitBtn.addEventListener('click', async () => {
	const bufferValue = dropdownBtn.textContent.split(' ')[0]
	if (bufferValue != 'Click') {
		loadingElement.style.display = 'block'
		submitBtn.style.display = 'none'

		const response = await fetch('/savebuffer', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ bufferValue }),
		})
		const data = await response.json()
		console.log(data)

		loadingElement.style.display = 'none'
		submitBtn.style.display = 'block'
	}
})

function activateDropdown() {
	dropdowns.classList.toggle('show')
}
