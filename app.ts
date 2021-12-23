import Server from './src/server';
const port = process.env.PORT || "3500";

(async ()=> {
    try {
        await Server.seq.sync();
        await Server.server.listen(port, () => {
        console.log('O servidor está operante.');
        console.log('Banco de dados conectado.');
    })
    } catch (error) {
        console.log(error)
    }    
})();