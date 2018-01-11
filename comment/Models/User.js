import Base from '../mogoose/base';

const UserSchema = Base.Schema({
	name: String,
	password: String
});

const User = Base.db.model('Users', UserSchema);

export function saveUser(data) {
    let user = new User(data);
    return user.save();
}

export function getUser(data) {
    return User.find(data);
}

export function findUserOne(data) {
    return User.findOne(data);
}