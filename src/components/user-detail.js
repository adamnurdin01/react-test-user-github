import React from 'react';
import feather from 'feather-icons';
import Spinner from './loading-spinner';
import { withRouter } from "react-router-dom";
import MainService from '../services/main.service';

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail: null,
            loading: false,
            user: null,
            data: []
        }
    }
    
    componentDidMount(){
        feather.replace();  
        let { user } = this.props.match.params;
        this.setState({user: user},()=>{
            this.fetchUserDetail(); 
            this.fetchUserRepositories();
        });
    }

    // ======================== //
    // Fetch User Detail
    // ======================== //
    fetchUserDetail(){
        MainService.getUserDetail(this.state.user).then(res =>{
            this.setState({
                userDetail: res.data
            });
        });
    }

    // ======================== //
    // Fetch User Repositories
    // ======================== //
    fetchUserRepositories(){
        this.setState({loading: true});
        MainService.getUserRepositories(this.state.user).then(res =>{
            this.setState({
                loading: false,
                data: res.data
            });
        }).catch(err =>{
            this.setState({loading: false});
        });
    }

    render() { 
        let { user } = this.props.match.params;
        return (
            <div>
                {/* ================= START TOOLS ================= */}
                <div className="wrap-tools">
                    <div className="flex-fill">
                        <button className="btn-back" onClick={()=> this.props.history.push(`/`)}><i data-feather="arrow-left" className="icon"></i></button>
                    </div>
                    <div>
                        <div className="box-item single">
                            {this.state.loading ? null : <img src={this.state.userDetail?.avatar_url} alt=""/>}
                            <span>{user}</span>
                        </div>
                    </div>
                </div>
                {/* ================= END TOOLS ================= */}
                
                {this.state.loading ? <Spinner /> : 
                    <div>
                        {this.state.data.length ? 
                            // ============================== //
                            // START LIST PROJECT
                            // ============================== //
                            <div className="wrap-box-item">
                                {this.state.data.map((x,i)=>(
                                    <div className="box-item pb-0 pl-0 pr-0" key={i}>
                                        <h5 className="mb-4">{x.name}</h5>
                                        <div className="info">
                                            <div>
                                                <strong className="d-block">{x.forks_count}</strong>
                                                <span>fork</span>
                                            </div>
                                            <div>
                                                <strong className="d-block">{x.open_issues_count}</strong>
                                                <span>isseues</span>
                                            </div>
                                            <div>
                                                <strong className="d-block">{x.watchers_count}</strong>
                                                <span>watch</span>
                                            </div>
                                        </div>
                                        <button onClick={()=> this.props.history.push(`/detail/${this.state.user}/${x.name}`)}></button>
                                    </div>
                                ))}
                            </div>
                        :
                            <div className="text-center">
                                <h6>OOps... project Not found</h6> 
                            </div>
                        } 
                    </div>
                }
            </div>
        );
    }
}
 
export default withRouter(UserDetail);