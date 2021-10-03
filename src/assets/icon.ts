export const drink = require("./icons/drink.png");
export const noodle = require("./icons/noodle.png");
export const hamburger = require("./icons/hamburger.png");
export const riceBowl = require("./icons/rice-bowl.png");
export const sushi = require("./icons/sushi.png");
export const westernFood = require('./icons/western-food.png')
export const breakfast = require('./icons/breakfast.png')
export const lunch = require('./icons/lunch.png')
export const dinner = require('./icons/dinner.png')
export const defaultImg = require('./icons/defualtImg.png')

interface Icon {
    [index: string]: number,
    drink: number,
    noodle: number,
    hamburger: number,
    riceBowl: number,
    sushi: number,
    westernFood: number,
    breakfast: number,
    lunch: number,
    dinner: number,
    defaultImg: number
}

export const icon: Icon = {
    drink,
    noodle,
    hamburger,
    riceBowl,
    sushi,
    westernFood,
    breakfast,
    lunch,
    dinner,
    defaultImg
}

