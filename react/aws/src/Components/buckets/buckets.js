
import React, { Component, useState, useEffect } from "react";
import { NavLink, Outlet,useNavigate } from "react-router-dom";

function Buckets() {
    const [credential, setCredential] = useState({
        accessId: "",
        secretAccessId: "",
    });
    const [allBuckets, setAllBuckets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ status: false, msg: "" });

    const getAccessId = (e) => {
        setCredential((prevCredential) => ({
            ...prevCredential,
            accessId: e.target.value,
        }));
    };

    const getSecretAccessId = (e) => {
        setCredential((prevCredential) => ({
            ...prevCredential,
            secretAccessId: e.target.value,
        }));
    };

    const submit = () => {
        if (credential.accessId.length > 0 && credential.secretAccessId.length > 0) {
            setErrors({ status: false, msg: "" })
            setAllBuckets([])
            navigateHome()
            getData();
        }else{
            setErrors({ status: true, msg: "please provide credentials first." })
        }
    };

    const navigate = useNavigate();

    const navigateHome = () => {
        // 👇️ navigate to /
        navigate('/');
      };
  
    const getData = () => {
        fetch("http://localhost:8000/aws/buckets", {
            method: "POST",
            body: JSON.stringify(credential),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    throw new Error(res.error);
                }
                console.log("before set buckets")
                console.log(res.buckets);
                setAllBuckets(res.buckets);
                setErrors({ status: false, msg: errors.msg });
            })
            .catch((err) => {
                console.log(err);
                setErrors({ status: true, msg: err.toString() });
            });
    };

    useEffect(() => {
        setLoading(true);
        // Call your API here to fetch data if needed
        setLoading(false);
    }, []);

    let renderMap = () => {
        const buckets = [];
    
        for (const bucketName in allBuckets) {
            const value = allBuckets[bucketName];
            const isPublic = value.Policy ? (value.Policy.IsPublic ? "True" : "False") : "N/A";
    
            buckets.push(
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
            );
        }
    
        return buckets;
    };
    

    return (
        <div className="row">
            <div className="col">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        buckets
                    </button>
                    <ul className="dropdown-menu">
                        {allBuckets.length < 1 && loading ? <div className="mx-2">Loading buckets...</div> : renderMap()}
                    </ul>
                </div>
                <div className="row mt-2">
                    <span className="col-12">
                        <span style={{ backgroundColor: "blue", width: "10px", height: "10px", display: "inline-block" }}></span> access policy: none
                    </span>
                    <span className="col-12">
                        <span style={{ backgroundColor: "green", width: "10px", height: "10px", display: "inline-block" }}></span> access policy: isPublic = true
                    </span>
                    <span className="col-12">
                        <span style={{ backgroundColor: "red", width: "10px", height: "10px", display: "inline-block" }}></span> access policy: isPublic = false
                    </span>
                </div>
            </div>
            <div className="col my-3">
                <h3>aws credentials</h3>
                <div className="form">
                    <div className="mb-3">
                        <label htmlFor="accessId" className="form-label">
                            Access Id
                        </label>
                        <input type="password" onChange={getAccessId} className="form-control" id="accessId" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="secretAccessId" className="form-label">
                            Secret Access Id
                        </label>
                        <input type="password" onChange={getSecretAccessId} className={`form-control`} id="secretAccessId" />
                        {errors.status ? <div className="text-danger fs-6">{errors.msg}</div> : !!errors.msg ? <div className="text-success fs-6">Every thing looks good.</div> : ""}
                    </div>
                    <button type="submit" className="btn btn-dark px-4" onClick={submit}>
                        Submit
                    </button>
                </div>
            </div>
            <Outlet context={credential} />
        </div>
    );
}

export default Buckets;