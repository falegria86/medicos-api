import { Router } from "express";
import { MedicosController } from "./controllers/medicosController";

const medicosController = new MedicosController();
const router = Router();

router.get('/medicos', medicosController.getMedicos);
router.get('/medicos/:id', medicosController.getMedicoById);
router.post('/medicos/postMedico', medicosController.createMedico);
router.put('/medicos/updateMedico/:id', medicosController.updateMedico);

export default router;