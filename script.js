document.addEventListener('DOMContentLoaded', function() {
    adicionarAcaoRemover(); // Chama a função para adicionar ação aos botões de remover
});

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obter os valores dos campos
    var placa = document.getElementById('placa').value;
    var proprietario = document.getElementById('proprietario').value;
    var apartamento = document.getElementById('apartamento').value;
    var bloco = document.getElementById('bloco').value;
    var modelo = document.getElementById('modelo').value;
    var cor = document.getElementById('cor').value;
    var vaga = document.getElementById('vaga').value;

    // Exibir no console os valores
    console.log("Placa: " + placa);
    console.log("Proprietário: " + proprietario);
    console.log("Apartamento: " + apartamento);
    console.log("Bloco: " + bloco);
    console.log("Modelo: " + modelo);
    console.log("Cor: " + cor);
    console.log("Vaga: " + vaga);

    // Exibir mensagem de sucesso
    alert("Cadastro realizado com sucesso!");

    // Redirecionar para a tela de listar vagas após 1 segundo
    setTimeout(function() {
        window.location.href = "vagas.html";
    }, 1000);
});

// Função para adicionar ação aos botões de remover
function adicionarAcaoRemover() {
    var btnsRemover = document.querySelectorAll('.removerBtn');
    btnsRemover.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.parentNode.parentNode; // Obtém a linha atual
            row.remove(); // Remove a linha
        });
    });
}

