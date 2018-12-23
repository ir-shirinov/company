import React from 'react';
import CompanyList from './companyList/companyList';
import CompanyPage from './companyPage/companyPage';
import CompanyEdit from './companyEdit/companyEdit';
import { Route, Switch } from 'react-router-dom';
import * as axios  from 'axios';


class App extends React.Component {

	state = {
    	companies: null,
  	}

	//Загрузка данные через axios c задержкой для псевдореализации удаленной загрузки с сервера
	componentDidMount() {
	    axios.get('http://localhost:3000/data/companies.json')
	    .then(response => {
	    	setTimeout(() => {
	          this.setState({ companies: response.data})
	      }, 2000)
	    })
	};
	

	render() {
		const companies = this.state.companies;

	    return (
	    	<Switch>
		    	<Route 
		    		path="/" 
		    		exact 
		    		render={()=><CompanyList data={companies}/>} />
		    	<Route 
		    		path="/company/edit/:id" 
		    		render={routeProps => <CompanyEdit data={companies} {...routeProps}/>} />
		    	<Route 
		    		path="/company/:id" 
		    		render={routeProps => <CompanyPage data={companies} {...routeProps}/>} />    	
		    </Switch>
	    );
	}
}

export default App;
