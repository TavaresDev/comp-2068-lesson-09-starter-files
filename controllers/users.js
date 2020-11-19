const User = require('../models/user');

exports.index = async(req, res, next) => {
    try {
        
    }catch (error) {
        next(error);
    } 
};

exports.show = async(req, res, next) => {
    try {
        
    }catch (error) {
        next(error);
    } 
};

exports.create = async (req, res, next) => {
    console.log(req.body);
    try {
      const { 
        name,
        email,
        emailConfirmation,
        password,
        passwordConfirmation
      } = req.body;

      const user = await User.register({
        name,
        email,
        emailConfirmation,
        passwordConfirmation,
        password
      }, password);

      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

exports.update = async(req, res, next) => {
    try {
        
    }catch (error) {
        next(error);
    } 
};

exports.destroy = async(req, res, next) => {
    try {
        
    }catch (error) {
        next(error);
    } 
};