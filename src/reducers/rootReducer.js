import { combineReducers } from "redux";
import dataReducer from "../slices/dataSlice";
import uiReducer  from "../slices/uiSlice";
// import { pokemonsReducer } from "./pokemons";
// import { uiReducer } from "./ui";

const rootReducer = combineReducers({
    data: dataReducer,
    ui: uiReducer
});

export default rootReducer;