class TagsMapper{

    constructor() {
        this.db = require('diskdb');
        this.db.connect(__dirname+'/../data', ['tags']);

    }

    getTags() {
        return this.db.tags.find();
    }



    addTag(tag) {
        this.db.tags.save(tag);
    }


}

module.exports = new TagsMapper();
