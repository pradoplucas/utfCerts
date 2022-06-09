const   fs = require('fs'),
        exphbs = require('express-handlebars'), /* Importa o módulo express-handlebars */
        process = require('process');

var hbs = exphbs.create({});

console.log('\n##### -- Path process.cwd()\n' + process.cwd())
console.log('\n##### -- Path __dirname\n' + __dirname + '\n')

if(process.env.NODE_ENV === 'production'){
    hbs.handlebars.registerPartial(
        'tableOwner', 
        hbs.handlebars.compile(
            fs.readFileSync(
                '/opt/system/app/views/partials/tableOwner.handlebars'
            ).toString('utf-8')
        )
    );
    hbs.handlebars.registerPartial(
        'tableEvent', 
        hbs.handlebars.compile(
            fs.readFileSync(
                '/opt/system/app/views/partials/tableEvent.handlebars'
            ).toString('utf-8')
        )
    );
}
else{
    hbs.handlebars.registerPartial(
        'tableOwner', 
        hbs.handlebars.compile(
            fs.readFileSync(
                process.cwd() + 
                '/app/views/partials/tableOwner.handlebars'
            ).toString('utf-8')
        )
    );
    hbs.handlebars.registerPartial(
        'tableEvent', 
        hbs.handlebars.compile(
            fs.readFileSync(
                process.cwd() + 
                '/app/views/partials/tableEvent.handlebars'
            ).toString('utf-8')
        )
    );
}

module.exports = {
    createTableOwner: (allCerts) => {
        return hbs.handlebars.partials['tableOwner'](allCerts)
    },
    createTableEvent: (allCerts) => {
        return hbs.handlebars.partials['tableEvent'](allCerts)
    },
}