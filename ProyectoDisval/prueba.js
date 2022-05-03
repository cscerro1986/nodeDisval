const {retornarArray} = require("./utils/extractorCsv");

const main = async()=>{

    const archivo = "./pruebaWeb2.csv";

    retornarArray(archivo)
        .then((retorno)=>{
            console.log("El retorno es: ",retorno);
            retorno.forEach(element => {
                console.log(element)
            });
        })
    

}

main();