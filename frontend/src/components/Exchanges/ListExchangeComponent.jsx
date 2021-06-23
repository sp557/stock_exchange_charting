import React, { Component } from 'react'
import ExchangeService from '../../services/ExchangeService'
import '../styling.css';
import * as UserService from  '../../services/user.service';

class ListExchangeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                exchanges: [],
                currentUser: {}
        }
        this.addExchange = this.addExchange.bind(this);
        this.editExchange = this.editExchange.bind(this);
        this.deleteExchange = this.deleteExchange.bind(this);
    }

    deleteExchange(id){
        ExchangeService.deleteExchange(id).then( res => {
            this.setState({exchanges: this.state.exchanges.filter(exchange => exchange.id !== id)});
        });
    }
    viewExchange(id){
        this.props.history.push(`/exchanges/${id}/show`);
    }
    editExchange(id){
        this.props.history.push(`/exchanges/${id}/edit`);
    }

    componentDidMount(){
        ExchangeService.getExchanges().then((res) => {
            this.setState({ exchanges: res.data});
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    addExchange(){
        this.props.history.push('/exchanges/new');
    }

    render() {
        return (
            <>
            <div>
                 <h2 className="text-center">Exchanges List</h2>
                 {this.state.currentUser.isAdmin === "YES" ?
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addExchange}> Add Exchange</button>
                 </div>
                 :
                 <div></div>
                 }
                 <br></br>
                 <div className = "row">
                        <table id="mytable">

                            <thead>
                                <tr>
                                    <th> Exchange Name</th>
                                    <th> Exchange Intro</th>
                                    <th> Exchange Address</th>
                                    <th> Exchange Remarks</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.exchanges.map(
                                        exchange => 
                                        <tr key = {exchange.id}>
                                             <td> { exchange.name} </td>   
                                             <td> { exchange.intro} </td>
                                             <td> { exchange.address} </td>
                                             <td> { exchange.remarks} </td>
                                             <td>
                                             {this.state.currentUser.isAdmin === "YES" ?
                                                 <span>
                                                 <button onClick={ () => this.editExchange(exchange.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteExchange(exchange.id)} className="btn btn-danger">Delete </button>
                                                 </span>
                                                 :
                                                 <div></div>
                                                }
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewExchange(exchange.id)} className="btn btn-info">View </button>
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

export default ListExchangeComponent
