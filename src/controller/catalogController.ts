import { Request, Response } from "express"
import multer from "multer"
import path from "path"
import Content from "../models/Content"
import sharp from "sharp"
import remove from "../services/removeService"
import fs from "fs"

class CatalogController {
    
    async getCatalog(req:Request, res: Response){
        const data = await Content.findAll();
        if(data.length == 0){
            return res.status(400).send({msg: "Sem registros."});            
        }
        return res.status(200).send(data)
    }
     async postCatalog(req:Request, res: Response){
        const name = req.file.filename;
        const newName = name.substring(0, name.length - 4);
        const path = "uploads/" + newName + "l.png";
        let content = {
            title: req.body.title,
            eps: req.body.eps,
            genre: req.body.genre,
            description: req.body.description,
            poster: "http://localhost:3500/" + path
        }        
        try {
            await sharp(req.file.path).resize(160,240).toFile(path)
            fs.unlink(req.file.path, ()=> {});
            await Content.create(content);
            return res.status(200).send({msg: "Item criado com sucesso."})
        } catch (error) {
            console.log(error);
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
        const name = req.file.filename;
        const newName = name.substring(0, name.length - 4);
        const path = "uploads/" + newName + "l.png"
        
        let data = await Content.findOne({ where: { id: id }});
        
        if(!data) {
            fs.unlink(req.file.path, ()=> {});
            return res.status(400).send({msg: "Item nao existe"});
        }else{
            data.title = req.body.title;        
            data.eps = req.body.eps;
            data.genre = req.body.genre;
            data.description = req.body.description;
            data.poster = "http://localhost:3500/" + path;
            try {
                await sharp(req.file.path).resize(160,240).toFile(path)
                fs.unlink(req.file.path, ()=> {});
                await remove(id);
                await data.save();        
                return res.status(200).send({data, msg: "Item atualizado."})
            } catch (error) {
                console.log(error);
            }
        }
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
