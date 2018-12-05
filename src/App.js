import React, { Component } from 'react';
import data from './data';
import './company.css';
import CompanyList from './companyList/companyList';

class App extends Component {
  render() {
    return (
      <CompanyList company={data} /> 
    );
  }
}

export default App;
