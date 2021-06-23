import React, { Component } from 'react'
import SectorService from '../../services/SectorService';
import * as UserService from  '../../services/user.service';

class CreateSectorComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            currentUser: {},
            sectorName: '',
            sectorBrief: ''
        }
        this.changeSectorNameHandler = this.changeSectorNameHandler.bind(this);
        this.changeBriefHandler = this.changeBriefHandler.bind(this);
        this.saveSector = this.saveSector.bind(this);
    }

    componentDidMount(){

        if(localStorage.getItem('username')){
            UserService.getUserDetails().then( res => {
                this.setState({currentUser: res.data});
            })
        }
   
    }
    saveSector = (e) => {
        e.preventDefault();
        let sector = {sectorName: this.state.sectorName, sectorBrief: this.state.sectorBrief};
        SectorService.createSector(sector).then(res =>{
            this.props.history.push('/sector/all');
        });
        
    }
    
    changeSectorNameHandler= (event) => {
        this.setState({sectorName: event.target.value});
    }

    changeBriefHandler= (event) => {
        this.setState({sectorBrief: event.target.value});
    }

    cancel(){
        this.props.history.push('/sector/all');
    }

    render() {
        return (
            <>
            {/* {this.state.currentUser.isAdmin === "YES" ? */}
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center">Add Sector</h3>
                                <div className = "card-body">
                                    <form>
                                    <div className = "form-group">
                                            <label> Sector Name: </label>
                                            <input placeholder="Sector Name" name="sectorName" className="form-control" 
                                                value={this.state.sectorName} onChange={this.changeSectorNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Sector Brief: </label>
                                            <input placeholder="Sector Brief" name="sectorBrief" className="form-control" 
                                                value={this.state.sectorBrief} onChange={this.changeBriefHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveSector}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
            {/* // :
            // <div>You are not authorized!!</div>
            // } */}
        </>
        )
    }
}

export default CreateSectorComponent
