
export const userManagementGuide = () => {
    return <div>
        <h3>Account and Project Management</h3>
        <hr/>
        <h4>User Management</h4>
        <p>There are three user roles in the data-hub-schema system: End User, Admin, and Super Admin.</p>
        <ul>
            <li>End User can be assigned with read, write, and read-write privileges on schema level.</li>
            <li>Admin can change the privileges of end users, and are able to access all the available schemas.</li>
            <li>Super Admin can also edit user roles (except him/herself).</li>
        </ul>
        <hr/>
        <h4>Project Management</h4>
        <p>Each project must have its name and contact person. After registered the client, a ClientID will be assigned to the project. Administrators can change the scope that a client ID can touch.</p>
        <p>Each project has black-list and white-list mode. It is recommended to use white-list mode to restrict the visibility.</p>
    </div>
}