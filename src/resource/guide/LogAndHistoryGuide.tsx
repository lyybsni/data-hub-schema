
export const logAndHistoryGuide = () => {
    return <div>
        <h3>Logs and Operation Histories</h3>
        <hr/>
        <h4>Operation Logs</h4>
        <p>Operations of users are recorded, but only for the operations that involves data-hub service. The following information can be retrieved:</p>
        <table>
            <thead>
            <tr>
                    <th>Operation</th>
                    <th>Information</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Save/Update Schema</td>
                <td>Created Schema ID</td>
            </tr>
            <tr>
                <td>Save/Update Mapping</td>
                <td>Schema ID, Created Mapping ID</td>
            </tr>
            <tr>
                <td>Trail Run</td>
                <td>Related Mapping ID</td>
            </tr>
            <tr>
                <td>Production Run</td>
                <td>Related Mapping ID, Client ID, Collection Name(s), Affected Row Numbers</td>
            </tr>
            <tr>
                <td>User Management</td>
                <td>Operation, Affected Functions, Affected Schemas</td>
            </tr>
            <tr>
                <td>Project Management</td>
                <td>Operation, Affected Schemas</td>
            </tr>
            <tr>
                <td>API Calls</td>
                <td>API Endpoints, Parameters</td>
            </tr>
            </tbody>
        </table>
        <p>The view of logs is restricted, for</p>
        <ul>
            <li>End Users: Only display operations by the user</li>
            <li>Admin, Super-admins: Display all the operations</li>
        </ul>
        <hr/>
        <h4>Data Governance</h4>
        <p>
            TBD.
        </p>
    </div>
}