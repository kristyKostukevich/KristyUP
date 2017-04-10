class UserMapper{

    constructor() {
        this.db = require('diskdb');
        this.db.connect(__dirname+'/../data', ['user']);

    }

    getUser() {
        return this.db.user.find();
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

