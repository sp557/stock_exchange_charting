import React, { Component } from 'react'
import ExchangeService from '../../services/ExchangeService';

import * as UserService from  '../../services/user.service';

class UpdateExchangeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            currentUser:{},
            name: '',
            intro: '',
            address: '',
            remarks:''
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeIntroHandler = this.changeIntroHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeRemarksHandler = this.changeRemarksHandler.bind(this);
        this.updateExchange = this.updateExchange.bind(this);
    }

    componentDidMount(){
        ExchangeService.getExchangeById(this.state.id).then( (res) =>{
            let exchange = res.data;
            this.setState({name: exchange.name,
                intro: exchange.intro,
                address : exchange.address,
                remarks: exchange.remarks
            });
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    updateExchange = (e) => {
        e.preventDefault();
        let exchange = {name: this.state.name, intro: this.state.intro, 
            address: this.state.address, remarks: this.state.remarks};
        ExchangeService.updateExchange(exchange, this.state.id).then( res => {
            this.props.history.push('/exchanges/all');
        });
    }
    
    changeNameHandler= (event) => {
        this.setState({name: event.target.value});
    }

    changeIntroHandler= (event) => {
        this.setState({intro: event.target.value});
    }

    changeAddressHandler= (event) => {
        this.setState({address: event.target.value});
    }

    changeRemarksHandler= (event) => {
        this.setState({remarks: event.target.value});
    }

    cancel(){
        this.props.history.push('/exchanges/all');
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
                                <h3 className="text-center">Update Exchange</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Name: </label>
                                            <input placeholder="Name" name="name" className="form-control" 
                                                value={this.state.name} onChange={this.changeNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Intro: </label>
                                            <input placeholder="Intro" name="intro" className="form-control" 
                                                value={this.state.intro} onChange={this.changeIntroHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Address: </label>
                                            <input placeholder="Address" name="address" className="form-control" 
                                                value={this.state.address} onChange={this.changeAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Remarks: </label>
                                            <input placeholder="Remarks" name="remarks" className="form-control" 
                                                value={this.state.remarks} onChange={this.changeRemarksHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateExchange}>Save</button>
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

export default UpdateExchangeComponent
