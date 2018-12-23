import React from 'react';
import { Link } from 'react-router-dom';


class CompanyList extends React.Component {
    render() {
        const companies = this.props.data;

        return (
            <React.Fragment>
                {Array.isArray(companies) && 
                    (<React.Fragment>
                        <ul className="company-list">
                            {companies.map((item) =>
                                <li key={item.id} className={item.active ? 'company__item company__item--active' : 'company__item'}>
                                    <Link to={`/company/${item.id}`} className="company-list__link">{item.name}</Link>
                                </li>)}
                        </ul>
                    </React.Fragment>)}

                {!Array.isArray(companies) && (<p className="loading">Eще немного и данные загрузятся ...если бэк не подвел...</p>)}
            </React.Fragment>
        );
    }
}

export default CompanyList;