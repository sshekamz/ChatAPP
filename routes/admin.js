const express=require('express');

const adminRoutes=express.Router();

const adminController=require('../controller/admin');

adminRoutes.post('/admin/signup', adminController.signup);

module.exports=adminRoutes;