import mongodb from './config';//引入config中的mongodb对象 
const mongoose = mongodb.mongoose;//获取mongoose  
const Schema = mongoose.Schema;//获取Schema,以便快捷使用  
const db = mongodb.db;//获取mongoose  


exports.mongodb = mongodb;//导出mongodb  
exports.mongoose = mongoose; //导出mongoose  
exports.Schema = Schema;//导出Schema  
exports.db = db;//导出model  