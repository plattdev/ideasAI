//Mirar si hay algun dato en localStorage sobre el tema (modo claro/oscuro)
const temaGuardado = localStorage.getItem('theme') //recuperamos el valor de la key: theme

if (temaGuardado === 'dark') {
    document.body.classList.add(temaGuardado)
}   

//Una manera de enviar datos a traves de un form get -> pasar parametros en la URL -> recogerlos en la pagina destino ChatGPT

// Obtener la idea del parametro de la URL. Es una clase (URLSearchParams) que está preparada para esto
const urlParams = new URLSearchParams(window.location.search);
const ideaId = urlParams.get('idea') //looking for 'idea' parameter written in the form in index.html as name="idea"

// Mostrar la idea en la página
if (ideaId) {
    const ideaElement = document.createElement('p')
    ideaElement.textContent = ideaId
    document.body.appendChild(ideaElement)
}

//Crear una constante con el prompt para la IA
const prompt = `Genera una idea creativa y original para un proyecto, con el siguiente tema: ${ideaId}. Proporciona una descripción breve y concisa`

//cuando le haga click en el boton chatgpt-btn, copiar en el portapapeles el prompt y abrir una nueva pestaña con la URL de chatgpt
const chatgptBtn = document.getElementById('chatgpt-btn')

chatgptBtn.addEventListener('click', () => {
    //copiar el prompt al portapapeles
    navigator.clipboard.writeText(prompt)
    //crear la URL de chatgpt con el prompt como parametro - ? accede a una parte de la URL que retiene posibles variables que esten navegando a traves de la URL, al ser get podremos recuperarlas. Prompt es una variable que contiene el texto que queremos pasar. encodeURIComponent sirve para codificar el texto y que no de errores en la URL, por ejemplo pasa %20 por un espacio en blanco
    const urls = [`https://chatgpt.com/?prompt=${encodeURIComponent(prompt)}`, `https://gemini.com/?prompt=${encodeURIComponent(prompt)}`, `https://claude.com/?prompt=${encodeURIComponent(prompt)}`, `https://deepseek.com/?prompt=${encodeURIComponent(prompt)}`, `https://qwen.com/?q=${encodeURIComponent(prompt)}`]
    window.open(urls[0], '_blank')
})
