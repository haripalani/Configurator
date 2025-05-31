// data.js

export const allSetItems = [
    {
        id: 1,
        option: "haakband",
        img: "./Assets/parts/Tape.jpg",
        alt: "Haakband",
        title: "KLITTENBAND HAAKBAND Yellow - 225 CM"
    },
    {
        id: 2,
        option: "zijgordijnen",
        img: "./Assets/parts/OMNIUS KLEUR ZIJGORDIJNEN.webp",
        alt: "Zijgordijnen",
        title: "OMNIUS KLEUR ZIJGORDIJNEN"
    },
    {
        id: 3,
        option: "rand",
        img: "./Assets/parts/KLEUR RAND ZIJGORDIJN.webp",
        alt: "Rand Zijgordijn",
        title: "KLEUR RAND ZIJGORDIJN"
    },
    {
        id: 4,
        option: "ophangband",
        img: "./Assets/parts/OMNIUS KLEUR OPHANGBAND.webp",
        alt: "Ophangband",
        title: "OMNIUS KLEUR OPHANGBAND"
    },
    {
        id: 5,
        option: "voorraamband",
        img: "./Assets/parts/OMNIUS KLEUR VOORRAAMBAND.webp",
        alt: "Voorraamband",
        title: "OMNIUS KLEUR VOORRAAMBAND"
    },
    {
        id: 6,
        option: "franjes",
        img: "./Assets/parts/OMNIUS FRANJES KLEUR EN LENGTE.webp",
        alt: "Franjes",
        title: "OMNIUS FRANJES KLEUR EN LENGTE"
    },
    {
        id: 7,
        option: "booggordijn",
        img: "./Assets/parts/OMNIUS KLEUR BOOGGORDIJN.webp",
        alt: "Booggordijn",
        title: "OMNIUS KLEUR BOOGGORDIJN"
    },
    {
        id: 8,
        option: "kussenvoor",
        img: "./Assets/parts/OMNIUS KUSSEN VOORKANT.webp",
        alt: "Kussen Voorkant",
        title: "OMNIUS KUSSEN VOORKANT"
    },
    {
        id: 9,
        option: "kussenachter",
        img: "./Assets/parts/OMNIUS KUSSEN ACHTERKANT.webp",
        alt: "Kussen Achterkant",
        title: "OMNIUS KUSSEN ACHTERKANT"
    }
];


export const productToSetMap = {
    1: 2,
    2: 1,
    3: 3,
    4: 5,
    5: 7,
};


export const setToOptionsMap = {
    1: [1, 2, 3, 4, 5, 6, 7,8,9],
    2: [1, 2, 3, 4, 5, 6],
    3: [1, 2, 3, 4],
    4: [7],
    5: [1, 5, 6],
    6: [4],
    7: [8, 9],
};

export function getOptionItemsForProduct(productId) {
    const setId = productToSetMap[productId];
    const optionIds = setToOptionsMap[setId] || [];
    return optionIds;
  //  return optionIds.map(optionId => allSetItems.find(item => item.id === optionId)).filter(Boolean);
}

export function getSetIdFromProduct(productId) {
    return productToSetMap[productId] || null; // return null if productId not found
}