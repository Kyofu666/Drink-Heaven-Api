
import Wrapper from '../assets/wrappers/CocktailList'
import CocktailCard from './CocktailCard'

const CocktailList = ({ drinks }) => {
    if (!drinks) {
        return <h4 style={{ textAlign: 'center' }}>
            No matching cocktail found...
        </h4>
    }

    const formattedDrinks = drinks.map(drink => {
        const { idDrink, strDrink, strDrinkThumb: img, strAlcoholic, strGlass: glass } = drink

        return { id: idDrink, name: strDrink, img, info: strAlcoholic, glass }
    })
    return (
        <Wrapper>
            {
                formattedDrinks.map(item => {
                    return <CocktailCard key={item.id} {...item} />
                })
            }
        </Wrapper>
    )
}

export default CocktailList
