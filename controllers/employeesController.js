const Employee = require('../model/Employee');




// CRUD Operations

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        if(!employees) return res.status(204).json({'message': 'No employees found'});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.name){
        return res.status(400).json({'message': 'name is required'});
    }
    try {
        const result = await Employee.create({
            name: req.body.name,
            position: req.body.position,
            location: req.body.location,
            salary: req.body.salary
        });
        res.status(200).json({'message': 'Employee created successfully'})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.params?.id){
        return res.status(400).json({'message': 'ID parameter is required'});
    }
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(204).json({'message': `No employee matches ID ${req.params.id}`});
        }
        const updatedData = await Employee.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({'message': 'Employee updated successfully'})
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteEmployee = async (req, res) => {
    if(!req?.params?.id){
        return res.status(400).json({'message': 'Employee ID required'});
    }
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id);
        if(!employee){
            return res.status(204).json({'message': `No employee matches ID ${req.body.id}`});
        }
        const result = await Employee.findByIdAndDelete(id);
        res.status(200).json({'message': 'Employee deleted successfully'});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getEmployee = async (req, res) => {
    if(!req?.params?.id){
        return res.status(400).json({'message': 'Employee ID required'});
    }
    try {
        const employee = await Employee.findOne({_id: req.params.id}).exec();
        if(!employee){
            return res.status(204).json({'message': `No employee matches ID ${req.params.id}`});
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
}