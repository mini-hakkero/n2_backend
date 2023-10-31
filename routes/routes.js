const express = require('express');
const { jornalController } = require('../controller/controller.js');

const router = express.Router();

router.get('/lista', jornalController.all);
router.get('/busca/:nome', jornalController.busca);
router.post('/inscrever', jornalController.create);
router.put('/atualizar/:cpf', jornalController.update);
router.delete('/deletar/:cpf', jornalController.delete);

module.exports = { router };