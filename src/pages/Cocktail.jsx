import { useLoaderData, Link, Navigate } from "react-router-dom"
import axios from "axios"
import Wrapper from "../assets/wrappers/CocktailPage";
import { useQuery } from "@tanstack/react-query";
const singleCocktailUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';


const singleCocktailQuery = (id) => {
    return {
        queryKey: ['drinkId', id],
        queryFn: async () => {
            const { data } = await axios.get(`${singleCocktailUrl}${id}`)
            return data.drinks[0]
        }
    }
}

export const loader = (queryClient) => async ({ params }) => {
    const { id } = params
    await queryClient.ensureQueryData(singleCocktailQuery(id))
    return { id }
}

const Cocktail = () => {
    const { id } = useLoaderData()
    const { data } = useQuery(singleCocktailQuery(id))

    if (!data) return <Navigate to={'/'} />

    const {
        strDrink: name,
        strDrinkThumb: image,
        strAlcoholic: info,
        strCategory: category,
        strGlass: glass,
        strInstructions: instruction
    } = data

    const validIngredient = Object.keys(data).filter(key => key.startsWith('strIngredient') && data[key] !== null).map(key => data[key])



    return (
        <Wrapper>
            <header>
                <Link to={'/'} className="btn"> Back Home </Link>
                <h3>{name}</h3>
            </header>
            <div className="drink">
                <img src={image} alt={name} className="img" />
                <div className="drink-info">
                    <p>
                        <span className="drink-data">name :</span>
                        {name}
                    </p>
                    <p>
                        <span className="drink-data">category :</span>
                        {category}
                    </p>
                    <p>
                        <span className="drink-data">info :</span>
                        {info}
                    </p>
                    <p>
                        <span className="drink-data">glass :</span>
                        {glass}
                    </p>
                    <p>
                        <span className="drink-data">Ingredients :</span>
                        {
                            validIngredient.map((item, index) => {
                                return <span className="ing" key={index}>
                                    {item}{index < validIngredient.length - 1 ? ',' : ''}
                                </span>
                            })
                        }
                    </p>
                    <p>
                        <span className="drink-data">instruction :</span>
                        {instruction}
                    </p>

                </div>
            </div>
        </Wrapper>
    )
}

export default Cocktail







