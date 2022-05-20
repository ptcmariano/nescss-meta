const meta = document.getElementById("meta-atual")
const realizado = document.getElementById("realizado")
const resultado = document.getElementById("resultado")

function calcularMETA() {
    const intMETA = parseInt(meta.value)
    const intCommits = parseInt(realizado.value)
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

function pesquisaUsuarioGithub() {
    const pesquisa = document.getElementById("usergithub").value
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                const githubresultado = document.getElementById("githubresultado")
                let users = []
                let countUsers = 0;
                try {
                    users = JSON.parse(httpRequest.response).items
                    countUsers = JSON.parse(httpRequest.response).total_count
                    githubresultado.style = `display: block`
                    githubresultado.innerHTML = `
                        <p>Encontrado ${countUsers} usuarios</p>
                        <p>Link para ver githubuser 
                        <a target="_blank" href="${users[countUsers-1].html_url}">${users[countUsers-1].html_url}</a>
                        <img src="${users[countUsers-1].avatar_url}" style="width: 120px;"/>
                        </p>
                    `
                } catch (error) {
                    githubresultado.style = `display: block`
                    githubresultado.innerHTML = `
                        <p>Erro ao trazer githubuser</p>
                    `
                }
                console.log(countUsers);
                console.log(users);
            } else {
                alert('There was a problem with the request.');
            }
        }
    };
    httpRequest.open('GET', `https://api.github.com/search/users?q=${pesquisa}`);
    httpRequest.send();
}