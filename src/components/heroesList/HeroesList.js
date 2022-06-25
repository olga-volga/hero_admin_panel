// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import {useHttp} from '../../hooks/http.hook';
import {fetchHeroes, heroeDelete, filteredHeroesSelector} from './heroesSlice';

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

import './heroesList.scss';

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);

    // before combining reducers
    // const filteredHeroes = useSelector(state => {
    //     return state.filters.filterValue === 'all' ? state.heroes.heroes : state.heroes.heroes.filter(item => item.element === state.filters.filterValue);
    // });

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);

    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const deleteHeroe = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(dispatch(heroeDelete(id)))
            .catch(error => console.log(error))
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition timeout={600} classNames="hero">
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>
            )
        }
        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition key={id} timeout={600} classNames="hero">
                    <HeroesListItem {...props} deleteHeroe={() => deleteHeroe(id)} />
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;