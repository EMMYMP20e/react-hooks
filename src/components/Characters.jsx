import React, {useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState} from "react";
import ThemeContext from "../context/ThemeContext";
import Search from "./Search";

const initialState = {
    favorites: []
}

const favoriteReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        default:
            return state;
    }
}



const Characters = () => {
    const {theme} = useContext(ThemeContext);
    const [characters, setCharacters] = useState([])
    const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
    const [search, setSearch] =useState('');
    const searchInput = useRef(null)

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character')
            .then(response => response.json())
            .then(data => setCharacters(data.results))
    }, []);

    const handleClick = favorite => {
        dispatch({type: 'ADD_TO_FAVORITES', payload: favorite})
    }

    // const handleSearch = () => {
    //     setSearch(searchInput.current.value)
    // }

    const handleSearch = useCallback(
        () => {
            setSearch(searchInput.current.value)
        }
        , [])
    

    const getTheme = () => {
        return theme ? {color: 'red'}: {color: 'black'}
    }

    // const filteredUsers = characters.filter(user => {
    //     return user.name.toLowerCase().includes(search.toLowerCase())
    // })

    const filteredCharacters = useMemo(() => //NOTE: to improve search performance
            characters.filter(character => {
                return character.name.toLowerCase().includes(search.toLowerCase())
            })
        , [characters, search])


    return (
        <div className="Characters">
            {favorites.favorites.map( favorite => (
                <li style={getTheme()} key={favorite.id}>
                    {favorite.name}
                </li>
            ))}

            <Search search={search} searchInput={searchInput} handleSearch={handleSearch}/>

            {filteredCharacters.map(character => (
                <div className="item" >
                    <h2>{character.name}</h2>
                    <button type="button" onClick={() => handleClick(character)}>Add to favorites</button>
                </div>
            ))}
        </div>
    )
}

export default Characters;