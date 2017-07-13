`use strict`;
const Express = require('express');
const ExpressHandlebars = require('express-handlebars');
const path = require("path");

const app = Express();
const PORT= process.env.PORT || 3000;

app.engine('handlebars', ExpressHandlebars({defaultLayout: 'main'}));
app.set ('view engine', 'handlebars');

app.use(Express.static(path.join(__dirname, "/public")));

app.get('/', (req, res) =>{
	res.render('home', {serverRes: "Hello World"});
})

app.listen(PORT, (err) =>{
	if(err){
		throw err;
	}
	else{
		console.log(`App running on port ${PORT}`);
	}
})