# 🚗 Sistema de Controle de Estacionamento - Condomínio UniSenai

## 📋 Sobre o Projeto

Este é um sistema completo de controle de estacionamento desenvolvido como **Desafio 1** da UC - Desenvolvimento Web do UniSenai. O projeto foi criado em **2025** como uma versão aprimorada que atende **100% dos requisitos** especificados no PDF do desafio.

## ✨ Funcionalidades Implementadas

### ✅ **Requisitos Atendidos (Conforme PDF)**

1. **✅ Página de cadastro criada** - `cadastro.html`
2. **✅ Todas as informações obrigatórias** - Placa, proprietário, apartamento, bloco, modelo, cor, vaga
3. **✅ Validação completa do formulário** - Validação em tempo real e antes do envio
4. **✅ Validação de vaga existente e disponível** - Sistema verifica se a vaga escolhida está livre
5. **✅ Console.log dos dados** - Todos os dados são exibidos no console ao salvar
6. **✅ Pop-up de confirmação** - Mensagem de sucesso após cadastro
7. **✅ LocalStorage** - Dados persistidos localmente
8. **✅ Página de listagem criada** - `vagas-ocupadas.html`
9. **✅ Listagem baseada no LocalStorage** - Dados dinâmicos do localStorage
10. **✅ Indicação de vagas ocupadas** - Visual claro das vagas em uso
11. **✅ Indicação de vagas disponíveis** - `vagas-disponiveis.html`
12. **✅ JavaScript para listagem** - Funcionalidade completa em JS
13. **✅ CSS padronizado** - Design moderno e consistente
14. **✅ Vagas estáticas definidas** - 50 vagas distribuídas em 4 blocos

### 🚀 **Melhorias Adicionais**

- **Interface moderna** com design responsivo
- **Navegação intuitiva** entre as páginas
- **Validação em tempo real** com feedback visual
- **Busca e filtros** nas listagens
- **Estatísticas detalhadas** por bloco e tipo de vaga
- **Tipos de vagas especiais** (Idoso, Deficiente, Normal)
- **Confirmação antes de remover** reservas
- **Pré-seleção de vagas** via URL
- **Animações e transições** suaves

## 🏗️ Estrutura do Projeto

```
desafio 1 DW 2025/
├── index.html              # Página inicial de navegação
├── cadastro.html           # Formulário de cadastro de reservas
├── vagas-ocupadas.html     # Listagem de vagas ocupadas
├── vagas-disponiveis.html  # Listagem de vagas disponíveis
├── styles.css              # Estilos CSS modernos e responsivos
├── script.js               # JavaScript com todas as funcionalidades
└── README.md               # Esta documentação
```

## 🎯 Funcionalidades Detalhadas

### **1. Sistema de Vagas**
- **50 vagas totais** distribuídas em 4 blocos (A, B, C, D)
- **Tipos especiais**: 5 vagas para deficientes, 5 para idosos, 40 normais
- **2 subsolos** com localização específica
- **Validação automática** de disponibilidade

### **2. Cadastro de Reservas**
- **Validação de placa** (formato antigo ABC1234 e Mercosul ABC1A23)
- **Campos obrigatórios** com validação individual
- **Verificação de duplicatas** - impede placas repetidas
- **Seleção inteligente** - só mostra vagas disponíveis
- **Feedback visual** em tempo real

### **3. Gerenciamento**
- **Listagem completa** com filtros de busca
- **Remoção segura** com confirmação
- **Estatísticas em tempo real** por bloco e tipo
- **Interface responsiva** para mobile e desktop

### **4. Persistência de Dados**
- **LocalStorage** para armazenamento local
- **Estrutura JSON** organizada
- **Recuperação automática** na inicialização
- **Backup de segurança** em caso de erro

## 💻 Como Usar

### **1. Abrir o Sistema**
1. Abra o arquivo `index.html` no navegador
2. Navegue pelas opções do menu principal

### **2. Cadastrar Reserva**
1. Clique em "📝 Cadastrar Reserva"
2. Preencha todos os campos obrigatórios
3. Selecione uma vaga disponível
4. Clique em "Salvar Reserva"

### **3. Visualizar Vagas**
- **Ocupadas**: Lista todas as reservas ativas
- **Disponíveis**: Mostra vagas livres (grade ou lista)

### **4. Gerenciar Reservas**
- Use o botão "🗑️ Remover" para liberar vagas
- Utilize a busca para encontrar reservas específicas

## 🔧 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com CSS Grid/Flexbox
- **JavaScript ES6+** - Funcionalidades avançadas
- **LocalStorage API** - Persistência de dados
- **Design Responsivo** - Mobile-first

## 📊 Estrutura de Dados

### **Vagas Estáticas**
```javascript
{
  numero: 1,
  bloco: "A",
  tipo: "Deficiente",
  localizacao: "Subsolo 1"
}
```

### **Reservas**
```javascript
{
  id: 1703234567890,
  placa: "ABC1234",
  proprietario: "João Silva",
  apartamento: "101",
  bloco: "A",
  modelo: "Honda Civic",
  cor: "Branco",
  vaga: 15,
  dataHora: "2025-09-22T20:48:00.000Z"
}
```

## 🎨 Design System

### **Cores Principais**
- **Primária**: #2563eb (Azul)
- **Sucesso**: #10b981 (Verde)
- **Perigo**: #ef4444 (Vermelho)
- **Aviso**: #f59e0b (Amarelo)

### **Características do Design**
- **Interface limpa** e moderna
- **Cards e sombras** suaves
- **Transições** em 0.3s
- **Feedback visual** imediato
- **Ícones** intuitivos

## 🧪 Como Testar

### **1. Validações**
- Tente cadastrar com placa inválida
- Deixe campos obrigatórios vazios
- Tente cadastrar a mesma placa duas vezes

### **2. Funcionalidades**
- Cadastre algumas reservas
- Navegue entre as páginas
- Use os filtros de busca
- Remova uma reserva

### **3. Persistência**
- Feche e reabra o navegador
- Verifique se os dados permanecem
- Abra o DevTools > Application > Local Storage

## 📱 Responsividade

O sistema é **100% responsivo** e funciona em:
- **Desktop** (1200px+)
- **Tablet** (768px-1199px)  
- **Mobile** (até 767px)

## 🐛 Solução de Problemas

### **Dados não salvam**
- Verifique se o JavaScript está habilitado
- Verifique o Local Storage no DevTools

### **Vagas não carregam**
- Verifique se não há erros no console
- Tente limpar o Local Storage e recarregar

### **Layout quebrado**
- Verifique se o arquivo CSS está carregando
- Teste em outro navegador

## 📈 Melhorias Futuras

- [ ] Integração com backend
- [ ] Autenticação de usuários
- [ ] Relatórios em PDF
- [ ] Notificações push
- [ ] API REST
- [ ] Tema escuro

## 👨‍💻 Desenvolvedor

**Anna** - Estudante UniSenai UC Desenvolvimento Web  
**Data**: Setembro 2025  
**Versão**: 2.0 (Melhorada)

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais como parte do curso de Desenvolvimento Web da UniSenai.

---

**🎯 100% dos requisitos do PDF atendidos ✅**
