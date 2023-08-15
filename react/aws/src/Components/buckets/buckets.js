import { Component } from "react";
import { NavLink, Outlet} from "react-router-dom";


class Buckets extends Component{

    constructor(){
        super()
        this.state={
            credential:{
                accessId:"",
                secretAccessId:"",
            },
            allBuckets:[],
            loading:false
        }
    }
    getAccessId=(e)=>{
        this.setState(prevState => {
            let credential = Object.assign({}, prevState.credential);  
            credential.accessId = e.target.value;  
            return  {credential} ;                               
        })
    }
    getSecretAccessId=(e)=>{
        this.setState(prevState => {
            let credential = Object.assign({}, prevState.credential);  
            credential.secretAccessId = e.target.value;  
            return  {credential} ;                               
        })

    }
    submit=(e)=>{
        if(this.getAccessId.length>0 && this.getSecretAccessId.length>0){
            this.getData()
        }
        
    }
    getData(){
        fetch("http://localhost:8000/aws/buckets",{
            method:"POST",
            body:JSON.stringify(this.state.credential),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({allBuckets:res.buckets})
            console.log(res)
        })
        .catch((err)=>{console.log(err)})
    }
    componentDidMount(){
        
    }
    renderMap=()=>{
        let buckets=[]
        for (const [key, value] of Object.entries(this.state.allBuckets)){
            let isPublic="N/A";
            if(value.Policy){
                isPublic=value.Policy.IsPublic?"True":"False"
            }
            buckets.push (
                <li
                    key={value.Name}
                    style={
                        isPublic === "N/A"
                        ? { backgroundColor: "blue" }
                        : isPublic === "True"
                        ? { backgroundColor: "green" }
                        : { backgroundColor: "red" }
                    }
                    >
                    <NavLink className="dropdown-item" to={`/buckets/objects/${value.Name}`}>
                {value.Name}
                </NavLink>
                </li>
        )
        }
        return buckets
    }
    render(){

        return (
            
            <div className="row">
                {/* <h1 className="col-12 justify-content-center">buckets</h1> */}
                <div className="col">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    buckets
                    </button>
                    <ul className="dropdown-menu">
                    {this.state.allBuckets.length < 1 && this.state.loading ? (
                        <div className="mx-2">Loading buckets...</div>
                    ) : (
                        this.renderMap()
                    )}
                    </ul>
                </div>
                <div className="row mt-2">
                <span className="col-12"><span style={{ backgroundColor: "blue",width:"10px", height:"10px" ,display:"inline-block"}}></span> access policy:none </span>
                <span className="col-12"><span style={{ backgroundColor: "green" ,width:"10px", height:"10px" ,display:"inline-block" }}></span> access policy: isPublic =true </span>
                <span className="col-12"><span style={{ backgroundColor: "red" ,width:"10px", height:"10px" ,display:"inline-block" }}></span> access policy: isPublic =false </span>
                
                </div>
                </div>
                <div className="col my-3">
                <h3>aws credentials</h3>
                <div className="form">
                    <div className="mb-3">
                        <label htmlFor="accessId"  className="form-label">Access Id</label>
                        <input type="password" onChange={this.getAccessId} className="form-control" id="accessId" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="secretAccessId" className="form-label" >Secret Access Id</label>
                        <input type="password" onChange={this.getSecretAccessId} className="form-control" id="secretAccessId"/>
                    </div>
                    <button type="submit" className="btn btn-dark px-4" onClick={this.submit}>Submit</button>
                </div>
                </div>
                <Outlet context={this.state.credential} />
                
            </div>
        )
    }
}

export default Buckets;