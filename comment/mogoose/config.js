import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost/test',{useMongoClient:true});//；连接数据库
export default {
    mongoose,
    db
}