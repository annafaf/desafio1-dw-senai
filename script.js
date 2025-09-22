// =============================================================================
// SISTEMA DE CONTROLE DE ESTACIONAMENTO - CONDOMÍNIO UNISENAI
// Arquivo: script.js
// Funcionalidades: LocalStorage, Validações, CRUD completo
// =============================================================================

// ============================= CONSTANTES ==================================
const STORAGE_KEYS = {
    VAGAS_ESTATICAS: 'estacionamento_vagas_estaticas',
    RESERVAS: 'estacionamento_reservas'
};

const TOTAL_VAGAS = 50; // Total de vagas do estacionamento

// ============================= INICIALIZAÇÃO ===============================
document.addEventListener('DOMContentLoaded', function() {
    inicializarSistema();
    configurarEventListeners();
});

// ============================= FUNÇÕES DE INICIALIZAÇÃO ===================
function inicializarSistema() {
    // Criar vagas estáticas se não existirem
    if (!localStorage.getItem(STORAGE_KEYS.VAGAS_ESTATICAS)) {
        criarVagasEstaticas();
    }
    
    // Inicializar reservas se não existirem
    if (!localStorage.getItem(STORAGE_KEYS.RESERVAS)) {
        localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify([]));
    }
    
    console.log('🚗 Sistema de Estacionamento inicializado');
    console.log(`📊 Total de vagas: ${TOTAL_VAGAS}`);
    console.log(`📅 Data de inicialização: ${new Date().toLocaleString('pt-BR')}`);
}

function criarVagasEstaticas() {
    const vagas = [];
    const blocos = ['A', 'B', 'C', 'D'];
    const tiposVaga = ['Normal', 'Idoso', 'Deficiente'];
    
    for (let i = 1; i <= TOTAL_VAGAS; i++) {
        vagas.push({
            numero: i,
            bloco: blocos[Math.floor((i - 1) / (TOTAL_VAGAS / blocos.length))],
            tipo: i <= 5 ? 'Deficiente' : (i <= 10 ? 'Idoso' : 'Normal'),
            localizacao: `Subsolo ${Math.floor((i - 1) / 25) + 1}`
        });
    }
    
    localStorage.setItem(STORAGE_KEYS.VAGAS_ESTATICAS, JSON.stringify(vagas));
    console.log(`✅ ${vagas.length} vagas estáticas criadas`);
}

// ============================= EVENT LISTENERS =============================
function configurarEventListeners() {
    // Formulário de cadastro
    const cadastroForm = document.getElementById('cadastroForm');
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', handleCadastroSubmit);
    }
    
    // Listener para mudanças em tempo real
    document.addEventListener('input', function(e) {
        if (e.target.type === 'text' || e.target.tagName === 'SELECT') {
            validarCampoTempo(e.target);
        }
    });
    
    // Pré-selecionar vaga se vier da URL
    const urlParams = new URLSearchParams(window.location.search);
    const vagaPreSelecionada = urlParams.get('vaga');
    if (vagaPreSelecionada) {
        setTimeout(() => {
            const selectVaga = document.getElementById('vaga');
            if (selectVaga) {
                selectVaga.value = vagaPreSelecionada;
            }
        }, 500);
    }
}

// ============================= VALIDAÇÕES ==================================
function validarCampoTempo(campo) {
    campo.classList.remove('valid', 'invalid');
    
    if (campo.value.trim()) {
        if (validarCampoIndividual(campo)) {
            campo.classList.add('valid');
        } else {
            campo.classList.add('invalid');
        }
    }
}

function validarCampoIndividual(campo) {
    switch (campo.id) {
        case 'placa':
            return validarPlaca(campo.value);
        case 'proprietario':
            return campo.value.trim().length >= 3;
        case 'apartamento':
            return /^\d+[a-zA-Z]?$/.test(campo.value.trim());
        case 'modelo':
            return campo.value.trim().length >= 3;
        case 'cor':
            return campo.value.trim().length >= 3;
        default:
            return campo.value.trim() !== '';
    }
}

function validarPlaca(placa) {
    // Formatos aceitos: ABC1234 ou ABC1A23
    const regexAntiga = /^[A-Z]{3}\d{4}$/;
    const regexMercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    const placaLimpa = placa.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    return regexAntiga.test(placaLimpa) || regexMercosul.test(placaLimpa);
}

function validarFormulario() {
    const campos = ['placa', 'proprietario', 'apartamento', 'bloco', 'modelo', 'cor', 'vaga'];
    const erros = [];
    
    campos.forEach(campo => {
        const elemento = document.getElementById(campo);
        if (!elemento || !elemento.value.trim()) {
            erros.push(`${elemento ? elemento.previousElementSibling.textContent.replace('*', '').trim() : campo} é obrigatório`);
        } else if (!validarCampoIndividual(elemento)) {
            erros.push(`${elemento.previousElementSibling.textContent.replace('*', '').trim()} inválido`);
        }
    });
    
    // Validar se a vaga está disponível
    const vagaSelecionada = document.getElementById('vaga').value;
    if (vagaSelecionada && !isVagaDisponivel(parseInt(vagaSelecionada))) {
        erros.push('A vaga selecionada não está mais disponível');
    }
    
    // Validar se já existe veículo com a mesma placa
    const placa = document.getElementById('placa').value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (existeVeiculoComPlaca(placa)) {
        erros.push('Já existe um veículo cadastrado com esta placa');
    }
    
    return erros;
}

// ============================= CRUD - RESERVAS =============================
function handleCadastroSubmit(event) {
    event.preventDefault();
    
    console.log('📝 Iniciando processo de cadastro...');
    
    // Validar formulário
    const erros = validarFormulario();
    if (erros.length > 0) {
        alert('❌ Erros encontrados:\n\n' + erros.join('\n'));
        return;
    }
    
    // Coletar dados do formulário
    const dadosReserva = coletarDadosFormulario();
    
    // Exibir dados no console (conforme requisito)
    console.log('=== DADOS DA RESERVA ===');
    console.log('Placa:', dadosReserva.placa);
    console.log('Proprietário:', dadosReserva.proprietario);
    console.log('Apartamento:', dadosReserva.apartamento);
    console.log('Bloco:', dadosReserva.bloco);
    console.log('Modelo:', dadosReserva.modelo);
    console.log('Cor:', dadosReserva.cor);
    console.log('Vaga:', dadosReserva.vaga);
    console.log('Data:', dadosReserva.dataHora);
    console.log('=======================');
    
    // Salvar no LocalStorage
    salvarReserva(dadosReserva);
    
    // Exibir mensagem de sucesso (conforme requisito)
    alert('✅ Cadastro realizado com sucesso!\n\n' + 
          `Veículo: ${dadosReserva.modelo} (${dadosReserva.placa})\n` +
          `Proprietário: ${dadosReserva.proprietario}\n` +
          `Vaga: ${dadosReserva.vaga} - Bloco ${dadosReserva.bloco}`);
    
    // Redirecionar para vagas ocupadas após 1 segundo
    setTimeout(function() {
        window.location.href = 'vagas-ocupadas.html';
    }, 1000);
}

function coletarDadosFormulario() {
    return {
        id: Date.now(), // ID único baseado em timestamp
        placa: document.getElementById('placa').value.toUpperCase().replace(/[^A-Z0-9]/g, ''),
        proprietario: document.getElementById('proprietario').value.trim(),
        apartamento: document.getElementById('apartamento').value.trim(),
        bloco: document.getElementById('bloco').value,
        modelo: document.getElementById('modelo').value.trim(),
        cor: document.getElementById('cor').value.trim(),
        vaga: parseInt(document.getElementById('vaga').value),
        dataHora: new Date().toISOString()
    };
}

function salvarReserva(reserva) {
    try {
        const reservas = getReservas();
        reservas.push(reserva);
        localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservas));
        console.log('💾 Reserva salva no LocalStorage:', reserva);
        return true;
    } catch (error) {
        console.error('❌ Erro ao salvar reserva:', error);
        alert('Erro ao salvar dados. Tente novamente.');
        return false;
    }
}

function removerReserva(id) {
    const reservas = getReservas();
    const reservasFiltradas = reservas.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESERVAS, JSON.stringify(reservasFiltradas));
    console.log('🗑️ Reserva removida:', id);
}

function getReservas() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESERVAS)) || [];
    } catch (error) {
        console.error('❌ Erro ao carregar reservas:', error);
        return [];
    }
}

function getVagasEstaticas() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.VAGAS_ESTATICAS)) || [];
    } catch (error) {
        console.error('❌ Erro ao carregar vagas estáticas:', error);
        return [];
    }
}

// ============================= FUNÇÕES AUXILIARES =========================
function existeVeiculoComPlaca(placa) {
    const reservas = getReservas();
    return reservas.some(r => r.placa === placa);
}

function isVagaDisponivel(numeroVaga) {
    const reservas = getReservas();
    return !reservas.some(r => r.vaga === numeroVaga);
}

function getVagasDisponiveis() {
    const todasVagas = getVagasEstaticas();
    const reservas = getReservas();
    const vagasOcupadas = reservas.map(r => r.vaga);
    
    return todasVagas.filter(vaga => !vagasOcupadas.includes(vaga.numero));
}

function getVagasOcupadas() {
    const reservas = getReservas();
    const vagasEstaticas = getVagasEstaticas();
    
    return reservas.map(reserva => {
        const vagaEstatica = vagasEstaticas.find(v => v.numero === reserva.vaga);
        return {
            ...reserva,
            vagaInfo: vagaEstatica
        };
    });
}

// ============================= INTERFACE - VAGAS DISPONÍVEIS ==============
function carregarVagasDisponiveis() {
    const selectVaga = document.getElementById('vaga');
    const gridVagas = document.getElementById('visualizacaoGrid');
    const tableVagas = document.getElementById('vagasDisponiveisTable');
    
    const vagasDisponiveis = getVagasDisponiveis();
    
    // Carregar no select (página de cadastro)
    if (selectVaga) {
        selectVaga.innerHTML = '<option value="">Selecione uma vaga disponível</option>';
        vagasDisponiveis.forEach(vaga => {
            const option = document.createElement('option');
            option.value = vaga.numero;
            option.textContent = `Vaga ${vaga.numero} - Bloco ${vaga.bloco} (${vaga.tipo})`;
            selectVaga.appendChild(option);
        });
    }
    
    // Carregar na grade (página de vagas disponíveis)
    if (gridVagas && modoVisualizacao === 'grid') {
        gridVagas.innerHTML = '';
        vagasDisponiveis.forEach(vaga => {
            const card = criarCardVaga(vaga, true);
            gridVagas.appendChild(card);
        });
        
        // Mostrar/ocultar mensagem vazia
        const mensagem = document.getElementById('mensagemSemVagas');
        if (mensagem) {
            mensagem.style.display = vagasDisponiveis.length === 0 ? 'block' : 'none';
        }
    }
    
    // Carregar na tabela (página de vagas disponíveis - modo lista)
    if (tableVagas && modoVisualizacao === 'list') {
        const tbody = tableVagas.querySelector('tbody');
        tbody.innerHTML = '';
        vagasDisponiveis.forEach(vaga => {
            const row = criarLinhaVagaDisponivel(vaga);
            tbody.appendChild(row);
        });
    }
}

function criarCardVaga(vaga, isDisponivel) {
    const card = document.createElement('div');
    card.className = `vaga-card ${isDisponivel ? 'disponivel' : 'ocupada'}`;
    
    card.innerHTML = `
        <div class="vaga-numero">🅿️ ${vaga.numero}</div>
        <div><strong>Bloco ${vaga.bloco}</strong></div>
        <div>${vaga.tipo}</div>
        <div><small>${vaga.localizacao}</small></div>
        <div class="vaga-status ${isDisponivel ? 'status-disponivel' : 'status-ocupada'}">
            ${isDisponivel ? '✅ Disponível' : '🚗 Ocupada'}
        </div>
        ${isDisponivel ? `<button onclick="reservarVaga(${vaga.numero})" class="btn-success" style="margin-top: 1rem;">Reservar</button>` : ''}
    `;
    
    return card;
}

function criarLinhaVagaDisponivel(vaga) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><strong>🅿️ ${vaga.numero}</strong></td>
        <td>🏢 ${vaga.bloco}</td>
        <td>${vaga.tipo}</td>
        <td>${vaga.localizacao}</td>
        <td>
            <button onclick="reservarVaga(${vaga.numero})" class="btn-success">
                📝 Reservar
            </button>
        </td>
    `;
    return row;
}

// ============================= INTERFACE - VAGAS OCUPADAS =================
function carregarVagasOcupadas() {
    const table = document.getElementById('vagasOcupadasTable');
    if (!table) return;
    
    const tbody = table.querySelector('tbody');
    const vagasOcupadas = getVagasOcupadas();
    
    tbody.innerHTML = '';
    
    if (vagasOcupadas.length === 0) {
        document.getElementById('mensagemVazia').style.display = 'block';
        table.style.display = 'none';
        return;
    }
    
    document.getElementById('mensagemVazia').style.display = 'none';
    table.style.display = 'table';
    
    vagasOcupadas.forEach(reserva => {
        const row = criarLinhaVagaOcupada(reserva);
        tbody.appendChild(row);
    });
}

function criarLinhaVagaOcupada(reserva) {
    const row = document.createElement('tr');
    const dataFormatada = new Date(reserva.dataHora).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    row.innerHTML = `
        <td><strong>${reserva.placa}</strong></td>
        <td>${reserva.proprietario}</td>
        <td>${reserva.apartamento}</td>
        <td>${reserva.bloco}</td>
        <td>${reserva.modelo}</td>
        <td>${reserva.cor}</td>
        <td><strong>🅿️ ${reserva.vaga}</strong></td>
        <td><small>${dataFormatada}</small></td>
        <td>
            <button onclick="confirmarRemocao(${reserva.id}, '${reserva.placa}')" class="btn-danger">
                🗑️ Remover
            </button>
        </td>
    `;
    return row;
}

function confirmarRemocao(id, placa) {
    if (confirm(`Tem certeza que deseja remover a reserva do veículo ${placa}?\n\nEsta ação não pode ser desfeita.`)) {
        removerReserva(id);
        carregarVagasOcupadas();
        atualizarResumoOcupadas();
        alert('✅ Reserva removida com sucesso!');
        
        // Atualizar outras telas se estiverem abertas
        if (typeof carregarVagasDisponiveis === 'function') {
            carregarVagasDisponiveis();
        }
    }
}

// ============================= RESUMOS E ESTATÍSTICAS =====================
function atualizarStatusVagas() {
    const elemento = document.getElementById('statusVagas');
    if (!elemento) return;
    
    const totalVagas = TOTAL_VAGAS;
    const vagasOcupadas = getReservas().length;
    const vagasDisponiveis = totalVagas - vagasOcupadas;
    const percentualOcupacao = ((vagasOcupadas / totalVagas) * 100).toFixed(1);
    
    elemento.innerHTML = `
        <div class="status-item">
            <span>🏢 Total de Vagas:</span>
            <span class="status-value">${totalVagas}</span>
        </div>
        <div class="status-item">
            <span>🚗 Vagas Ocupadas:</span>
            <span class="status-value" style="color: var(--danger-color);">${vagasOcupadas}</span>
        </div>
        <div class="status-item">
            <span>✅ Vagas Disponíveis:</span>
            <span class="status-value" style="color: var(--success-color);">${vagasDisponiveis}</span>
        </div>
        <div class="status-item">
            <span>📊 Ocupação:</span>
            <span class="status-value">${percentualOcupacao}%</span>
        </div>
    `;
}

function atualizarResumoOcupadas() {
    const elemento = document.getElementById('resumoOcupadas');
    if (!elemento) return;
    
    const reservas = getReservas();
    const blocoA = reservas.filter(r => r.bloco === 'A').length;
    const blocoB = reservas.filter(r => r.bloco === 'B').length;
    const blocoC = reservas.filter(r => r.bloco === 'C').length;
    const blocoD = reservas.filter(r => r.bloco === 'D').length;
    
    elemento.innerHTML = `
        <div class="status-item">
            <span>🚗 Total Ocupadas:</span>
            <span class="status-value">${reservas.length}</span>
        </div>
        <div class="status-item">
            <span>🏢 Bloco A:</span>
            <span class="status-value">${blocoA}</span>
        </div>
        <div class="status-item">
            <span>🏢 Bloco B:</span>
            <span class="status-value">${blocoB}</span>
        </div>
        <div class="status-item">
            <span>🏢 Bloco C:</span>
            <span class="status-value">${blocoC}</span>
        </div>
        <div class="status-item">
            <span>🏢 Bloco D:</span>
            <span class="status-value">${blocoD}</span>
        </div>
    `;
}

function atualizarResumoDisponiveis() {
    const elemento = document.getElementById('resumoDisponiveis');
    if (!elemento) return;
    
    const vagasDisponiveis = getVagasDisponiveis();
    const totalDisponivel = vagasDisponiveis.length;
    const normais = vagasDisponiveis.filter(v => v.tipo === 'Normal').length;
    const idosos = vagasDisponiveis.filter(v => v.tipo === 'Idoso').length;
    const deficientes = vagasDisponiveis.filter(v => v.tipo === 'Deficiente').length;
    
    elemento.innerHTML = `
        <div class="status-item">
            <span>✅ Total Disponíveis:</span>
            <span class="status-value" style="color: var(--success-color);">${totalDisponivel}</span>
        </div>
        <div class="status-item">
            <span>🚗 Normais:</span>
            <span class="status-value">${normais}</span>
        </div>
        <div class="status-item">
            <span>👴 Idosos:</span>
            <span class="status-value">${idosos}</span>
        </div>
        <div class="status-item">
            <span>♿ Deficientes:</span>
            <span class="status-value">${deficientes}</span>
        </div>
        <div class="status-item">
            <span>📊 Taxa Disponível:</span>
            <span class="status-value">${((totalDisponivel / TOTAL_VAGAS) * 100).toFixed(1)}%</span>
        </div>
    `;
}

// ============================= FUNÇÕES GLOBAIS ============================
// Estas funções são chamadas pelos arquivos HTML

function reservarVaga(numeroVaga) {
    window.location.href = `cadastro.html?vaga=${numeroVaga}`;
}

// ============================= LOG FINAL ===================================
console.log('🎯 Sistema de Estacionamento carregado com sucesso!');
console.log('📋 Funcionalidades disponíveis:');
console.log('  - ✅ Cadastro com validação completa');
console.log('  - ✅ LocalStorage para persistência');
console.log('  - ✅ Listagem de vagas ocupadas');
console.log('  - ✅ Listagem de vagas disponíveis');
console.log('  - ✅ Remoção de reservas');
console.log('  - ✅ Estatísticas em tempo real');
console.log('  - ✅ Interface responsiva');
console.log('📞 Desenvolvido para UniSenai - UC Desenvolvimento Web');
