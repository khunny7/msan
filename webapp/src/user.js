import React, { useEffect, useState } from "react";

const Users = (props) => {

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        fetch('/api/users')
            .then(response => response.json())
            .then(data => setUsersData(data)); 
    }, [setUsersData]); 

    return (
        <div>
            {
                usersData.map((user) => (
                    <React.Fragment key={user.email}>
                        {user.firstName}
                    </React.Fragment>
                ))
            }
        </div>
    );
}

export { Users };