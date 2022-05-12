const meta = document.getElementById("meta-atual")
const realizado = document.getElementById("realizado")
const resultado = document.getElementById("resultado")

function calcularMETA() {
    const intMETA = parseInt(meta.value)
    const intCommits = parseInt(realizado.value)
    // debugger

    const intResultado = intCommits - intMETA
    resultado.style = `display: block`
    resultado.innerText = `Para a meta ${intMETA} faltam ${intResultado}`
}