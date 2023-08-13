import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


let Objects=()=>{

    let {bucket} = useParams();
    let [objects,setObjects]=useState([])
    useEffect(()=>{
        
        fetch(`http://localhost:8000/aws/objects/${bucket}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res.objects)
            setObjects(res.objects)
        })
        .catch((err)=>{console.log(err)})
    }, [bucket])
    let renderMap=()=>{
            return objects.map((obj,index)=>{
                let span=obj.Acl.Grants.length
                return (

                    <tr key={obj.Key}>
                            <th scope="row" >{index+1}</th>
                            <td >{obj.Key}</td>
                            <th >users</th>
                            
                    { obj.Acl.Grants.map((access,index)=>{
                            return(
                                <td key={index}>
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th scope="col" >user name</th>
                                            <th scope="col" >Permission</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{access.Grantee.DisplayName}</td>
                                                <td>{access.Permission}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            )
                        
                    })}
                    </tr>
                )
            })
            
        }

    return (
        <div className="d-flex">
            <table className="table" >
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col" colSpan={3}>Acl</th>
                </tr>
                </thead>
                <tbody>

                    {renderMap()}
                </tbody>
            </table>
        </div>
    )
}

export default Objects;