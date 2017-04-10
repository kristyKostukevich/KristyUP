class ArticleMapper{

  constructor() {
    this.db = require('diskdb');
    this.db.connect(__dirname+'/../data', ['articles']);

  }

  getArticles() {
    return this.db.articles.find();
  }

  getArticleById(id) {
    return this.db.articles.find({id: id});
  }

  addArticle(article) {
    this.db.articles.save(article);
  }

  deleteArticle(id){
    this.db.articles.remove({id: id});
  }
}

module.exports = new ArticleMapper();
