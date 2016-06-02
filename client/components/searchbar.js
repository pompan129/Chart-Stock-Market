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

        this.state = {term:"",error:""};
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({ term: event.target.value ,error:null});
    }
    onFormSubmit(event){
        event.preventDefault();
        const data = this.props.stocks.data;
        const symbol = this.state.term.trim().toUpperCase();
        //check for duplicates
        for(let i = 0,len = data.length; i<len;i++){
            if(data[i].symbol == symbol){
                this.setState({error:"Duplicate Stock Symbol!"});
                return;
            }
        }
        this.props.addNewStock(this.state.term);
        this.setState({term:"",error:null});
    }

    render(){

        return (
            <div>
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
                <div className="input-error">{this.state.error}</div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    addNewStock: React.PropTypes.func
};

function mapStateToProps(state){
    return {stocks: state.stocks}
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ addNewStock }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);

