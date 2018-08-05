const castlesData = [
    {name: 'Wawel Castle', location: {lat: 50.05405, lng: 19.935412}, titleUrl: 'Wawel%20Castle' },
    {name: 'Korzkiew Castle', location: {lat: 50.162178, lng: 19.882453}, titleUrl: 'Korzkiew%20Castle' },
    {name: 'Tenczyn Castle', location: {lat: 50.102256, lng: 19.581601}, titleUrl: 'Tenczyn%20Castle' },
    {name: 'Royal Castle, Warsaw', location: {lat: 52.247976, lng: 21.015256}, titleUrl: 'Royal%20Castle,%20Warsaw' },
    {name: 'Malbork Castle', location: {lat: 54.039753, lng: 19.028013}, titleUrl: 'Malbork%20Castle' }

];

export const getAll = () => {
    return castlesData;
}

export const search = (query) => {
    return castlesData.filter((castle) => {
        return castle.name.includes(query);
    })
}

// import * as Data from './Data' -- write this to import the methods