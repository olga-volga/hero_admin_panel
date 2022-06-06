import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import {fitersFetch, filterSet} from '../../actions';

let classNames = require('classnames');

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {request} = useHttp();
    const {filters, filterValue} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(fitersFetch(data)))
    }, []);

    const renderButtons = (arr) => {
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

    const buttons = renderButtons(filters);

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