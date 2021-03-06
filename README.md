# Spotify Radio
Esse projeto foi desenvolvido na Semana JS Expert 6.0, um evento de programação focado no backend e 100% de prática

## Preview

<img src="./prints/demo.png" />

## Tecnologias utilizadas
- Node 17
- Jest

## Checklist Features

- Web API
    - [ ] Deve atingir 100% de cobertura de código em testes
    - [ ] Deve ter testes de integração validando todas as rotas da API
    - [x] Deve entregar arquivos estáticos como Node.js Stream
    - [ ] Deve entregar arquivos de música como Node.js Stream
    - [ ] Dado um usuário desconectado, não deve quebrar a API
    - [ ] Mesmo que vários comandos sejam desparados ao mesmo tempo, não deve quebrar a API
    - [x] Caso aconteça um erro inesperado, a API deve continuar funcionando
    - [ ] O projeto precisa ser executado em ambientes Linux, Mac e Windows

- Web App
    - Client
        - [ ] Deve reproduzir a transmissão
        - [ ] Não deve pausar se algum efeito for adicionado
    - Controller
        - [ ] Deve atingir 100% de cobertura de código em testes
        - [ ] Deve poder iniciar ou parar uma transmissão
        - [ ] Deve enviar comandos para adicionar audio efeitos à uma transmissão

## Tarefas por aula

- Aula 01: Cobrir as camadas service e route com testes unitários e alcançar 100% de code coverage
- Aula 02: Manter 100% de code coverage e implementar testes e2e para toda a API
- Aula 03: implementar testes unitários para o frontend e manter 100% de code coverage
- **PLUS**:
    - [ ] disponibilizar um novo efeito
        - [ ] adicionar um botão novo no controlador
        - [ ] adicionar um som de efeito novo para a pasta `audios/fx/`
        - [ ] republicar no heroku
