console.log("-------------------------DOM----------------------------------");

var domService = (function () {
    var mark;
    var option;
    var authors = [];
    var user = undefined;
    var users = [
        {
            login: "1",
            password: "1"
        },
        {
            login: "mr.Black",
            password: "2244mbl"
        },
        {
            login: "mr.Green",
            password: "2244mgr",
        },
        {
            login: "mr.Red",
            password: "2244mr"
        },
        {
            login: "mr.Grey",
            password: "2244mgr"
        },
        {
            login: "mr.Brown",
            password: "2244mbr"
        },
        {
            login: "mr.White",
            password: "2244mwh"
        },
        {
            login: "mrs.Black",
            password: "2244wbl"
        },
        {
            login: "mrs.Green",
            password: "2244wgr"
        },
        {
            login: "mrs.Red",
            password: "2244wr"
        },
        {
            login: "mrs.Grey",
            password: "2244wgr"
        },
        {
            login: "mrs.Brown",
            password: "2244wbr"
        },
        {
            login: "mrs.White",
            password: "2244wwh"
        },
        {
            login: "admin",
            password: "admin"
        },

    ]


    function showList(articls) {
        var newsBlockText;
        var newsBlockData;
        var newsBlockTags;
        var count;
        if (articls.length<9)
        {
            count = articls.length;
            if(count ===0) {
                for (var i=0; i < 9; i++ )
                    document.getElementsByClassName('space30')[i].style.display = 'none';
                document.getElementById('not-found').innerHTML = "Ничего не найдено!";
            }
            else document.getElementById('not-found').innerHTML = "";
            for (var i=count-1; i < 9; i++ )
                document.getElementsByClassName('space30')[i].style.display = 'none';
        }
        else{
            count = 9;
        }
        for (var i = 0; i < count; i++) {
            document.getElementsByClassName('space30')[i].style.display = 'block';
            newsBlockText = 'news-block' + (i + 1) + '-text';
            newsBlockData = 'news-block' + (i + 1) + '-data';
            newsBlockTags = 'news-block' + (i + 1) + '-tags';
            document.getElementById(newsBlockText).childNodes[0].textContent = articls[i].title + " ";
            document.getElementById(newsBlockText).childNodes[1].textContent = articls[i].summary;
            document.getElementById(newsBlockData).childNodes[0].textContent = articls[i].createdAt.toDateString() + '/' + articls[i].author;

            document.getElementsByClassName('tegline')[i].id = articls[i].id;
            for (var c = 0; c < document.getElementsByClassName("tagspace")[i].childNodes.length*2; c++) {

                document.getElementsByClassName("tagspace")[i].removeChild(document.getElementsByClassName("tagspace")[i].childNodes[0]);
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
        if (user ) {

            document.getElementsByClassName('logIn-block')[0].style.display = 'none';
            document.getElementById('logInButton').style.display = 'none';
            document.getElementById('user').style.display = "block";
            document.getElementsByClassName('button-user')[0].innerHTML = user;
            for (var i = 0; i < document.getElementsByClassName('deletespace').length; i++) {
                document.getElementsByClassName('deletespace')[i].style.display = 'block';
                articlesService.user = user;
            }
        }
        else {
            document.getElementsByClassName('logIn-block')[0].style.display = 'none';
            document.getElementById('user').style.display = "none";
            document.getElementById('logInButton').style.display = 'block';
            var newsBlockTags;
            for (var i = 0; i < document.getElementsByClassName('deletespace').length; i++) {
                document.getElementsByClassName('deletespace')[i].style.display = 'none';
                articlesService.user = undefined;
            }

        }

    }
    function selectTag() {
        for (var i = 0; i < articlesService.arraytags.length; i++) {
            option = document.createElement('option');
            option.className = "select-tag";
            option.innerHTML = articlesService.arraytags[i];
            document.getElementById('select-tag').appendChild(option);
           option = document.createElement('option');
            option.innerHTML = articlesService.arraytags[i];
           document.getElementsByClassName('add-news-tags-select')[0].appendChild(option);
        }
    }
    selectTag();
    function addNew(article) {
        if (articlesService.addArticle(article)) {
            showList(articlesService.getArticles(0, 10));
            return true;
        }
        else return false;

    }
    function editNew(id, article) {
        if (articlesService.editArticle(id, article))
        {
            showList(articlesService.getArticles(0, 10));
            return true;
        }
        else return false;

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
        deleteNew:deleteNew,
        users: users,
    }

}());


showList(0, 9);
function showList(skip, top, filterConfig) {
    domService.showList(articlesService.getArticles(0,10));
}
function logIn(user) {
    domService.logIn(user);
}
logIn(articlesService.user);


document.getElementsByClassName('add-news')[0].style.display = 'none';
document.getElementsByClassName('full-new')[0].style.display = 'none';

var button = document.getElementById('logInButton');
function handleClick() {
    document.getElementById('logInButton').style.display = 'none';
    document.getElementsByClassName('logIn-block')[0].style.display = 'block';
}
button.addEventListener('click', handleClick);


function logInClick() {
    var input = document.getElementById('login-name');
    var pass = document.getElementById('password');

    var promise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/login', false)
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({username:input.value, password:pass.value}));
        if(xhr.status == 200) domService.logIn(input.value);
        else alert("неверные данные");
        resolve(xhr);
        xhr = new XMLHttpRequest();
        xhr.open('POST', '/user', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({user: input.value}));
        resolve.end;

    })

     //    if(domService.users.find(function (temp) {
     //            return (temp.login === input.value);
     //        })){
     //        if(domService.users.find(function (temp) {
     //                return (temp.password === pass.value);
     //            })){
     //            var promise = new Promise(function(resolve, reject) {
     //                domService.logIn(input.value);
     //                let xhr = new XMLHttpRequest();
     //                xhr.open('POST', '/login', true);
     //                xhr.setRequestHeader('Content-Type', 'application/json');
     //                // xhr.send(JSON.stringify({user: input.value}));
     //                xhr.send(JSON.stringify({username:input, password:pass}));
     //                resolve.end;
     //            });
     //            return 0;
     //        }
     //        else{
     //            alert("неверный пароль");
     //            return 0;
     //        }
     //    }
     // alert("неверный логин");
}
var buttonIN = document.getElementById('entry');
buttonIN.addEventListener('click', logInClick);


var buttonUser = document.getElementsByClassName('button-user')[0];
function showUserMenu() {
    document.getElementsByClassName('user')[0].style.display = 'block';
}
buttonUser.addEventListener('click', showUserMenu);

var tagsArrayAddNew=[];

var addNewSelect = document.getElementsByClassName('button-user')[1];
function showAddNew() {
    document.getElementById('add-new-h').innerHTML = "Добавить новость:";
    document.getElementsByClassName('add-news-button')[0].innerHTML = "Добавить";
    document.getElementById('main').style.display = 'none';
    document.getElementsByClassName('add-news')[0].style.display = 'block';
    document.getElementsByClassName('add-news-title')[0].value = null;
    document.getElementsByClassName('add-news-text')[0].value = null;
    document.getElementsByClassName('add-news-text')[1].value = null;
    document.getElementsByClassName('add-news-tags')[0].value = null;
    tagsArrayAddNew = [];
}
addNewSelect.addEventListener('click', showAddNew);

var exit = document.getElementsByClassName('button-user')[2];
function exitFunk() {
    document.getElementsByClassName('add-news')[0].style.display = 'none';
    document.getElementsByClassName('full-new')[0].style.display = 'none';
    document.getElementsByClassName('user')[0].style.display = 'none';
    document.getElementById('main').style.display = 'block';
    logIn(undefined);
    var promise = new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('DELETE', '/user', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
    });
}
exit.addEventListener('click', exitFunk);

var logo = document.getElementsByClassName('logo')[0];
function showMainPage() {
    document.getElementsByClassName('add-news')[0].style.display = 'none';
    document.getElementsByClassName('full-new')[0].style.display = 'none';
    document.getElementById('main').style.display = 'block';
}
logo.addEventListener('click', showMainPage);

var globalButton = document.getElementsByClassName("space75")[0];
globalButton.addEventListener('click', editDelete);

var fullDelEditButton = document.getElementsByClassName('full-new')[0];
fullDelEditButton.addEventListener('click', editDeleteFull);

var localID;

function editDeleteFull(event) {
    if (event.target.classList[0] == "delete") {
        var promise = new Promise(function(resolve, reject) {
            domService.deleteNew(localID);
            resolve("AllRirht");
        });
        promise.then (function(response) {
            document.getElementById('main').style.display = 'block';
            document.getElementsByClassName('full-new')[0].style.display = 'none';
        });
    }
    if (event.target.classList[0] == "edit") {

        var article = articlesService.getArticle(localID);
        document.getElementById('add-new-h').innerHTML = "Редактировать новость:";
        document.getElementsByClassName('full-new')[0].style.display = 'none';
        document.getElementsByClassName('add-news')[0].style.display = 'block';
        document.getElementsByClassName('add-news-title')[0].value = article.title;
        document.getElementsByClassName('add-news-text')[0].value = article.summary;
        document.getElementsByClassName('add-news-text')[1].value = article.content;
        document.getElementsByClassName('add-news-tags')[0].value = article.tags;
        document.getElementsByClassName('add-news-button')[0].innerHTML = "Изменить";

    }
}
function editDelete(event) {
    if (event.target.classList[0] == "delete") {
        var promise = new Promise(function(resolve, reject) {
        domService.deleteNew(event.target.parentNode.parentNode.id);
            resolve("AllRirht");
        });
        promise.then (function(response) {
        document.getElementById('main').style.display = 'block';
        document.getElementsByClassName('add-news')[0].style.display = 'none';
        });
    }
    if(event.target.tagName == 'I') {
        document.getElementsByClassName('full-new')[0].style.display = 'block';
        document.getElementById('main').style.display = 'none';
        localID =event.target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.id;
        var article= articlesService.getArticle(localID);
        document.getElementById('full-new-title').innerHTML = article.title;
        document.getElementById('full-new-date').innerHTML = article.createdAt.toDateString() + '/' + article.author;
        document.getElementById('full-new-content').innerHTML = article.content;
        for (var c = 0; c < document.getElementById("full-new-tags").childNodes.length*2; c++) {

            document.getElementById("full-new-tags").removeChild(document.getElementById("full-new-tags").childNodes[0]);
        }
        for (var j = 0; j < article.tags.length; j++) {
            mark = document.createElement('mark');
            mark.className = "colorTag";
            mark.innerHTML = article.tags[j];
            document.getElementById("full-new-tags").appendChild(mark);
            mark = document.createElement('mark');
            mark.className = "tag-tag";
            mark.innerHTML = " ";
            document.getElementById("full-new-tags").appendChild(mark);
        }

    }
    if (event.target.classList[0] == "edit"){
        localID =event.target.parentNode.parentNode.id;
        var article = articlesService.getArticle(event.target.parentNode.parentNode.id);
        document.getElementById('add-new-h').innerHTML = "Редактировать новость:";
        document.getElementById('main').style.display = 'none';
        document.getElementsByClassName('add-news')[0].style.display = 'block';
       document.getElementsByClassName('add-news-title')[0].value = article.title;
       document.getElementsByClassName('add-news-text')[0].value = article.summary;
       document.getElementsByClassName('add-news-text')[1].value = article.content;
       document.getElementsByClassName('add-news-tags')[0].value = article.tags;
       document.getElementsByClassName('add-news-button')[0].innerHTML = "Изменить";

    }


}

var globalClick = document.body;
globalClick.addEventListener('click',closeUserMenu);
function closeUserMenu(event) {
    if (event.target.classList[0] !== "button-user")
        document.getElementsByClassName('user')[0].style.display = 'none';

}

var articles = articlesService.articles;
var paginationCounter=-1;


var filterButton = document.getElementById('filtbutton');
filterButton.addEventListener("click",filterNews);

var filtrConfig = {
    author: undefined,
    dateFrom: undefined,
    dateBefor: undefined,
    tags: undefined,
}
function filterNews() {

    var count=0;
        if ( document.getElementById('select').value!== "Автор")
        {console.log(document.getElementById('select').value)
            filtrConfig.author = document.getElementById('select').value;}
        else {count++
            filtrConfig.author = undefined}
        if (document.getElementById('calendarbegin').value)
            filtrConfig.dateFrom =  new Date(document.getElementById('calendarbegin').value);
        else {count++
            filtrConfig.dateFrom = undefined}
        if(document.getElementById('calendarend').value)
            filtrConfig.dateBefor= new Date(document.getElementById('calendarend').value);
        else {count++
            filtrConfig.dateBefor = undefined}
        if(arrayTagFiltr.length!==0)
            filtrConfig.tags = arrayTagFiltr;
        else {count++
            filtrConfig.tags = undefined}
        if (count === 4)
        {domService.showList(articlesService.getArticles(0, 10));
            articles = articlesService.getArticles(0, 1000);}

        else {
            domService.showList(articlesService.getArticles(0, 10, filtrConfig));
            articles = articlesService.getArticles(0, 1000, filtrConfig);
            console.log(articlesService.getArticles(0, 1000, filtrConfig));
        }

    nextPage();
    lastPage();

}


var nextButton = document.getElementById('nextpage');
nextButton.addEventListener("click",nextPage);

var lastButton = document.getElementById('lastpage');
lastButton.addEventListener("click",lastPage);

function nextPage(){


    if(articles.slice((paginationCounter+1)*9,(paginationCounter+1)*9+9).length !=0){
        paginationCounter++;
        if(paginationCounter <=0) document.getElementById('lastpage').style.opacity=0;
        else document.getElementById('lastpage').style.opacity=0.8;

        domService.showList(articles.slice(paginationCounter*9,paginationCounter*9+9));
    }
    if(articles.slice((paginationCounter+1)*9,(paginationCounter+1)*9+9).length ==0) document.getElementById('nextpage').style.opacity=0;
    else document.getElementById('nextpage').style.opacity=1;
}
function lastPage(){

    if(paginationCounter > 0){
        paginationCounter--;
        domService.showList(articles.slice(paginationCounter*9,paginationCounter*9+9));
    }
    if(paginationCounter <=0) document.getElementById('lastpage').style.opacity=0;
    else document.getElementById('lastpage').style.opacity=1;
    if(articles.slice((paginationCounter+1)*9,(paginationCounter+1)*9+9).length ==0) document.getElementById('nextpage').style.opacity=0;
    else document.getElementById('nextpage').style.opacity=1;


}

nextPage();
lastPage();

var addButton = document.getElementsByClassName('add-news-button')[0];
function addEditNews() {
    var promise = new Promise(function(resolve, reject) {
    if (addButton.innerHTML === "Добавить"){
        var article = {
            id: Date.now().toString(),
            title: document.getElementsByClassName('add-news-title')[0].value,
            summary: document.getElementsByClassName('add-news-text')[0].value,
            createdAt: new Date(),
            author: document.getElementsByClassName('button-user')[0].innerHTML,
            content: document.getElementsByClassName('add-news-text')[1].value,
            tags: tagsArrayAddNew,
        }

        console.log(document.getElementById('login-name').value);

        if(!domService.addNew(article))
            alert("Не удалось добавить новость");
    }
    if (addButton.innerHTML === "Изменить") {
        var article = {

            title: document.getElementsByClassName('add-news-title')[0].value,
            summary: document.getElementsByClassName('add-news-text')[0].value,

            author: document.getElementById('login-name').value,
            content: document.getElementsByClassName('add-news-text')[1].value,
            //   tags: document.getElementsByClassName('add-news-tags')[0].value,


        }

        if(!domService.editNew(localID, article))
            alert("Не удалось изменить новость");

    }
        resolve("AllRirht");
    });
    promise.then (function(response) {
        document.getElementById('main').style.display = 'block';
        document.getElementsByClassName('add-news')[0].style.display = 'none';
    });
}
addButton.addEventListener('click', addEditNews);

var tagButton = document.getElementsByClassName('add-news-tags-button')[0];
function addTagsInSelect() {
    document.getElementsByClassName('add-news-tags')[0].value +=document.getElementsByClassName('add-news-tags-select')[0].value+' ';
    tagsArrayAddNew.push(document.getElementsByClassName('add-news-tags-select')[0].value);
}
tagButton.addEventListener('click', addTagsInSelect);

var exitFullButton = document.getElementById('exit-Full');
exitFullButton.addEventListener('click', exitFull);
function exitFull() {
    document.getElementById('main').style.display = 'block';
    document.getElementsByClassName('full-new')[0].style.display = 'none';

}

var tagBattonsMainPage = document.getElementsByClassName('tagblock')[0];
tagBattonsMainPage.addEventListener('click', tagBlock);
var arrayTagFiltr = [];
function tagBlock(event) {
   if (event.target.innerHTML === "Очистить"){
       document.getElementsByClassName('tag')[0].innerHTML = '';
       arrayTagFiltr = [];
   }
   if (event.target.innerHTML === "Выбрать") {
       if (!arrayTagFiltr.find(function (temp) {
               return (temp === document.getElementById('select-tag').value);
           })) {
           document.getElementsByClassName('tag')[0].innerHTML += document.getElementById('select-tag').value + "             ";
           arrayTagFiltr.push(document.getElementById('select-tag').value);
       }
   }
   if (event.target.innerHTML === "Добавить"){
       if(articlesService.addTag(document.getElementById('input-tag').value)) {
           option = document.createElement('option');
           option.className = "select-tag";
           option.innerHTML = document.getElementById('input-tag').value;
           document.getElementById('select-tag').appendChild(option);
           option = document.createElement('option');
           option.innerHTML = document.getElementById('input-tag').value;
           document.getElementsByClassName('add-news-tags-select')[0].appendChild(option);
       }
       document.getElementById('input-tag').value = "";
   }
}
