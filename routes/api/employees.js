const express = require('express');
const router = express.Router();
const employeesController = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWT');




router.route('/')
    .get(employeesController.getAllEmployees)
    .post(verifyJWT, employeesController.createNewEmployee)
    

router.route('/update/:id')
    .put(verifyJWT, employeesController.updateEmployee)

router.route('/delete/:id')
    .delete(verifyJWT, employeesController.deleteEmployee);

router.route('/update/:id')
    .get(verifyJWT, employeesController.getEmployee);






module.exports = router;