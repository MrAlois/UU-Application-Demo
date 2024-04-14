const {program} = require('commander');
const inquirer = require('inquirer');
const {AppClient} = require("uu_appg01_core-appclient");
const OidcClient = require("../helpers/oidc-client");
const LoginTools = require("../helpers/login-tools");
const Environments = require("../helpers/environments");
const os = require("os");


program
    .option('-n, --name <name>', `uuSubApp name, for example "uu-jokes-maing01"`)
    .option('-a, --awid <awid>', `AWID or ASID, that you want to add to routing, for example "22222222222222222222222222222222"`)
    .option('-p, --port <port>', `port on which your uuSubApp is running`, "8080")
    .option(`-g, --gateway <gateway>`, `Gateway of your local docker environment (usually "${Environments.uuGateway.getBaseUri()}")`, )
    .option(`-h, --host <host>`, `Host of your local computer, accessible from WSL (usually "http://$(hostname).local" where hostname is taken from commandline, it is loaded automatically)`,getDefaultWslHost())

program.parse();

const options = program.opts();


async function checkInputs(options) {
    let prompt = [];
    if(!options.name || !options.awid){
        prompt.push({type: 'input', name:"name", message: `uuSubApp name, for example "uu-jokes-maing01"`, default: options.name});
        prompt.push({type: 'input', name:"awid", message: `AWID or ASID, that you want to add to routing, for example "22222222222222222222222222222222"`, default: options.awid});
        prompt.push({type: 'input', name:"port", message: `port on which your uuSubApp is running`, default: 8080});
        prompt.push({type: 'input', name:"gateway", message: `Gateway of your local docker environment (usually "${Environments.uuGateway.getBaseUri()}")`, default: Environments.uuGateway.getBaseUri()});
        prompt.push({type: 'input', name:"host", message: `Host of your local computer, accessible from WSL (usually "http://$(hostname).local" where hostname is taken from commandline, it is loaded automatically)`, default: getDefaultWslHost()});

    }

    return inquirer.prompt(prompt);
}

function getDefaultWslHost() {
    const hostname = os.hostname();
    return `${hostname}.local`;
}

async function addRoute(gwClient, product, awid, port, host = getDefaultWslHost()) {
    //route/store or route/storeMany
    //https://uuapp.plus4u.net/uu-bookkit-maing01/f6c8486918c6451aaf06bf370a4f50a3/book/page?code=06921024
    const dtoIn = {
        product,
        tenant: awid,
        nodeList: [
            {
                host,
                port,
                ssl:false
            }
        ]

    }
    try {
        await gwClient.post("route/store", dtoIn);
    }catch (e){
        console.log(`
        
        Your environment is probably not running or you provided wrong informations, please check your inputs.
        
        `);
        throw e;
    }

}


async function main(options) {
    const validOptions = await checkInputs(options);
    const hollyToken = await LoginTools.getHollyToken();
    const gwClient = new AppClient({baseUri: validOptions.gateway, headers: {Authorization: hollyToken}});
    await addRoute(gwClient, validOptions.name, validOptions.awid, validOptions.port, validOptions.host);

}

main(options).catch(e => {
    console.error(e);
});
