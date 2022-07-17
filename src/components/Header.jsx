import React, {useState, useContext} from "react";
import ThemeContext from "../context/ThemeContext";

const Header = () => {
    const {theme, setTheme} = useContext(ThemeContext);
    //const color = useContext(ThemeContext);

    const handleClick = () => {
        setTheme(!theme)
    }

    return (
        <div className="Header">
            <h1 style={theme ? {color: 'red'}: {color: 'black'}}>ReactHooks</h1>
            <button type="button" onClick={handleClick}>{theme ? 'Dark Mode' : 'Light Mode'}</button>
        </div>
    );
}

export default Header;