import { Boolean } from "./Boolean.js";
import { Date } from "./Date.js";
import { Integer } from "./Integer.js";
import { Number } from "./Number.js";
import { String } from "./String.js";

const DataTypes = {
    ...String,
    ...Integer,
    ...Boolean,
    ...Number,
    ...Date
}

export {DataTypes};