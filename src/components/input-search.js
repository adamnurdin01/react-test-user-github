import React from 'react';
import feather from 'feather-icons';
import { connect } from 'react-redux';
import * as _ from 'lodash';

class InputSearch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            keyword: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount(){
        feather.replace();    

        let keyword = this.props.search.keyword;
        if(this.props.search.keyword){
            this.setState({keyword: keyword});
            this.props.onChangeState(keyword);
        }
    }

    // ======================== //
    // Handle Input Change
    // ======================== //
    handleChange = _.debounce(()=>{
        this.props.onChangeState(this.state.keyword);
    }, 1000);

    render() { 
        return (
            <div>
                <label>Github Username</label>
                <div className="input-search">
                    <input type="text" className="form-control" placeholder="Enter username" value={this.state.keyword} onChange={(e)=>{
                        this.setState({keyword: e.target.value}, ()=>{
                            this.handleChange();
                        });
                    }}></input>
                    <i data-feather="search" className="icon"></i>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onChangeState: e => {
            dispatch({
                type: 'UPDATE_KEYWORD',
                keyword: e
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InputSearch);