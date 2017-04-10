/**
 * Created by Kristy on 28.02.2017.
 */
var articlesService = (function () {

    var user = null;

    let xhr = new XMLHttpRequest();
    xhr.open('GET', '/articles', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();

    let articles = JSON.parse(xhr.responseText, (key, value) => {
      if (key === 'createdAt') return new Date(value);

      return value;
    });
    xhr.open('GET', '/tags', false);
    xhr.send();

    let tags = JSON.parse(xhr.responseText);
    let arraytags=[];
     for (let i = 0; i<tags.length; i++) {
         arraytags.push(tags[i].name);
     }
    function xmlRequest(req, url, params) {
        let xhr = new XMLHttpRequest();
        xhr.open(req, url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        if (req === 'DELETE')
            xhr.send();
        else
            xhr.send(JSON.stringify(params));

    }
    xhr.open('GET', '/user', false);
    xhr.send();
    let localUser = JSON.parse(xhr.responseText);
    if(localUser.length!=0)
        user = localUser[0].user;
    else
        user = undefined;


    function getArticles(skip, top, filterConfig){
        if (skip == undefined) skip = 0;
        top = top || 10;
        var flag = 0;
        var rezaltArray = articles;
        if (filterConfig != undefined) {
            if (filterConfig.author != undefined) {
                rezaltArray = articles.filter(function (author) {
                    return (author.author == filterConfig.author);
                })

            }

            if ( filterConfig.dateFrom !=undefined && filterConfig.dateBefor != undefined)
            {

                rezaltArray = rezaltArray.filter(function (temp) {
                    console.log(temp.createdAt > filterConfig.dateFrom );
                    console.log(temp.createdAt < filterConfig.dateBefor );
                    if (temp.createdAt > filterConfig.dateFrom)
                        if(temp.createdAt<filterConfig.dateBefor)
                        return true;
                    else return false;
                });

            }
            if (filterConfig.tags != undefined)
                rezaltArray = rezaltArray.filter(function (temp) {
                    var count = 0;

                    for (var j = 0; j < filterConfig.tags.length; j++)
                        if (temp.tags.indexOf(filterConfig.tags[j]) >= 0)
                            count++;

                    return (count === filterConfig.tags.length)

                });
        }


        rezaltArray.sort(function comp(o1, o2) {
            return (o2.createdAt - o1.createdAt)
        })

        rezaltArray = rezaltArray.slice(skip, skip + top)
        return rezaltArray;
    }



    function getArticle(id)
    {
        return articles.find(function (temp) {
            return (temp.id === id);
        })
    }
    function validateArticle(article) {
        var flag = 0;
        if (typeof article.id == 'string'&&article.id != undefined) {

            flag++;
        }
        if (typeof article.title == 'string'&&article.title != undefined&&article.title.length>0&& article.title.length<100) {

            flag++;
        }
        if(typeof article.summary == 'string'&&article.summary != undefined&&article.summary.length>0&& article.summary.length<200)
        {flag++}
        if(article.createdAt != undefined&& (article.createdAt instanceof Date)== true) {flag++}
        if (article.author != undefined && typeof  article.author == 'string'&& article.author.length>0) {

            flag++;
        }
        if (article.content != undefined && typeof  article.content == 'string'&& article.content.length>0) {

            flag++;
        }
        if(article.tags!=undefined&&article.tags.length!=0){flag++}
        if (flag == 7)
            return true;
        else return false;
    }

    function addArticle(article){

        if(validateArticle(article)&&getArticle(article.id)== undefined)
        {
            for (var i=0; i<article.tags.length; i++)

            {   var tag =article.tags[i];
                if (haveTag(tag)==-1)
                    article.tags.splice(i,1);

            }

            articles.push(article);

            xmlRequest('POST', '/articles', article);

            return true;
        }
        else return false;
    }

    function editArticle(id, article) {
        var i;
        for (i=0; i<articles.length; i++) {
            if (articles[i].id == id) {
                if (validateArticle(articles[i])) {
                    if (typeof article.title == 'string'&&article.title != undefined&&article.title.length>0&& article.title.length<100) {
                        articles[i].title = article.title;

                    }
                    if (typeof article.summary == 'string'&&article.summary != undefined&&article.summary.length>0&& article.summary.length<200) {
                        articles[i].summary = article.summary;

                    }

                    if (article.content != undefined && typeof  article.content == 'string'&& article.content.length>0) {
                        articles[i].content = article.content;

                    }

                    xmlRequest('PUT', '/articles', articles[i]);

                    return true;
                }

            }
        }
        return false;
    }
    function removeArticle(id) {
        for (var i=0; i<articles.length; i++) {
            if (articles[i].id == id) {
                articles.splice(i, 1);

                xmlRequest('DELETE', '/article/'+id+'');

                return true;

            }
        }
        return false;
    }
    function haveTag(tag) {
        for (var i=0; i<arraytags.length;i++)
            if (arraytags[i]===tag)
                return i;
        return -1;
    }
    function addTag(tag) {
        if(haveTag(tag)===-1)
        {   console.log(tag);
            arraytags.push(tag);
            let addNewTag = {name:tag }
            xmlRequest('POST', '/tags', addNewTag);
            return true;
        }
        else return false;
    }
    function deleteTag(tag) {
        var index;
        if( index = haveTag(tag) != -1)
        {
            arraytags.splice(index, 1);
            return true;
        }
        return false;

    }
    return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle:validateArticle,
        addArticle:addArticle,
        editArticle:editArticle,
        removeArticle:removeArticle,
        addTag:addTag,
        deleteTag: deleteTag,

        articles:articles,
        arraytags: arraytags,
        user:user,
    };

}());
