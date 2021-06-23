import React, { Component } from 'react';
import { Form, FormControl, Button ,FormGroup} from "react-bootstrap";
import { FaSearch} from 'react-icons/fa';

class Search extends Component {

 state = {
    results: [],
    searchText: ''
 }

 componentWillMount () {
   document.addEventListener('mousedown', this.handleClick, false);
 }

 componentWillUnmount () {
  document.removeEventListener('mousedown', this.handleClick, false);
 }

 handleClick = (e) => {
   if(!this.node.contains(e.target)) {
      this.setState({
        results: []
      })
   }
 }


 getInfo = () => {
    this.setState({
      results: this.props.companies.filter(
        (m) => {
          return m.name.indexOf(this.state.searchText)!==-1;
        }
      )
    })
  }

 handleInputChange = (e) => {
   const value = e.target.value;
    this.setState({
      searchText: value
    }, () => {
      if (this.state.searchText.length === 0) {
        this.setState({
          results: []
        })
      }
      else {
        this.getInfo()
      }
    })
  }

  handleSearchSubmit = () => {
    this.props.setParentCompany(this.state.searchText);
  }

  suggestionsSelected (value) {
    this.setState({
      searchText: value,
      results: []
    });
  }
  

 render() {

  const Suggestions = (props) => {
    let options;
      options = props.results.map(r => (
        <ul key={r.id} onClick={() => this.suggestionsSelected(r.name)}>
          {r.name}
        </ul>
    ))
    return <ul className="list-unstyled" >{options}</ul>
  }

   return (
     
     <div className="Search" ref={node=> this.node = node}>
        <Form inline onSubmit={this.handleFormSubmit}>
          <FormGroup>
          <FormControl
            onChange={this.handleInputChange}
            onClick={this.handleInputChange}
            value={this.state.searchText}
            type="text"
            placeholder="Search Company..."
            className="m-auto"
            size="sm"
          />
          <Button onClick={this.handleSearchSubmit} size="sm" style={{ backgroundColor: '#12A28C'}}>
              <FaSearch/>
          </Button> 
          </FormGroup> 
        </Form>
        {this.state.results.length!==0 ?
            <Suggestions results={this.state.results} />
            :
            <div></div>
        }
      </div>
   )
 }
}

export default Search;