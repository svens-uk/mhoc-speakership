const textArea = document.getElementById('bill-text')
const previewArea = document.getElementById('preview')
const formatText = document.getElementById('format-text')

const templateValues = {
    bill_title: 'bill-title',
    bill_text: 'bill-text',
    closing_date: 'closing-date',
    timezone: 'timezone',
    amendment_text: 'amendment-text',
    opening_speech: 'opening-speech'
}

function render(e) {
    let progress = formatText.value

    for (let template of Object.keys(templateValues)) {
        const target = document.getElementById(templateValues[template])

        if (!target) {
            progress = progress.replace(`{{ ${template} }}`, '')
            continue
        }

        progress = progress.replace(`{{ ${template} }}`, target.value ?? '')
    }

    if (progress.length > 40000)
        textArea.classList.add('is-invalid')
    else
        textArea.classList.remove('is-invalid')
    previewArea.innerHTML = DOMPurify.sanitize(marked.parse(progress))
}

for (let template of Object.keys(templateValues)) {
    const target = document.getElementById(templateValues[template])

    if (!target) continue

    target.oninput = render
}

document.getElementById('disable-post').addEventListener('change', e => {
    const el = document.getElementById('disable-post')
    if (el.checked)
        el.classList.add('is-invalid')
    else
        el.classList.remove('is-invalid')
})

window.onload = render
