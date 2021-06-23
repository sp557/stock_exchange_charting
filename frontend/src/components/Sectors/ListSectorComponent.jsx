import React, { Component } from 'react'
import SectorService from '../../services/SectorService'
import '../styling.css';
import * as UserService from  '../../services/user.service';

class ListSectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                sectors: [],
                currentUser: {}
        }
        this.addSector = this.addSector.bind(this);
        this.editSector = this.editSector.bind(this);
        this.deleteSector = this.deleteSector.bind(this);
    }

    deleteSector(id){
        SectorService.deleteSector(id).then( res => {
            this.setState({sectors: this.state.sectors.filter(sector => sector.id !== id)});
        });
    }
    viewSector(id){
        this.props.history.push(`/sector/${id}/show`);
    }
    editSector(id){
        this.props.history.push(`/sector/${id}/edit`);
    }

    componentDidMount(){
        SectorService.getSectors().then((res) => {
            this.setState({ sectors: res.data});
        });

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
    }

    addSector(){
        this.props.history.push('/sector/new');
    }

    render() {
        return (
            <>
            <div>
                 <h2 className="text-center">Sectors List</h2>
                 {this.state.currentUser.isAdmin === "YES" ?
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addSector}> Add Sector</button>
                 </div>
                 :
                 <div></div>
                 }
                 <br></br>
                 <div className = "row">
                        <table id="mytable">

                            <thead>
                                <tr>
                                    <th> Sector Name</th>
                                    <th> Sector Brief</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.sectors.map(
                                        sector => 
                                        <tr key = {sector.id}>
                                             <td> { sector.sectorName} </td>   
                                             <td> {sector.sectorBrief}</td>
                                             <td>
                                             {this.state.currentUser.isAdmin === "YES" ?
                                                 <span>
                                                 <button onClick={ () => this.editSector(sector.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteSector(sector.id)} className="btn btn-danger">Delete </button>
                                                 </span>
                                                 :
                                                 <div></div>
                                                }
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewSector(sector.id)} className="btn btn-info">View </button>
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

export default ListSectorComponent
