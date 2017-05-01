class UserMapper{

    constructor() {
        this.db = require('diskdb');
        this.db.connect('./server/db/data', ['user']);
        this.db.connect('./server/db/data', ['baseUser'])

    }
    getUser() {
        return this.db.user.find();
    }
    getUserByName(name) {
       return this.db.baseUser.find({user: name});

    }


    authorization(user, password){
        return (user.password == password);
    }

    addUser(user) {
        this.db.user.save(user);
    }

    deleteUser(){
        this.db.user.remove();
        this.db.loadCollections(['user']);
    }


}

module.exports = new UserMapper();

