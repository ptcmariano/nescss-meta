const meta = document.getElementById("meta-atual")
const realizado = document.getElementById("realizado")
const resultado = document.getElementById("resultado")

function calcularMETA() {
    const intMETA = parseInt(meta.value)
    const intCommits = parseInt(realizado.value)
    // debugger

    const intDiff = (intCommits - intMETA) * -1
    const dateHoje = new Date()
    const dateLastDay = new Date(dateHoje.getFullYear(), dateHoje.getMonth()+1, 0)
    const intDiffDays = dateLastDay.getDate() - dateHoje.getDate()
    const intResultado = (intMETA - intCommits)
    resultado.style = `display: block`
    resultado.innerHTML = `
        <p>Para a meta ${intMETA} faltam ${intResultado} commits</p>
        <p>Por dia precisam ser feitos ${intResultado/intDiffDays}</p>
    `
}