//import { upload } from './../controller/catalogController';
import { Router } from "express"
import catalogController from "../controller/catalogController";

const catalogRouter = Router();

catalogRouter.get('/', catalogController.getCatalog);
catalogRouter.get('/:id', catalogController.getOneContent);

catalogRouter.post('/addContent', catalogController.upload, catalogController.postCatalog);

catalogRouter.put('/update/:id', catalogController.upload, catalogController.updateOneContent);

catalogRouter.delete('/delete/:id', catalogController.deleteContent);

export default catalogRouter;