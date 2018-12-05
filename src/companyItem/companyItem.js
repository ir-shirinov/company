import React, { Component } from 'react';

class CompanyItem extends Component {

  edit() {
    console.log('Редактирование');
  }

  render() {
    const company = this.props.item;
    return (
      <li 
        className={company.active? 'company__item company__item--active' : 'company__item'} 
        onClick={this.edit}>
        <p className="company__id">ID : {company.id}</p>
        <p className="company__name">{company.name}</p>
        <p className="company__ogrn">ОГРН : {company.ogrn}</p>
        <p className="company__type">Тип компании : {company.type}</p>
        <p className="company__date">Дата открытия : {company.date.toLocaleString()}</p>
        <p className="company__active">Компания активна : {company.active? 'ДА' : 'НЕТ'}</p>
      </li>
    );
  }
  
}

export default CompanyItem;
