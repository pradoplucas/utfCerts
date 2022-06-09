/* Módulos */
require('dotenv').config(); /* Configuração das variáveis de ambiente */
const app = require('./configs/app'); /* Configuração do app */
const database = require('./configs/database'); /* Configuração do BD */

const indexRouter = require('./app/routes/index.route'); /* Importa a rota / */
const aboutRouter = require('./app/routes/about.route'); /* Importa a rota /sobre */
const searchOwnerRouter = require('./app/routes/searchOwner.route'); /* Importa a rota /searchPerson */
const searchEventRouter = require('./app/routes/searchEvent.route'); /* Importa a rota /searchEvent */
const docsRouter = require('./app/routes/docs.route'); /* Importa a rota /docs */
const downloadRouter = require('./app/routes/download.route'); /* Importa a rota /download */

/* Constante */
const PORT =
	process.env.PORT || 8022; /* Define a porta na qual a aplicação vai rodar */

/* Rotas */
app.use(indexRouter); /* Adiciona ao middleware a rota / */
app.use(aboutRouter); /* Adiciona ao middleware a rota /sobre */
app.use(searchOwnerRouter); /* Adiciona ao middleware a rota /searchperson */
app.use(searchEventRouter); /* Adiciona ao middleware a rota /searchEvent */
app.use(docsRouter); /* Adiciona ao middleware a rota /docs */
app.use(downloadRouter); /* Adiciona ao middleware a rota /download */

/* Abre o servidor na porta especificada */
app.listen(PORT, () => {
	console.log(
		'\n##### -- Server Running: Success\nLink: http://localhost:' +
			PORT +
			'\n'
	);
});
