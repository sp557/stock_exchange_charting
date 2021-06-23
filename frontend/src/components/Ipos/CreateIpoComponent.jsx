import React, { Component } from 'react'
import IpoService from '../../services/IpoService';

import * as UserService from  '../../services/user.service';

class CreateIpoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            currentUser: {},
            price: '',
            totalNumber: '',
            timestamp: '',
            remarks: '',
            company: {id: ''},
            stockExchange: {id: ''}
        }
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeTotalNumberHandler = this.changeTotalNumberHandler.bind(this);
        this.changeTimestampHandler = this.changeTimestampHandler.bind(this);
        this.changeRemarksHandler = this.changeRemarksHandler.bind(this);
        this.changeCompanyHandler = this.changeCompanyHandler.bind(this);
        this.changeStockExchangeHandler = this.changeStockExchangeHandler.bind(this);
        this.saveIpo = this.saveIpo.bind(this);
    }

    // step 3
    componentDidMount(){

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
        
    }

    saveIpo = (e) => {
        e.preventDefault();
        let ipo = {price: this.state.price,
            totalNumber: this.state.totalNumber,
            timestamp: this.state.timestamp,
            remarks: this.state.remarks,
            company: {id: this.state.company.id},
            stockExchange: {id: this.state.stockExchange.id}
        }
        IpoService.createIpo(ipo).then(res =>{
            this.props.history.push('/ipo/all');
        });
        
    }
    
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }

    changeTotalNumberHandler= (event) => {
        this.setState({totalNumber: event.target.value});
    }

    changeTimestampHandler= (event) => {
        this.setState({timestamp: event.target.value});
    }

    changeRemarksHandler= (event) => {
        this.setState({remarks: event.target.value});
    }

    changeCompanyHandler= (event) => {
        this.setState({company: { id : event.target.value}});
    }

    changeStockExchangeHandler= (event) => {
        this.setState({stockExchange: { id : event.target.value}});
    }

    cancel(){
        this.props.history.push('/ipo/all');
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
                            <h3 className="text-center">Add IPO</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Price: </label>
                                            <input placeholder="Price" name="price" className="form-control" 
                                                value={this.state.price} onChange={this.changePriceHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Total No of IPOs: </label>
                                            <input placeholder="Total Number of IPOs" name="totalNumber" className="form-control" 
                                                value={this.state.totalNumber} onChange={this.changeTotalNumberHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Date and Time: </label>
                                            <input placeholder="Date and Time" name="timestamp" className="form-control" 
                                                value={this.state.timestamp} onChange={this.changeTimestampHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Remarks: </label>
                                            <input placeholder="First Name" name="firstName" className="form-control" 
                                                value={this.state.remarks} onChange={this.changeRemarksHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Company Id: </label>
                                            <input placeholder="Company Id" name="companyId" className="form-control" 
                                                value={this.state.company.id} onChange={this.changeCompanyHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Stock Exchange Id: </label>
                                            <input placeholder="Stock Exchange Id" name="stockExchangeId" className="form-control" 
                                                value={this.state.stockExchange.id} onChange={this.changeStockExchangeHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveIpo}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
            :
            <div>You are not authorized!!</div>
            }
        </>
        )
    }
}

export default CreateIpoComponent
