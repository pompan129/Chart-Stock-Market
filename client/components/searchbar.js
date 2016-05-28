/**
 * Created by fazbat on 5/28/2016.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNewStock } from '../actions/index';

class SearchBar extends Component {

    constructor(props) {
        super(props);

        this.state = {term:""};
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({ term: event.target.value });
    }
    onFormSubmit(event){
        event.preventDefault();
        this.props.addNewStock(this.state.term);
        this.setState({ term: '' });
    }

    render(){

        return (
            <form className="input-group"  onSubmit={this.onFormSubmit} >
                <input
                    type="text"
                    placeholder="Enter Stock Symbol"
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange} />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">Submit</button>
        </span>
            </form>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ addNewStock }, dispatch);
}


export default connect(null,mapDispatchToProps)(SearchBar);

