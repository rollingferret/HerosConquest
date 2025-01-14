import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserHeroes } from "../../store/heroes";
import SingleHero from "../SingleHero";
import "./HeroesIndex.css";


const HeroesIndex = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.session.user?.id);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);

    console.log(userHeroes)

    useEffect(() => {
        dispatch(getUserHeroes(userId));
    }, [dispatch, userId]);

    return (
        <div className="heroes-wrapper">
            <h2 className="heroes-header">Your Heroes:</h2>
               <div className="heroes-holder">
                    {userHeroes && userHeroes.map(hero => (
                        <SingleHero key={hero.id} hero={hero} />
                    ))}
                <Link className="heroes-create" to="/heroes/create">
                    <div className="hc-head">Create New Hero</div>
                <i className="fa-regular fa-square-plus"/>
                </Link>
            </div>
        </div>
    );
};

export default HeroesIndex;
