const castlesData = [
    {id: 0, name: 'Wawel Castle', location: {lat: 50.05405, lng: 19.935412}, titleUrl: 'Wawel%20Castle' },
    {id: 1, name: 'Korzkiew Castle', location: {lat: 50.162178, lng: 19.882453}, titleUrl: 'Korzkiew%20Castle' },
    {id: 2, name: 'Tenczyn Castle', location: {lat: 50.102256, lng: 19.581601}, titleUrl: 'Tenczyn%20Castle' },
    {id: 3, name: 'Royal Castle, Warsaw', location: {lat: 52.247976, lng: 21.015256}, titleUrl: 'Royal%20Castle,%20Warsaw' },
    {id: 4, name: 'Malbork Castle', location: {lat: 54.039753, lng: 19.028013}, titleUrl: 'Malbork%20Castle' }
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