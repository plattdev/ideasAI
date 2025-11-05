//ID de los botones
const darkModeBtn = document.getElementById('dark-mode-btn')
const lightModeBtn = document.getElementById('light-mode-btn')

//si se pulsa darkmode-btn almacenas en localstorage el tipo de modo que el usuario quiere
lightModeBtn.addEventListener('click', function() {
    localStorage.setItem('theme', 'light') //key:theme, value: light
    document.body.classList.remove('dark-mode')
    document.body.classList.add('light-mode')
})

darkModeBtn.addEventListener('click', function() {
    localStorage.setItem('theme', 'dark') //key:theme value: dark
    document.body.classList.remove('light-mode')
    document.body.classList.add('dark-mode')
})

//Al cargar la pagina comprobamos si hay un modo guardado en localstorage - GUARDA LA PREFERENCIA DEL USUARIO
window.addEventListener('load', function() { //cuando se carga la pagina
    const temaGuardado = localStorage.getItem('theme') //recuperamos el valor de la key: theme
    if (temaGuardado == 'dark') { //si hay un tema guardado
        document.body.classList.remove('light-mode')
        document.body.classList.add('dark-mode')
    }
})





