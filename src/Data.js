// return an array of castles where the name contains the query string
export const search = (query, castles) => {
    if (query === '') {
        return castles;
    }
    return castles.filter(castle => {
        return castle.name.toLowerCase().includes(query.toLowerCase());
    })
}


// Retrieve data from Wikipedia API
export const getCastleInfo = (id, castle) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&piprop=original&exintro=true&exsentences=5&titles=${encodeURIComponent(castle.name)}&format=json&origin=*`;
    return fetch(url);
}