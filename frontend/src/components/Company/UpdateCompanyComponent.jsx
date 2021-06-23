import React, { Component } from 'react'
import CompanyService from '../../services/CompanyService';

import * as UserService from  '../../services/user.service';

class UpdateCompanyComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            currentUser: {},
            companycode: '',
            name: '',
            ceoname: '',
            turnover: '',
            boardDirectors: '',
            brief:'',
            sector: {id: ''},
        }
        this.changeCompanyCodeHandler = this.changeCompanyCodeHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeCeoNameHandler = this.changeCeoNameHandler.bind(this);
        this.changeTurnoverHandler = this.changeTurnoverHandler.bind(this);
        this.changeBoardDirectorsHandler = this.changeBoardDirectorsHandler.bind(this);
        this.changeBriefHandler = this.changeBriefHandler.bind(this);
        this.changeSectorHandler = this.changeSectorHandler.bind(this);
        this.updateCompany = this.updateCompany.bind(this);
    }

    componentDidMount(){
        CompanyService.getCompanyById(this.state.id).then( (res) =>{
            let company = res.data;
            this.setState({companycode: company.companycode,
                name: company.name,
                ceoname: company.ceoname,
                turnover: company.turnover,
                boardDirectors: company.boardDirectors,
                brief: company.brief,
                sector:{id: company.sector.id}
            });
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    updateCompany = (e) => {
        e.preventDefault();
        let company = {companycode: this.state.companycode,
            name: this.state.name,
            ceoname: this.state.ceoname,
            turnover: this.state.turnover,
            boardDirectors: this.state.boardDirectors,
            brief: this.state.brief,
            sector: {id: this.state.sector.id}
        };
        CompanyService.updateCompany(company, this.state.id).then( res => {
            this.props.history.push('/company/all');
        });
    }
    
    changeCompanyCodeHandler= (event) => {
        this.setState({companycode: event.target.value});
    }

    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeCeoNameHandler= (event) => {
        this.setState({ceoname: event.target.value});
    }

    changeTurnoverHandler= (event) => {
        this.setState({turnover: event.target.value});
    }

    changeBoardDirectorsHandler= (event) => {
        this.setState({boardDirectors: event.target.value});
    }

    changeBriefHandler= (event) => {
        this.setState({brief: event.target.value});
    }

    changeSectorHandler= (event) => {
        this.setState({sector: {id: event.target.value}});
    }

    cancel(){
        this.props.history.push('/company/all');
    }

    render() {
        return (
            <>
            {this.state.currentUser.isAdmin === "YES" ? 
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Employee</h3>
                                <div className = "card-body">
                                <form>
                                        <div className = "form-group">
                                            <label> Company Code: </label>
                                            <input placeholder="Company Code" name="companycode" className="form-control" 
                                                value={this.state.companycode} onChange={this.changeCompanyCodeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Company Name: </label>
                                            <input placeholder="Company Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> CEO Name: </label>
                                            <input placeholder="CEO Name" name="ceoname" className="form-control" 
                                                value={this.state.ceoname} onChange={this.changeCeoNamelHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Turnover: </label>
                                            <input placeholder="Turnover" name="turnover" className="form-control" 
                                                value={this.state.turnover} onChange={this.changeTurnoverlHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Board Of Directors: </label>
                                            <input placeholder="Board Of Directors" name="boardDirectors" className="form-control" 
                                                value={this.state.boardDirectors} onChange={this.changeBoardDirectorsHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Brief: </label>
                                            <input placeholder="Brief" name="brief" className="form-control" 
                                                value={this.state.brief} onChange={this.changeBriefHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Sector Id: </label>
                                            <input placeholder="Sector Id" name="sectorId" className="form-control" 
                                                value={this.state.sector.id} onChange={this.changeSectorHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateCompany}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
            :
            <div>You are not authorized!!!</div>
        }
            </>
        )
    }
}

export default UpdateCompanyComponent
