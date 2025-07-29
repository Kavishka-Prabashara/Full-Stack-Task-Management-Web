import express from 'express';
import * as taskController from '../controllers/taskController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', taskController.create);
router.get('/', taskController.list);
router.put('/:id', taskController.update);
router.delete('/:id', taskController.remove);

export default router;
