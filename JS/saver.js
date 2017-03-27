
window.addEventListener('beforeunload', function () {
    localStorage.setItem('content', JSON.stringify(articlesService.articles));
    localStorage.setItem('tags', JSON.stringify(articlesService.arraytags));
    if (articlesService.user) localStorage.setItem('user', articlesService.user);
    else localStorage.removeItem('user');

});