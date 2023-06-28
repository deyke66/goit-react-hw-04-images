import style from './Button.module.css'
import PropTypes from "prop-types"

export const Button = ({onClick}) => {
    return (<div>
        <button className={style.Button} onClick={onClick}>Load More</button>
    </div>)
}

Button.propTypes = {
    onClick: PropTypes.func
}