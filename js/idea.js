//Mirar si hay algun dato en localStorage sobre el tema (modo claro/oscuro). EN CADA ARCHIVO JS HAY QUE PONER ESTE CODIGO PARA QUE FUNCIONE EL MODO OSCURO/CLARO
const temaGuardado = localStorage.getItem('theme') //recuperamos el valor de la key: theme

if (temaGuardado === "dark") {
    document.body.classList.remove("light-mode")
    document.body.classList.add("dark-mode")
}

//Una manera de enviar datos a traves de un form get -> pasar parametros en la URL -> recogerlos en la pagina destino ChatGPT

// Obtener la idea del parametro de la URL. Es una clase (URLSearchParams) que está preparada para esto. 
// window.location.search es una propiedad que devuelve la parte de la URL que comienza con el signo de interrogación (?), que es donde se encuentran los parámetros de consulta.
const urlParams = new URLSearchParams(window.location.search)
const idea = urlParams.get('idea') //looking for 'idea' que está en la URL de idea.html 

// Mostrar la idea en la página
if (idea) {
    const ideaElement = document.createElement('p')
    ideaElement.textContent = idea
    document.body.appendChild(ideaElement)
}

//Crear una constante con el prompt para la IA. Prompt es una variable que contiene el texto que queremos pasar. 
const prompt = `Genera una idea creativa y original para un proyecto, con el siguiente tema: ${idea}. Proporciona una descripción breve y concisa`

// Cuando se haga clic en el botón chatgpt-btn, copiar en el portapapeles el prompt, y abrir una pestaña nueva con la URL de chatgpt

//cuando le haga click en el boton chatgpt-btn, copiar en el portapapeles el prompt y abrir una nueva pestaña con la URL de chatgpt
const chatgptBtn = document.getElementById('chatgpt-btn')
const qwenBtn = document.getElementById('qwen-btn')
const claudeBtn = document.getElementById('claude-btn')

//crear la URL de chatgpt con el prompt como parametro - accede a una parte de la URL que retiene posibles variables que esten navegando a traves de la URL, al ser get podremos recuperarlas. 
//encodeURIComponent sirve para codificar el texto y que no de errores en la URL, por ejemplo pasa %20 por un espacio en blanco
const urls = [
    `https://chat.openai.com/?prompt=${encodeURIComponent(prompt)}`,
    `https://chat.qwen.ai/?q=${encodeURIComponent(prompt)}`,
    `https://claude.ai/?q=${encodeURIComponent(prompt)}`,
]


// Crear un Map para cada tipo de boton, que la key = chatGPT y el value = 0. El clickCounts está en memoria RAM. El mapa está asociado a clickcount. TENEMOS QUE RECUPERAR EL CONTADOR! //para que se nos guarden los clicks en los botones de la ultima parte del codigo . If local storage existe te voy a hacer esto, si no existe  (else :) te creo un objeto con los contadores a 0
const clickCounts = localStorage.getItem('Clics') ? JSON.parse(localStorage.getItem('Clics')) : {
    chatgpt: 0,
    qwen: 0,
    claude: 0
}
        
document.addEventListener('click', (event) => {
    //copiar el prompt al portapapeles
    navigator.clipboard.writeText(prompt)
    // if depende que quien haga click en el boton, abrir una URL u otra
    if (chatgptBtn.contains(event.target)) {
        window.open(urls[0], '_blank')
        clickCounts.chatgpt++
        //convertir a localStorage. 2 formas de hacerlo, la primera le parece mejor a TF, el segundo no se parece a un map, lo separa de uno en uno
        localStorage.setItem('Clics', JSON.stringify(clickCounts))
        //localStorage.setItem('Clics-chatgpt', clickCounts.chatgpt)

    } else if (qwenBtn.contains(event.target)) {
        window.open(urls[1], '_blank')
        clickCounts.qwen++
        localStorage.setItem('Clics', JSON.stringify(clickCounts))
        //localStorage.setItem('Clics-qwen', clickCounts.qwen)

    } else if (claudeBtn.contains(event.target)) {
        window.open(urls[2], '_blank')
        clickCounts.claude++
        localStorage.setItem('Clics', JSON.stringify(clickCounts))
        //localStorage.setItem('Clics-claude', clickCounts.claude)

        //si no se ha hecho click en ninguno de los botones anteriores, abrir las 3 URLs en pestañas nuevas
    } else {
        for (let i = 0; i < urls.length; i++) {
            window.open(urls[i], '_blank')
        }   
    }
})

//BLOB
//Descargar un archivo .txt con Blob que contenga los contadores de clicks de cada boton - el string pasa a Blob y luego a una URL enganchada a Blob, creamos una a, un link
function descargarClics() {
    const contenido = `Clics en chatGPT: ${clickCounts.chatgpt}\nClics en Qwen: ${clickCounts.qwen}\nClics en Claude: ${clickCounts.claude}`
    const blob = new Blob([contenido], { type: 'text/plain' }) //clase interna Blob que crea un archivo en memoria
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'clics.txt'
    document.body.appendChild(link)
    link.click() //simula el click en el link, porque la URL no existe, para poder descargar el archivo
    document.body.removeChild(link)
    URL.revokeObjectURL(url) //liberar memoria de la URL en memoria que hemos creado
}

//Llamar a la funcion descargarClics al cerrar la pestaña o recargar la página
window.addEventListener('beforeunload', descargarClics) //tambien serviría load en vez de beforeunload //beforeunload es un evento que se dispara antes de que la pagina se descargue, llamar a la función descargarClics,

//para que haya un boton para descargar clics
//const todo = document.getElementById('todoBlob').addEventListener('click', (descargarClics))

