// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import {heroeAdd} from '../heroesList/heroesSlice';
import {selectAll} from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const {request} = useHttp();
    const filters = useSelector(selectAll);
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const newHeroe = {
            id: uuidv4(),
            name,
            description,
            element
        };
        
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHeroe))
            .then(dispatch(heroeAdd(newHeroe)))
            .catch(error => console.log(error))
        
        setName('');
        setDescription('');
        setElement('');
    }

    const renderOptions = (arr, status) => {
        if (status === 'loading') {
            return <option>Идет загрузка...</option>;
        } else if (status === 'error') {
            return <option>Ошибка загрузки</option>;
        }
        const items = arr.map(item => {
            const {filter, label} = item;
            return filter !== 'all' ? <option key={filter} value={filter}>{label}</option> : null;
        });
        return (
            <>
                <option>Я владею элементом...</option>
                {items}
            </>
        )
    }
    const options = renderOptions(filters, filtersLoadingStatus);

    return (
        <form onSubmit={onSubmit} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e) => setElement(e.target.value)} >
                    {options}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;