import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading } from "./uiSlice";
import { getPokemon, getPokemonDetails } from "../api";

const initialState = {
    pokemons: [],
};

export const fetchPokemonWithDetails = createAsyncThunk(
    'data/fetchPokemonWithDetails',
    async (_, {dispatch}) => {
        dispatch(setLoading(true));
        // dispatch del loader
        //  fetch
        // dispatch del loader
        const pokemonsRes = await getPokemon();
        const pokemonsDetailed = await Promise.all(pokemonsRes.map((pokemon) => getPokemonDetails(pokemon)));
        dispatch(setPokemons(pokemonsDetailed));
        dispatch(setLoading(false));
    }
);

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setPokemons: (state, action) => {
            state.pokemons = action.payload;
        },
        setFavorite: (state, action) => {
            const pokemonIndex = state.pokemons.findIndex((pokemon) => {
                return pokemon.id === action.payload.pokemonId;
            })
            if (pokemonIndex >= 0) {
                const isFavorite = state.pokemons[pokemonIndex].favorite;
                state.pokemons[pokemonIndex].favorite = !isFavorite;
            }

        },
    },
});

export const { setFavorite, setPokemons } = dataSlice.actions;

export default dataSlice.reducer;