const express=require('express');

const adminRoutes=express.Router();

const adminController=require('../controller/admin');

adminRoutes.post('/admin/signup', adminController.signup);
adminRoutes.post('/admin/login',adminController.login)

module.exports=adminRoutes;