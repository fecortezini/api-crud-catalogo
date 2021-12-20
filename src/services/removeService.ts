import fs from "fs"
import Content from "../models/Content";

export default async (id) => { 
    let data = await Content.findOne({ where: { id: id } });
    fs.rm(`${data.poster}`, {}, () => {
        console.log(`Arquivo deletado: ${data.poster}`);
    } );
}

 