'use strict';

let Hapi = require('hapi');
let mongoose = require('mongoose');
let restHapi = require('rest-hapi');

async function api(){

    const server = new Hapi.Server(restHapi.config.server.connection);

    const plugins = [
        {
            name: 'restHapi',
            version: '1.0.0',
            register: restHapi.register,
            options: {
                mongoose: mongoose
            }
        }
    ]

    await server.register(plugins);
    await server.start();
    console.log(`Server running at: ${server.info.uri}`); // eslint-disable-line
}

process.on('unhandledRejection', (err) => {
    console.error(err); // eslint-disable-line
    process.exit(1);
});

api();
