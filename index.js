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
                    let links_avatar = ''
                    for (const user of users) {
                        links_avatar += `
                        <div class="nes-container with-title is-centered">
                        <p class="title">${user.login}</p>
                        <a target="_blank" href="${user.html_url}">${user.html_url}
                        <img src="${user.avatar_url}" style="width: 120px;"/>
                        </a>
                        </div>
                        `
                    }
                    githubresultado.innerHTML = `
                        <p>Encontrado ${countUsers} usuarios</p>
                        <p>Links para ver githubuser 
                        ${links_avatar}
                        </p>
                    `
                } catch (error) {
                    githubresultado.style = `display: block`
                    githubresultado.innerHTML = `
                        <p>Erro ao trazer githubuser</p>
                    `
                }
            } else {
                alert('There was a problem with the request.');
            }
        }
    };
    httpRequest.open('GET', `https://api.github.com/search/users?q=${pesquisa}`);
    httpRequest.send();
}