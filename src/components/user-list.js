import React from 'react';
import MainService from '../services/main.service';
import { withRouter } from 'react-router-dom';
import Spinner from './loading-spinner';
import { store } from '../services/store';
import watch from 'redux-watch';

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            keyword: null,
        }

        let w = watch(store.getState, 'user.keyword')
        store.subscribe(w((newVal, oldVal, objectPath) => {
            this.setState({
                keyword: newVal
            },()=>{
                this.fetchUserList();
            });
        }))
    }

    componentDidMount(){
        this.fetchUserList();
    }

    // ======================== //
    // Fetch User
    // ======================== //
    fetchUserList(){
        this.setState({loading: true});
        if(this.state.keyword){
            // ======================== //
            // Fetch User on Search
            // ======================== //
            MainService.searchUser(this.state.keyword).then(res =>{
                this.setState({
                    data:res.data.items,
                    loading: false
                });    
            }).catch(err =>{
                this.setState({loading: false});
            });
        }else{
            // ======================== //
            // Fetch User 
            // ======================== //
            MainService.initUser().then(res =>{
                this.setState({
                    data:res.data,
                    loading: false
                });    
            }).catch(err =>{
                this.setState({loading: false});
            });
        }
    }

    render() { 
        return (
            <div className="mt-4">
                {this.state.loading ? <Spinner /> : 
                    <div>
                        {this.state.data.length ?
                            <div className="wrap-box-item">
                                {this.state.data.map((x,i)=>(
                                    <div className="box-item" key={i}>
                                        <img src={x.avatar_url} alt=""/>
                                        <h5 className="mb-0">{x.login}</h5>
                                        <button onClick={()=> this.props.history.push(`/detail/${x.login}`)}></button>
                                    </div>
                                ))}
                            </div>
                            :
                            <div className="text-center">
                                <h6 className="mt-5">OOps... user Not found</h6> 
                            </div>
                        }
                    </div>
                }
            </div>
        );
    }
}
 
export default withRouter(UserList);