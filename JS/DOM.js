console.log("-------------------------DOM----------------------------------");
var domService = (function () {
    var mark;
    var option;
    var authors = [];
    var user = undefined;

    function showList(articls) {
        var newsBlockText;
        var newsBlockData;
        var newsBlockTags;
        for (var i = 0; i < 9; i++) {
            newsBlockText = 'news-block' + (i + 1) + '-text';
            newsBlockData = 'news-block' + (i + 1) + '-data';
            newsBlockTags = 'news-block' + (i + 1) + '-tags';
            document.getElementById(newsBlockText).childNodes[0].textContent = articls[i].title + " ";
            document.getElementById(newsBlockText).childNodes[1].textContent = articls[i].summary;
            document.getElementById(newsBlockData).childNodes[0].textContent = articls[i].createdAt.toDateString() + '/' + articls[i].author;
            for (var c = 0; c < document.getElementById(newsBlockTags).childNodes.length; c++) {
                document.getElementById(newsBlockTags).removeChild(document.getElementById(newsBlockTags).childNodes[c]);
            }
            for (var j = 0; j < articls[i].tags.length; j++) {
                mark = document.createElement('mark');
                mark.className = "colorTag";
                mark.innerHTML = articls[i].tags[j];
                document.getElementById(newsBlockTags).appendChild(mark);
                mark = document.createElement('mark');
                mark.className = "tag-tag";
                mark.innerHTML = " ";
                document.getElementById(newsBlockTags).appendChild(mark);
            }
        }

    }
    function createAuthors() {
        for (var i = 0; i < articlesService.articles.length; i++) {
            if (!authors.find(function (temp) {
                    return (temp === articlesService.articles[i].author);
                }))
                authors.push(articlesService.articles[i].author);
        }
    }
    createAuthors();
    function selectAuthors(authors) {
        for (var i = 0; i < authors.length; i++) {
            option = document.createElement('option');
            option.className = "menu";
            option.innerHTML = authors[i];
            document.getElementById('select').appendChild(option);
        }
    }
    selectAuthors(authors);
    function logIn(user) {
        if (user) {
            document.getElementById('user').childNodes[0].innerHTML = user;
            option = document.createElement('option');
            option.className = "menu";
            option.innerHTML = 'Добавить новость';
            document.getElementById('user').appendChild(option);
            option = document.createElement('option');
            option.className = "menu";
            option.innerHTML = 'Выйти';
            document.getElementById('user').appendChild(option);
            for (var i = 0; i < 9; i++) {
                newsBlockTags = 'news-block' + (i + 1) + '-tags';
                document.getElementById(newsBlockTags).nextElementSibling.style.opacity = 1;
                document.getElementById(newsBlockTags).nextElementSibling.nextElementSibling.style.opacity = 1;
            }
        }
        else {
            document.getElementById('user').childNodes[0].textContent = 'Войти';
            if(document.getElementById('user').childNodes.length>1) {
                document.getElementById('user').removeChild(document.getElementById('user').childNodes[1]);
                document.getElementById('user').removeChild(document.getElementById('user').childNodes[1]);
            }
            var newsBlockTags;
            for (var i = 0; i < 9; i++) {
                newsBlockTags = 'news-block' + (i + 1) + '-tags';
                document.getElementById(newsBlockTags).nextElementSibling.style.opacity = 0;
                document.getElementById(newsBlockTags).nextElementSibling.nextElementSibling.style.opacity = 0;
            }

        }

    }
    function selectTag() {
        for (var i = 0; i < articlesService.arraytags.length; i++) {
            option = document.createElement('option');
            option.className = "select-tag";
            option.innerHTML = articlesService.arraytags[i];
            document.getElementById('select-tag').appendChild(option);
        }
    }
    selectTag();
    function addNew(article) {
        if (articlesService.addArticle(article))
            showList(articlesService.getArticles(0, 10));

    }
    function editNew(id, article) {
        if (articlesService.editArticle(id, article));
        showList(articlesService.getArticles(0, 10));

    }
    function deleteNew(id) {
        if (articlesService.removeArticle(id))
            showList(articlesService.getArticles(0, 10));

    }
    return{
        showList:showList,
        logIn:logIn,
        addNew:addNew,
        editNew:editNew,
        deleteNew:deleteNew
    }

}());
showList(0, 9);
function showList(skip, top, filterConfig) {
    domService.showList(articlesService.getArticles(0,10));
}
function logIn(user) {
    domService.logIn(user);
}
function addNew(article) {
    domService.addNew(article);
}
function editNew(id, article) {
    domService.editNew(id, article);
}
function deleteNew(id) {
    domService.deleteNew(id);
}
