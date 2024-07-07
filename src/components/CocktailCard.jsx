import { Link } from "react-router-dom"
import Wrapper from '../assets/wrappers/CocktailCard'
const CocktailCard = ({ id, img, glass, info, name }) => {

    return (
        <Wrapper>
            <div className="img-container">
                <img src={img} alt={name} className="img" />
            </div>
            <div className="footer">
                <h4>{name}</h4>
                <h5>{glass}</h5>
                <p>{info}</p>
                <Link to={`/cocktail/${id}`} className="btn">
                    details
                </Link>
            </div>
        </Wrapper>
    )
}

export default CocktailCard
