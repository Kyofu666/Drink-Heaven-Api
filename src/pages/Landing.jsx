import axios from "axios";
import { useLoaderData } from "react-router-dom"
import CocktailList from "../components/CocktailList";
import SearchForm from "./SearchForm";
import { useQuery } from "@tanstack/react-query";
const cocktailSearchUrl =
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';


const searchCocktailsQuery = (searchTerm) => {
    return {
        queryKey: ['search', searchTerm || 'all'],
        queryFn: async () => {
            const { data } = await axios.get(`${cocktailSearchUrl}${searchTerm}`)

            return data.drinks
        }
    }
}

export const loader = (queryClient) => async ({ request }) => {
    const url = new URL(request.url)
    const searchTerm = url.searchParams.get('search') || ''
    await queryClient.ensureQueryData(searchCocktailsQuery(searchTerm))
    return { searchTerm }
}


const Landing = () => {
    const { searchTerm } = useLoaderData()
    const { data: drinks } = useQuery(searchCocktailsQuery(searchTerm))


    // // Using Query and Axios 
    // const [drinks, setDrinks] = useState([])

    // const { data, isLoading } = useQuery({
    //     queryKey: ['drinks'],
    //     queryFn: () => axios.get(cocktailSearchUrl)
    // })



    // useEffect(() => {
    //     if (!isLoading && data) {
    //         setDrinks(data.data.drinks);
    //     }
    // }, [isLoading, data])

    // using Fetch and Axios 
    // const [drinks, setDrinks] = useState([])
    // const fetchData = async () => {
    //     try {
    //         const { data } = await axios.get(cocktailSearchUrl)
    //         setDrinks(data.drinks)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    return (
        <>
            <SearchForm searchTerm={searchTerm} />
            <CocktailList drinks={drinks} />
        </>
    )
}

export default Landing
