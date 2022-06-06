import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import {heroeAdd, fitersFetch} from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('Я владею элементом...');

    const {request} = useHttp();
    const {filters} = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        request("http://localhost:3001/filters")
            .then(data => dispatch(fitersFetch(data)))
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const newHeroe = {id: uuidv4(), name, description, element};
        dispatch(heroeAdd(newHeroe));
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHeroe))
    }

    const renderOptions = (arr) => {
        const items = arr.map(item => {
            const {filter, label} = item;
            return filter !== 'all' ? <option key={filter} value={filter}>{label}</option> : null;
        });
        return (
            <>
                <option >Я владею элементом...</option>
                {items}
            </>
        )
    }
    const options = renderOptions(filters);

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