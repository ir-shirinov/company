import React from 'react';
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class CompanyPage extends React.Component {
    state = {
        name: null,
        ogrn: null,
        type: null,
        startDate: null,
        active: null,
        id: null,
        isSave: false,
        isLoading: false,
    }

    //Изменение state при изменении данных компании, устанавливаем флаг что есть изменения - isSave
    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value,
            isSave: false,
        })
    }

    //Изменение state при выборе даты, устанавливаем флаг что есть изменения - isSave
    handleChange = (date) => {
        this.setState({
            startDate: date,
            isSave: false,
        })
    }

    //При сохранении переписываем значения из state в данные компании(без переноса в бекенд)
    handleChangeCompany = () => {
      	const { name, ogrn, type, startDate, active} = this.state;
        const companies = this.props.data;
        const id = this.props.match.params.id - 1;

      	companies[id].name = name;
        companies[id].ogrn = ogrn;
        companies[id].type = type;
        companies[id].date = startDate.toISOString();
        companies[id].active = active;

        this.setState({
            isSave: true,
        });
    }

    //Переносим данные компании в state при их загрузке
    static getDerivedStateFromProps(props, state) {
      	const companies = props.data;
      	const id = props.match.params.id - 1;

      	if (!Array.isArray(companies) || state.isLoading) { 
      		return null
      	}

      	return {
      		name: companies[id].name,
    		ogrn: companies[id].ogrn,
    		type: companies[id].type,
    		startDate: new Date(Date.parse(companies[id].date)),
    		active: companies[id].active,
    		id: companies[id].id,
    		isLoading: true,
      	}
    }

  render() {
  	
  	const { name, ogrn, type, startDate, active, id, isSave, isLoading } = this.state;

    return (
		<React.Fragment>
			{isLoading && (
				<div className="edit">
					<input 
                        className="edit__text"
						type="text" 
						onChange={this.handleInputChange}
						value={name}
						name="name"/>
					<input 
                        className="edit__text"
						type="text"
						onChange={this.handleInputChange}
						value={ogrn}
						name="ogrn"/>
					<select className="edit__select" value={type} onChange={this.handleInputChange} name="type">
					   <option value="IP">ИП</option>
					   <option value="OOO">ООО</option>
					</select>
					<DatePicker
                        className="edit__select"
				        selected={startDate}
			       		onChange={this.handleChange} />
                    <div className="edit__checkbox">
                        <span className="edit__active">Компания активна</span>
    					<input 
    						type="checkbox"
    						onChange={this.handleInputChange}
    						checked={active}
    						name="active"
    						/>
                    </div>
					<button 
                        className="button"
                        type="button" 
                        onClick={this.handleChangeCompany}>
                        Сохранить
                    </button>
					<Link className="button" to="/">Назад</Link>
				</div>
			)}
			
			{ isSave && isLoading && (
		    	<div className="company-page__save">
                    <p className="company-page__title">Новые данные</p>
                    <table className="company-page__table">
                        <tr>
                            <th className="company-page__table-header">Название</th>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <th className="company-page__table-header">ID</th>
                            <td>{id}</td>
                        </tr>
                        <tr>
                            <th className="company-page__table-header">ОГРН</th>
                            <td>{ogrn}</td>
                        </tr>
                        <tr>
                            <th className="company-page__table-header">Тип компании</th>
                            <td>{type}</td>
                        </tr>
                        <tr>
                            <th className="company-page__table-header">Дата открытия</th>
                            <td>{ `${startDate.getDate()}.${startDate.getMonth()}.${startDate.getFullYear()} г.`}</td>
                        </tr>
                        <tr>
                            <th className="company-page__table-header">Компания активна</th>
                            <td>{active? 'ДА' : 'НЕТ'}</td>
                        </tr>
                    </table>
		    	</div>
		    )}

		    { !isLoading && (<p className="loading">Скачиваем данные с сервера ООН...</p>)} 
	    </React.Fragment>
    );
  }
}

export default CompanyPage;
