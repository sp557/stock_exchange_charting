import React, { Component } from 'react'
import IpoService from '../../services/IpoService'
import * as UserService from  '../../services/user.service';
import '../styling.css';

class ListIpoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                ipos: [],
                currentUser:{}
        }
        this.addIpo = this.addIpo.bind(this);
        this.editIpo = this.editIpo.bind(this);
        this.deleteIpo = this.deleteIpo.bind(this);
    }

    deleteIpo(id){
        IpoService.deleteIpo(id).then( res => {
            this.setState({ipos: this.state.ipos.filter(ipo => ipo.id !== id)});
        });
    }
    viewIpo(id){
        this.props.history.push(`/ipo/${id}/show`);
    }
    editIpo(id){
        this.props.history.push(`/ipo/${id}/edit`);
    }

    componentDidMount(){
        IpoService.getIpos().then((res) => {
            this.setState({ ipos: res.data});
        });
        
        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    addIpo(){
        this.props.history.push('/ipo/new');
    }

    render() {
        return (
            <>
            <div>
                 <h2 className="text-center">IPOs List</h2>
                 {this.state.currentUser.isAdmin === "YES" ?
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addIpo}> Add IPO</button>
                 </div>
                 :
                 <div></div>
                 }
                 <br></br>
                 <div className = "row">
                        <table id="mytable">

                            <thead>
                                <tr>
                                    <th> IPO Price </th>
                                    <th> Total Number of IPOs </th>
                                    <th> Date and Time </th>
                                    <th> Remarks </th>
                                    <th> Company Id </th>
                                    <th> Stock Exchange Id </th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.ipos.map(
                                        ipo => 
                                        <tr key = {ipo.id}>
                                             <td> { ipo.price} </td>   
                                             <td> { ipo.totalNumber} </td>  
                                             <td> { ipo.timestamp} </td>  
                                             <td> { ipo.remarks} </td>  
                                             <td> { ipo.company.id} </td>  
                                             <td> { ipo.stockExchange.id} </td>  
                                             <td>
                                             {this.state.currentUser.isAdmin === "YES" ?
                                                 <span>
                                                 <button onClick={ () => this.editIpo(ipo.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteIpo(ipo.id)} className="btn btn-danger">Delete </button>
                                                 </span>
                                                 :
                                                 <div></div>
                                                }
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewIpo(ipo.id)} className="btn btn-info">View </button>
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

export default ListIpoComponent
