import React, { Component } from 'react'
import CompanyService from '../../services/CompanyService';
import '../styling.css';
import * as UserService from  '../../services/user.service';

class ListCompanyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                companies: [],
                currentUser: {}
        }
        this.addCompany = this.addCompany.bind(this);
        this.editCompany = this.editCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    deleteCompany(id){
        CompanyService.deleteCompany(id).then( res => {
            this.setState({companies: this.state.companies.filter(company => company.id !== id)});
        });
    }
    viewCompany(id){
        this.props.history.push(`/company/${id}/show`);
    }
    editCompany(id){
        this.props.history.push(`/company/${id}/edit`);
    }

    componentDidMount(){
        CompanyService.getCompanies().then((res) => {
            this.setState({ companies: res.data});
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    addCompany(){
        this.props.history.push('/company/new');
    }

    render() {
        return (
            <>
            
            <div>
                 <h2 className="text-center">Company List</h2>
                 {this.state.currentUser.isAdmin === "YES" ?
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addCompany}> Add Company</button>
                 </div>
                 :
                 <div></div>
                 }
                 <br></br>
                 <div className = "row">
                        <table id="mytable">

                            <thead>
                                <tr>
                                    <th> Company Code</th>
                                    <th> Company Name</th>
                                    <th> CEO Name</th>
                                    <th> Turnover</th>
                                    <th> Brief</th>
                                    <th> Board Of Directors</th>
                                    <th> Sector</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.companies.map(
                                        company => 
                                        <tr key = {company.id}>
                                             <td> { company.companycode} </td>   
                                             <td> {company.name}</td>
                                             <td> {company.ceoname}</td>
                                             <td> {company.turnover}</td>
                                             <td> {company.brief}</td>
                                             <td> {company.boardDirectors}</td>
                                             <td> {company.sector.id}</td>
                                             <td>
                                                 {this.state.currentUser.isAdmin === "YES" ?
                                                 <span>
                                                 <button onClick={ () => this.editCompany(company.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCompany(company.id)} className="btn btn-danger">Delete </button>
                                                 </span>
                                                 :
                                                 <div></div>
                                                }
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCompany(company.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
            </>
        )
    }
}

export default ListCompanyComponent
