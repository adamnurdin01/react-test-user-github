import React, { Component } from 'react';
import feather from 'feather-icons';
import { withRouter } from "react-router-dom";
import Spinner from './loading-spinner';
import MainService from '../services/main.service';
const markdownIntoHtml = require('markdown-into-html');

class ProjectDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            project: '',
            loading: false,
            htmlContent: '',
            isNotfound: false
        }
    }

    componentDidMount(){
        feather.replace();  
        let { user,project } = this.props.match.params;
        this.setState({
            user: user,
            project: project
        }, ()=>{
            this.fetchDetailProject();
        });
    }

    // ======================== //
    // Fetch Detail Project
    // ======================== //
    fetchDetailProject(){
        this.setState({loading: true,isNotfound: false});
        MainService.getDetailRespositories(this.state.user,this.state.project).then(res =>{
            this.setState({
                loading: false,
                urlMDFile: res.data.download_url
            },async ()=>{
                const html_code = await markdownIntoHtml({
                    url: res.data.download_url
                });
                this.setState({htmlContent: html_code});
            });
        }).catch(err =>{
            this.setState({loading: false,isNotfound:true});
        });
    }

    render() { 
        return (
            <div>
                <div className="wrap-tools">
                    <button className="btn-back" onClick={()=> this.props.history.push(`/detail/${this.state.user}`)}><i data-feather="arrow-left" className="icon"></i></button>
                </div>
                {this.state.loading ? 
                    <Spinner /> 
                : 
                    <div>
                        {this.state.isNotfound ? 
                            <div className="text-center">
                                <h6>OOps... file Not found</h6> 
                            </div>
                        : 
                            <div className="content" dangerouslySetInnerHTML={{__html: this.state.htmlContent}}></div>
                        }
                    </div>
                }
            </div>
        );
    }
}
 
export default withRouter(ProjectDetail);