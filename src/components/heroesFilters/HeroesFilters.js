// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import {fetchFilters, filterSet} from '../../actions';

import Spinner from '../spinner/Spinner';

let classNames = require('classnames');

const HeroesFilters = () => {
    const {request} = useHttp();
    const {filters, filtersLoadingStatus, filterValue} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters(request));
    }, []);

    const renderButtons = (arr, status) => {
        if (status === 'loading') {
            return <Spinner />;
        } else if (status === 'error') {
            return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
        }
        return arr.map(item => {
            const {filter, label} = item;
            let btnClass = classNames('btn', {
                'active': filter === filterValue,
                'btn-outline-dark': label === 'Все',
                'btn-danger': label === 'Огонь',
                'btn-primary': label === 'Вода',
                'btn-success': label === 'Ветер',
                'btn-secondary': label === 'Земля'
            });
            return <button key={label} onClick={() => dispatch(filterSet(filter))} className={btnClass}>{label}</button>
        })
    }

    const buttons = renderButtons(filters, filtersLoadingStatus);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;