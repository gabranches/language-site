const routes : any = {
    'wordsets': wordsetsPage,
    'wordset': wordsetPage
};

let currentRoute = window.location.pathname.split('/')[1];

let currVue : any = routes[currentRoute]();
