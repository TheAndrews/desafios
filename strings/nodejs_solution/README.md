# Desafio 2: Solução

Primeira para rodar a solução é necessário criar a imagem do docker

 - Na pasta node_crawler executar o comando
    docker build -t node_justificator .

 - Para rodar o container
    docker run -d --name justificator node_justificator

para rodar a solução basta executar

 - npm install
 - npm test
 - node justificator

É possível passar parametros na linha de comando para o node ou ele irá executar com os exemplos do teste