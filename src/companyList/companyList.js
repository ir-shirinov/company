import React, { Component } from 'react';

import CompanyItem from '../companyItem/companyItem';

class CompanyList extends Component {
  render() {
    return (
      <div className="company">
        <ul className="company__list">
          {this.props.company.map((item) =>
            <CompanyItem key={item.id} item={item} />
          )}
        </ul>
      </div>
    );
  }
}

export default CompanyList;