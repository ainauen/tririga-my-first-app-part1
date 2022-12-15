import "./styles.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
export const SearchBox = (props) => {

    const [filterInUse, setFilterInUse] = useState(false)

    return (
        <div className="search-group">
            <input
                className="search-input"
                value={props.searchTerm}
                onChange={props.onSearchTermChange}
            />
            <button className="search-button">
                { filterInUse ?  <AiOutlineClose size={24}/> : <AiOutlineSearch size={24}/>} 
            </button>
        </div>
    );
};

export default SearchBox;
