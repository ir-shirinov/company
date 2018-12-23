import React from 'react';
import { Link } from 'react-router-dom';

class CompanyPage extends React.Component {

    render() {
        const companies = this.props.data;
        let company, startDate;

      	if (Array.isArray(companies)) {
      		company = this.props.data[this.props.match.params.id - 1];
      		startDate = new Date(Date.parse(company.date));
      	}

        return (
            <React.Fragment>
                {Array.isArray(companies) && 
                	(<div className="company-page">
                        <table className="company-page__table">
                            <tr>
                                <th className="company-page__table-header">Название</th>
                                <td>{company.name}</td>
                            </tr>
                            <tr>
                                <th className="company-page__table-header">ID</th>
                                <td>{company.id}</td>
                            </tr>
                            <tr>
                                <th className="company-page__table-header">ОГРН</th>
                                <td>{company.ogrn}</td>
                            </tr>
                            <tr>
                                <th className="company-page__table-header">Тип компании</th>
                                <td>{company.type}</td>
                            </tr>
                            <tr>
                                <th className="company-page__table-header">Дата открытия</th>
                                <td>{`${startDate.getDate()}.${startDate.getMonth()}.${startDate.getFullYear()} г.`}</td>
                            </tr>
                            <tr>
                                <th className="company-page__table-header">Компания активна</th>
                                <td>{company.active? 'ДА' : 'НЕТ'}</td>
                            </tr>
                        </table>
        				<Link className="button" to={`/company/edit/${company.id}`}>Редактировать</Link>
        				<Link className="button" to="/">Назад</Link>
        			</div>)}
                {!Array.isArray(companies) && (<p className="loading">Еще немного и мы подгрузим всех поставщиков Пентагона...</p>)}
            </React.Fragment>
        );
    
  }
}

export default CompanyPage;
