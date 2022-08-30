import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from "react-icons/md";
import { SearchbarStyled, SearchButton, SearchForm, SearchInput } from "./Searchbar.styled"

export const Searchbar = ({ onSubmit }) => {
    const setQuery=(e)=> {
        e.preventDefault();
        onSubmit(e.target.elements.searchInput.value.trim())
    }
    
    return (
        <SearchbarStyled>
            <SearchForm onSubmit={setQuery}>
                <SearchButton type="submit">
                    <MdOutlineImageSearch size={24} />
                </SearchButton>

                <SearchInput
                    name="searchInput"
                    type="text"
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </SearchForm>
        </SearchbarStyled>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}