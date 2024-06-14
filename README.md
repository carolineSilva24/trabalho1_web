# Trabalho 1(WEB) - 2º bimestre

##  Como inicializar o back e o front-end no VScode:

###  Deve-se fazer um git clone no terminal do seu VScode, entrar na pasta trabalho1-web inicializando tanto a pasta dositio-class, com um npm i para instalar as dependencias necessárias, e logo após um npm run dev para poder rodar o back-end, e em outro terminal inicializar a pasta sample_spa com um npm i também para instalar as dependencias necessárias, e logo após um npm run dev para poder rodar o front-end. 

## Conexão com o mongoDB 

### Você deve abrir seu mongoDB compass mongodb://localhost:27017, nele deverá ter a database dositio com três pastas, sendo (products, users e categories), se não tiver pode cria-las a mão no mongoDB e então deverá abrir o thunderClient do VScode em um request no "http://127.0.0.1:5000/auth" e registrar um usuário no banco de dados com os seguintes argumentos, como por exemplo,
{
  "_id": "1",
  "username": "Caroline",
  "password": "1234",
  "isAdmin": "true"
}
### onde você salvará o x-access-token no código(no deleteProducts do ProductContext, no saveProducts do AddProducts) para poder permitir você de inserir e deletar produtos da lista no banco de dados e salvar um usuario no banco de dados com a senha encriptografada, para poder usar no login da nossa página web.

## Conexão da página web

### Após inicializar você deve colocar no seu navegador "localhost:3000" para mostrar a tela inicial, nela terá um botão onde te leva para a página de login onde você deve inserir o usuário e a senha correta salva no banco de dados para poder ver os produtos listados por categoria e poder inserir novos produtos. Quando abrir a página de produtos na web, se já houver algum produto no banco de dados ele vai mostrar, assim que você escolher a categoria de onde ele está, se não você pode inseri-lo como pede o formulario, sem poder repetir o nome e o id dos produtos ja existentes, e as categorias no nosso trabalho é adicionado como um int, que é o index, onde vai de (0-4), sendo 0 a primeira categoria presente na lista de produtos. Se quiser remover algum produto da lista, basta apertar na lixeira do lado das informações do produto escolhido, que ela apagará tanto da lista da web, quanto do seu banco de dados.
