$('#cep').mask('00000-000');

const buscar = document.getElementById('buscar')
const span = document.getElementById('span-validacao')
const tabela = document.getElementById('tabela')

buscar.addEventListener('click', (e) => {
    e.preventDefault()

    let input = document.getElementById('cep').value
    let valorInput = input.replace(/\D/g, '');
    let validacep = /^[0-9]{8}$/;

    if (validacep.test(valorInput)) {
        const ajax = new XMLHttpRequest();
        ajax.open('GET', 'https://viacep.com.br/ws/' + valorInput + '/json/');
        ajax.send();

        ajax.onload = function () {

            let cep = JSON.parse(this.responseText);

            if (cep.erro != true) {
                tabela.style.display = 'inline'

                if (cep.logradouro == '') {
                    cep.logradouro = '-'
                }
                if (cep.complemento == '') {
                    cep.complemento = '-'
                }
                if (cep.bairro == '') {
                    cep.bairro = '-'
                }

                valores = [cep.cep, cep.logradouro, cep.complemento, cep.bairro, cep.localidade, cep.uf, cep.ddd]
                let dados = document.getElementsByClassName('dados')
                for (let i = 0; i < 7; i++) {
                    dados[i].textContent = valores[i];
                    console.log(valores[i]);
                }
            } else {
                setErro()
            }
        }
    } else {
        setErro()
    }
})

let input = document.getElementById('cep')
input.addEventListener('focus', ()=>{
    removeErro()
})

function removeErro() {
    span.style.display = 'none'
}

function setErro() {
    span.style.display = 'flex'
    tabela.style.display = 'none'
}
