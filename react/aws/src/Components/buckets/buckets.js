import { Component } from "react";
import { NavLink, Outlet} from "react-router-dom";


class Buckets extends Component{

    constructor(){
        super()
        this.state={
            allBuckets:[]
        }
    }
    componentDidMount(){
        fetch("http://localhost:8000/aws/buckets")
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({allBuckets:res.buckets})
            console.log(res)
        })
        .catch((err)=>{console.log(err)})
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
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    buckets
                    </button>
                    <ul className="dropdown-menu">
                    {this.state.allBuckets.length < 1 ? (
                        <div className="mx-2">Loading buckets...</div>
                    ) : (
                        this.renderMap()
                    )}
                    </ul>
                </div>
                <span><span  style={{ backgroundColor: "blue",width:"10px", height:"10px" ,display:"inline-block"}}></span> access policy:none </span>
                <span><span width="10px" style={{ backgroundColor: "green" ,width:"10px", height:"10px" ,display:"inline-block" }}></span> access policy: isPublic =true </span>
                <span><span width="10px" style={{ backgroundColor: "red" ,width:"10px", height:"10px" ,display:"inline-block" }}></span> access policy: isPublic =false </span>
                <Outlet/>
                
            </div>
        )
    }
}

export default Buckets;