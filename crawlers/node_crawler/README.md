# Desafio 2: Solução

Primeira para rodar a solução é necessário criar a imagem do docker

 - Na pasta node_crawler executar o comando
    docker build -t node_crawler .

 - Para rodar o container
    docker run -d --name crawler node_crawler


A partir do BotFather foi criado um bot no telegram chamado RedditorBot

Nele é possível passar o comando /NadaPraFazer "cats;hadtohurt"

