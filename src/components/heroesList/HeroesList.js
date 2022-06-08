// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { heroesFetching, heroesFetched, heroesFetchingError, heroeDelete } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, filterValue} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

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
                <CSSTransition timeout={600} classNames="hero">
                    <HeroesListItem key={id} {...props} deleteHeroe={() => deleteHeroe(id)} />
                </CSSTransition>
            )
        })
    }

    const filterHeroes = (arr, filter) => {
        return filter === 'all' ? arr : arr.filter(item => item.element === filter);
    }

    const elements = renderHeroesList(filterHeroes(heroes, filterValue));
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;