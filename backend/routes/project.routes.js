
const {Router} = require('express');
const {check} = require('express-validator');

//middlewares
const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares');

const { projectGet, projectPut, projectPost, projectDelete, projectPatch } = require('../controllers/project.controllers');
const { validRole, validUserEmail } = require('../helpers/dbValidators');


const router = Router();

router.get('/', projectGet);

router.post('/', projectPost);

router.put('/:id', projectPut);

router.patch('/', projectPatch);

router.delete('/:id', projectDelete);

module.exports = router;
