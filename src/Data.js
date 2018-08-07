const castlesData = [
    {id: 0, name: 'Wawel Castle', location: {lat: 50.05405, lng: 19.935412}, titleUrl: 'Wawel%20Castle' },
    {id: 1, name: 'Korzkiew Castle', location: {lat: 50.162178, lng: 19.882453}, titleUrl: 'Korzkiew%20Castle' },
    {id: 2, name: 'Tenczyn Castle', location: {lat: 50.102256, lng: 19.581601}, titleUrl: 'Tenczyn%20Castle' },
    {id: 3, name: 'Royal Castle, Warsaw', location: {lat: 52.247976, lng: 21.015256}, titleUrl: 'Royal%20Castle,%20Warsaw' },
    {id: 4, name: 'Malbork Castle', location: {lat: 54.039753, lng: 19.028013}, titleUrl: 'Malbork%20Castle' },
    {id: 5, name: 'Krzyżtopór Castle', location: {lat: 50.714071, lng: 21.310466}, titleUrl: 'Krzy%C5%BCtop%C3%B3r' },
    {id: 6, name: 'Gołuchów Castle', location: {lat: 51.852622, lng: 17.933861}, titleUrl: 'Go%C5%82uch%C3%B3w%20Castle' },
    {id: 7, name: 'Książ Castle', location: {lat: 50.842255, lng: 16.291857}, titleUrl: 'Ksi%C4%85%C5%BC' },
    {id: 8, name: 'Czorsztyn Castle', location: {lat: 49.434846, lng: 20.313158}, titleUrl: 'Czorsztyn%20Castle' },
    {id: 9, name: 'Bobolice Castle', location: {lat: 50.613153, lng: 19.4932}, titleUrl: 'Bobolice%20Castle' },
    {id: 10, name: 'Pieskowa Skała Castle', location: {lat: 50.244306, lng: 19.779242}, titleUrl: 'Pieskowa%20Skała' },
    {id: 11, name: 'Ducal Castle, Szczecin', location: {lat: 53.426111, lng: 14.560278}, titleUrl: 'Ducal%20Castle,%20Szczecin' },
];

export const getCastles = () => {
    return castlesData;
}

// return an array of castles where the name contains the query string
export const search = query => {
    if (query === '') {
        return castlesData;
    }
    return castlesData.filter(castle => {
        return castle.name.toLowerCase().includes(query.toLowerCase());
    })
}


// Retrieve data from Wikipedia API
export const getCastleInfo = (id) => {
    const myCastle = castlesData.find(castle => castle.id === id);
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exchars=300&titles=${myCastle.titleUrl}&format=json&origin=*`;
    return fetch(url);
}