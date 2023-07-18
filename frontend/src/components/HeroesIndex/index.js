import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserHeroes, getUserPlayings } from "../../store/heroes";
import CurrentlyPlaying from "../CurrentlyPlaying";
import SingleHero from "../SingleHero";
import "./HeroesIndex.css";


const HeroesIndex = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector(state => state.session.user.id);
    const heroesObj = useSelector(state => state.heroes.userHeroes);
    const userHeroes = Object.values(heroesObj);
    const playingsObj = useSelector(state => state.heroes.playing);
    const playings = Object.values(playingsObj);
    const currPlaying = playings.find(play => play.userId === userId);
    const currPlayingHero = currPlaying ? userHeroes.find(hero => hero.id === currPlaying.heroId) : null;

    console.log('[playings]', playings)


    useEffect(() => {
        // dispatch(getUserPlayings(userId));
        dispatch(getUserHeroes(userId));
    }, [dispatch, userId]);

    return (
        <div className="heroes-wrapper">
            <h2 className="heroes-header">Select Your Hero:</h2>
               <div className="heroes-holder">
                    {userHeroes && userHeroes.map(hero => (
                        <SingleHero key={hero.id} hero={hero} />
                    ))}
                <Link className="heroes-create" to="/heroes/create">Create New Hero</Link>
            </div>
        </div>
    );
};

export default HeroesIndex;
