// Retrieve data from Wikipedia API
export const getCastleInfo = (id, castle) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|extracts&piprop=original&exintro=true&exsentences=5&titles=${encodeURIComponent(castle.name)}&format=json&origin=*`;
    return fetch(url);
}