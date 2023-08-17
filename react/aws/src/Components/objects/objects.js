
import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function Objects() {
    const [objects, setObjects] = useState([]);
    const [errors, setErrors] = useState({ status: false, msg: "" });
    const { bucket } = useParams();
    const credential = useOutletContext();


    useEffect(() => {
        fetch(`http://localhost:8000/aws/objects/${bucket}`, {
            method: "POST",
            body: JSON.stringify(credential),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    setErrors(res.error);
                    throw new Error(res.error);
                }
                setObjects(res.objects);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [bucket,credential]);

    const renderGrants = (grants) => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">User name</th>
                        <th scope="col">Permission</th>
                    </tr>
                </thead>
                <tbody>
                    {grants.map((access, index) => (
                        <tr key={index}>
                            <td>{access.Grantee.DisplayName}</td>
                            <td>{access.Permission}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const renderMap = () => {
        return objects.map((obj, index) => (
            <tr key={obj.Key}>
                <th scope="row">{index + 1}</th>
                <td>{obj.Key}</td>
                <td colSpan={3}>
                    {obj.Acl.Grants.length > 0 ? (
                        renderGrants(obj.Acl.Grants)
                    ) : (
                        <span>No access permissions</span>
                    )}
                </td>
            </tr>
        ));
    };

    return (
        <div className="d-flex">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col" colSpan={3}>
                            Acl
                        </th>
                    </tr>
                </thead>
                <tbody>{renderMap()}</tbody>
            </table>
        </div>
    );
}

export default Objects;
