import fs from "fs"
import Content from "../models/Content";

export default async (id?:number, caminho?:string) => {
    if(id){
        let data = await Content.findOne({ where: { id: id } });
        const caminhofinal = data.poster.substring(22)
        fs.rm(caminhofinal, {}, () => {
            console.log(`Arquivo deletado: ${caminhofinal}`);
        } );
    }
    if(caminho){
        fs.rm(caminho, {}, () => {
            console.log(`Arquivo deletado: ${caminho}`);
        } );
    }    
}
 