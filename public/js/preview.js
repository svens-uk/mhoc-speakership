const textArea = document.getElementById('bill-text')
const previewArea = document.getElementById('preview')

function render(e) {
    if (textArea.value.length > 40000)
        textArea.classList.add('is-invalid')
    else
        textArea.classList.remove('is-invalid')
    previewArea.innerHTML = DOMPurify.sanitize(marked.parse(textArea.value))
}

textArea.oninput = render
window.onload = render
