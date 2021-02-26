import { Router } from 'express';

import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';
import { SendMailController } from './controllers/SendMailController';
import { SurveyController } from './controllers/SurveyController';
import { UserController } from './controllers/UserController';

const router = Router();

const userControler = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const anwserController = new AnswerController();
const npsController = new NpsController();

router.post('/users', userControler.create);

router.post('/surveys', surveyController.create);
router.get('/surveys', surveyController.show);

router.post('/sendMail', sendMailController.execute);

router.get('/answers/:value', anwserController.execute);

router.get('/nps/:survey_id', npsController.execute);

export { router };
