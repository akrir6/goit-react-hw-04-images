import PropTypes from 'prop-types'
import { ButtonStyled } from "./Button.styled"

export const Button = ({onClick, children}) => {
    return (
        <ButtonStyled type="button" onClick={onClick}>{children}</ButtonStyled>
    )
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string
}