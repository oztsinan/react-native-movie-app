const INITIAL_STATE = {
    name : 'Sinan',
    apiKey : 'c4e735db57182a45a4ab1bf92816040a',
    imgUrl : 'https://image.tmdb.org/t/p/original',
    checkLanguage : 'en',
    systemText :{
        tr: {
            welcomeMsg : 'Hoşgeldin',
            upComingMovie : 'Yaklaşan Filmler' ,
            searchText : 'Arayiniz.',
            searchCardViewBtn : 'İncele',
            movieText : 'Film',
            tvText : 'Dizi',
            ViewScreenSummary : 'Özet',
            ViewScreenActors : 'Oyuncular',
            ViewScreenCrew : 'Ekip',
            ViewScreenRecommended : 'Önerilenler',
            TVdegosterimde : "TV'de Gösterimde! ",
            yerliFilmler : "Yerli Filmler",
            romantik : "Romantik",
            komedi : "Komedi",
            bilimKurgu : "Bilim Kurgu",
            savas : "Savaş",
            korku : "Korku",
            belgesel : "Belgesel"

        },
        en: {
            welcomeMsg : 'Welcome',
            upComingMovie : 'Upcoming Movies' ,
            searchText : 'Search',
            searchCardViewBtn : 'View',
            movieText : 'Movie',
            tvText : 'Tv',
            ViewScreenSummary : 'Summary',
            ViewScreenActors : 'Actors',
            ViewScreenCrew : 'Crew',
            ViewScreenRecommended : 'Recommended',
            TVdegosterimde : "Showing on TV!",
            yerliFilmler : "Domestic Movies",
            romantik : "Romantic",
            komedi : "Comedy",
            bilimKurgu : "Science Fiction",
            savas : "War",
            korku : "Fear",
            belgesel : "Documentary"
        }
    }
}

export default (state=INITIAL_STATE,action) =>{
    switch (action.type) {

        case "SET_NAME":
            return {...state , name : action.payload}

        case "SET_SYSTEM_LANGUAGE":
            return {...state , checkLanguage : action.payload}
    
        default:
            return state
    }
}