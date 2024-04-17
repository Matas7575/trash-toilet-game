export type DataType = {
    name: string;
    image: string;
};

export const toilet: DataType[] = [
    { name: "human waste", image: "../images/poop.png" },
    { name: "toilet paper", image: "../images/toilet-paper.png" },
];

export const notToilet: DataType[] = [
    { name: "wet wipes", image: "/images/wet-wipes.png" },
    { name: "paper towels", image: "./images/paper-roll.png" },
    { name: "feminine hygiene products", image: "../images/tampon.png" },
    { name: "dental floss", image: "../images/dental-floss.png" },
    { name: "diapers", image: "../images/diapers.png" },
    { name: "hair", image: "../images/hair.png" },
    { name: "cotton balls and swabs", image: "../images/cotton-buds.png" },
    { name: "medications", image: "../images/pills.png" },
    { name: "cooking grease and oil", image: "../images/olive-oil.png" },
    { name: "food scraps", image: "../images/street-food.png" },
    { name: "cat litter", image: "../images/catLitter.png" },
];