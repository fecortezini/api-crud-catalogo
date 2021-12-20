import {Request, Response} from "express"
import multer from "multer"
import path from "path"
import Content from "../models/Content"
import fs from "fs"
import remove from "../services/removeService"

class CatalogController {    
    async getCatalog(req:Request, res: Response){
        const data = await Content.findAll();
        if(data.length == 0){
            return res.status(400).send({msg: "Sem registros."});            
        }
        console.log(req.ip)
        return res.status(200).send(data)
    }
    async postCatalog(req:Request, res: Response){
        let content = {
            title: req.body.title,
            eps: req.body.eps,
            genre: req.body.genre,
            description: req.body.description,
            poster: req.file.path
        }
        console.log(content)
        if(!content) {
            return res.status(400).send({msg: "Erro no body"});
        } else {
            const result = await Content.create(content);
            return res.status(200).send({msg: "Item criado com sucesso."})
        }
    }
    async getOneContent(req: Request, res: Response){
        const id = req.params.id;
        const data = await Content.findOne({ where: { id: id }});
        if(!data) return res.status(400).send({msg: "Item nao existe"});
        return res.status(200).send(data);
    }
    async updateOneContent(req: Request, res: Response){
        const id = req.params.id;
        let data = await Content.findOne({ where: { id: id }});
        if(!data) return res.status(400).send({msg: "Item nao existe"});       
        data.title = req.body.title;
        data.eps = req.body.eps; 
        data.poster = req.file.path;
        await remove(id);
        await data.save();        
        return res.status(200).send({data, msg: "Item atualizado."})
    }
    async deleteContent(req: Request, res: Response){
        const id = req.params.id;
        await remove(id);
        await Content.destroy({ where: { id: id }});
        return res.status(200).send({msg: "Item deletado."})
    }
    private storage = multer.diskStorage({
        destination: (req,file,cb) => {
            cb(null, 'uploads')
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname))
        }
    })
    public upload = multer({
        storage: this.storage,
        limits: { fileSize: '1000000' },
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|gif/
            const mimeType = fileTypes.test(file.mimetype)  
            const extname = fileTypes.test(path.extname(file.originalname))
    
            if(mimeType && extname) {
                return cb(null, true)
            }
            cb('Formato de arquivo inválido.')
        }
    }).single('poster')
}

export default new CatalogController();
