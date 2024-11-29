# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

### `npm run test`

Run the test cases.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
An efficient server implies a lower cost of the infrastructure, a better responsiveness under load and happy users. How can you efficiently handle the resources of your server, knowing that you are serving the highest number of requests as possible, without sacrificing security validations and handy development?

Enter Fastify. Fastify is a web framework highly focused on providing the best developer experience with the least overhead and a powerful plugin architecture. It is inspired by Hapi and Express and as far as we know, it is one of the fastest web frameworks in town.

Quick start

Create a folder and make it your current working directory:

mkdir my-app
cd my-app

Generate a fastify project with npm init:

npm init fastify

Install dependencies:

npm i

To start the app in dev mode:

npm run dev

For production mode:

npm start

Under the hood npm init downloads and runs Fastify Create, which in turn uses the generate functionality of Fastify CLI.
Install

To install Fastify in an existing project as a dependency:

Install with npm:

npm i fastify

Install with yarn:

yarn add fastify

Example

// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})

with async-await:

// ESM
import Fastify from 'fastify'

const fastify = Fastify({
  logger: true
})
// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', async (request, reply) => {
  reply.type('application/json').code(200)
  return { hello: 'world' }
})

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})

Do you want to know more? Head to the Getting Started.

    Note

    .listen binds to the local host, localhost, interface by default (127.0.0.1 or ::1, depending on the operating system configuration). If you are running Fastify in a container (Docker, GCP, etc.), you may need to bind to 0.0.0.0. Be careful when deciding to listen on all interfaces; it comes with inherent security risks. See the documentation for more information.

Core features

    Highly performant: as far as we know, Fastify is one of the fastest web frameworks in town, depending on the code complexity we can serve up to 76+ thousand requests per second.
    Extensible: Fastify is fully extensible via its hooks, plugins and decorators.
    Schema based: even if it is not mandatory we recommend to use JSON Schema to validate your routes and serialize your outputs, internally Fastify compiles the schema in a highly performant function.
    Logging: logs are extremely important but are costly; we chose the best logger to almost remove this cost, Pino!
    Developer friendly: the framework is built to be very expressive and help the developer in their daily use, without sacrificing performance and security.

Benchmarks

Machine: EX41S-SSD, Intel Core i7, 4Ghz, 64GB RAM, 4C/8T, SSD.

Method:: autocannon -c 100 -d 40 -p 10 localhost:3000 * 2, taking the second average
Framework 	Version 	Router? 	Requests/sec
Express 	4.17.3 	✓ 	14,200
hapi 	20.2.1 	✓ 	42,284
Restify 	8.6.1 	✓ 	50,363
Koa 	2.13.0 	✗ 	54,272
Fastify 	4.0.0 	✓ 	77,193
- 			
http.Server 	16.14.2 	✗ 	74,513

Benchmarks taken using https://github.com/fastify/benchmarks. This is a synthetic, "hello world" benchmark that aims to evaluate the framework overhead. The overhead that each framework has on your application depends on your application, you should always benchmark if performance matters to you.
Documentation

    Getting Started
    Guides
    Server
    Routes
    Encapsulation
    Logging
    Middleware
    Hooks
    Decorators
    Validation and Serialization
    Fluent Schema
    Lifecycle
    Reply
    Request
    Errors
    Content Type Parser
    Plugins
    Testing
    Benchmarking
    How to write a good plugin
    Plugins Guide
    HTTP2
    Long Term Support
    TypeScript and types support
    Serverless
    Recommendations

中文文档地址
Ecosystem

    Core - Core plugins maintained by the Fastify team.
    Community - Community supported plugins.
    Live Examples - Multirepo with a broad set of real working examples.
    Discord - Join our discord server and chat with the maintainers.

Support

Please visit Fastify help to view prior support issues and to ask new support questions.

Version 3 of Fastify and lower are EOL and will not receive any security or bug fixes.

Fastify's partner, HeroDevs, provides commercial security fixes for all unsupported versions at https://herodevs.com/support/fastify-nes. Fastify's supported version matrix is available in the Long Term Support documentation.
Contributing

Whether reporting bugs, discussing improvements and new ideas or writing code, we welcome contributions from anyone and everyone. Please read the CONTRIBUTING guidelines before submitting pull requests.
Team

Fastify is the result of the work of a great community. Team members are listed in alphabetical order.

Lead Maintainers:

    Matteo Collina, https://twitter.com/matteocollina, https://www.npmjs.com/~matteo.collina
    Tomas Della Vedova, https://twitter.com/delvedor, https://www.npmjs.com/~delvedor
    Manuel Spigolon, https://twitter.com/manueomm, https://www.npmjs.com/~eomm
    James Sumners, https://twitter.com/jsumners79, https://www.npmjs.com/~jsumners

Fastify Core team

    Tommaso Allevi, https://twitter.com/allevitommaso, https://www.npmjs.com/~allevo
    Harry Brundage, https://twitter.com/harrybrundage, https://www.npmjs.com/~airhorns
    David Mark Clements, https://twitter.com/davidmarkclem, https://www.npmjs.com/~davidmarkclements
    Matteo Collina, https://twitter.com/matteocollina, https://www.npmjs.com/~matteo.collina
    Tomas Della Vedova, https://twitter.com/delvedor, https://www.npmjs.com/~delvedor
    Dustin Deus, https://twitter.com/dustindeus, https://www.npmjs.com/~starptech
    Ayoub El Khattabi, https://twitter.com/ayoubelkh, https://www.npmjs.com/~ayoubelk
    Denis Fäcke, https://twitter.com/serayaeryn, https://www.npmjs.com/~serayaeryn
    Carlos Fuentes, https://twitter.com/metcoder95, https://www.npmjs.com/~metcoder95
    Vincent Le Goff
    Luciano Mammino, https://twitter.com/loige, https://www.npmjs.com/~lmammino
    Luis Orbaiceta, https://twitter.com/luisorbai, https://www.npmjs.com/~luisorbaiceta
    Maksim Sinik, https://twitter.com/maksimsinik, https://www.npmjs.com/~fox1t
    Manuel Spigolon, https://twitter.com/manueomm, https://www.npmjs.com/~eomm
    James Sumners, https://twitter.com/jsumners79, https://www.npmjs.com/~jsumners
    Aras Abbasi, https://www.npmjs.com/~uzlopak
    Gürgün Dayıoğlu, https://www.npmjs.com/~gurgunday

Fastify Plugins team

    Matteo Collina, https://twitter.com/matteocollina, https://www.npmjs.com/~matteo.collina
    Harry Brundage, https://twitter.com/harrybrundage, https://www.npmjs.com/~airhorns
    Tomas Della Vedova, https://twitter.com/delvedor, https://www.npmjs.com/~delvedor
    Ayoub El Khattabi, https://twitter.com/ayoubelkh, https://www.npmjs.com/~ayoubelk
    Carlos Fuentes, https://twitter.com/metcoder95, https://www.npmjs.com/~metcoder95
    Vincent Le Goff
    Salman Mitha, https://www.npmjs.com/~salmanm
    Maksim Sinik, https://twitter.com/maksimsinik, https://www.npmjs.com/~fox1t
    Frazer Smith, https://www.npmjs.com/~fdawgs
    Manuel Spigolon, https://twitter.com/manueomm, https://www.npmjs.com/~eomm
    Simone Busoli, https://twitter.com/simonebu, https://www.npmjs.com/~simoneb
    Gürgün Dayıoğlu, https://www.npmjs.com/~gurgunday
    Dan Castillo, https://www.npmjs.com/~dancastillo
    Jean Michelet, https://www.npmjs.com/~jean-michelet

Great Contributors

Great contributors on a specific area in the Fastify ecosystem will be invited to join this group by Lead Maintainers.

    dalisoft, https://twitter.com/dalisoft, https://www.npmjs.com/~dalisoft
    Luciano Mammino, https://twitter.com/loige, https://www.npmjs.com/~lmammino
    Evan Shortiss, https://twitter.com/evanshortiss, https://www.npmjs.com/~evanshortiss

Past Collaborators

    Çağatay Çalı, https://twitter.com/cagataycali, https://www.npmjs.com/~cagataycali
    Trivikram Kamat, https://twitter.com/trivikram, https://www.npmjs.com/~trivikr
    Cemre Mengu, https://twitter.com/cemremengu, https://www.npmjs.com/~cemremengu
    Nathan Woltman, https://twitter.com/NathanWoltman, https://www.npmjs.com/~nwoltman
    Ethan Arrowood, https://twitter.com/arrowoodtech, https://www.npmjs.com/~ethan_arrowood
    Rafael Gonzaga, https://twitter.com/_rafaelgss, https://www.npmjs.com/~rafaelgss

Hosted by

We are a At-Large Project in the OpenJS Foundation.
Sponsors

Support this project by becoming a SPONSOR! Fastify has an Open Collective page where we accept and manage financial contributions.
Acknowledgements

This project is kindly sponsored by:

    NearForm
    Platformatic

Past Sponsors:

    LetzDoIt

This list includes all companies that support one or more of the team members in the maintenance of this project.
License

Licensed under MIT.

For your convenience, here is a list of all the licenses of our production dependencies:

    MIT
    ISC
    BSD-3-Clause
    BSD-2-Clause
