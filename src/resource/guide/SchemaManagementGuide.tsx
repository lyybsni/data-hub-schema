
export const schemaManagementGuide = () => {
    return (
        <div>
            <h3>Schema Management</h3>
            <hr/>
            <h4>Create Schema</h4>
            <p><b>Step 1: Turn the create schema mode on. </b></p>
            <p>
                To create a schema, ensure the "Create New Schema" switch is on. Afterwards, the "Schema Playground" will
                display a root node to manipulate.
            </p>
            {/*<p className='img'><img src='/img/sm-1.png' alt='Create New Schema'/></p>*/}
            <p><b>Step 2: Create a schema. </b></p>
            <p>
                Nodes can have operations including: add a child node, modify the current node, and delete the node with children.
            </p>
            <p>
                Add a child node. Click "Add" button on the menu pop-up. A panel will show up for filling the following information:
            </p>
            <ul>
                <li>Is <span>array</span>? For a collection of items, please check this option. The <span>array</span> type element will be shown with brackets.</li>
                <li>Is primary? For a database object, apart from the row number and randomized identifiers assigned by databases, the entity should have human readable identifier(s) to locate the data record. For example, we can use "applicationId" to identify an data entity in collection "Application".</li>
                <li>Attribute Name. The name of the field. Please see <a href='#naming'>[1]</a> for the naming guidelines.</li>
                <li>Attribute Type. The type of the field. This information will be shown in the tree for assistance.</li>
            </ul>
            <p>Modify a node. Click "Modify" button on the menu pop-up. Similar panel in adding procedure will show up for modifying the previously provided information.</p>
            <p>Delete a node. Click "Delete" button on the menu pop-up. The node with its children will be deleted from the tree.</p>

            <p><b>Step 3: Save the schema. </b></p>
            <p>Click "Save Schema" button in the functions area. The data will be uploaded to the data-hub service as a record.</p>

            <p><b>Optional: Clear the schema.</b></p>
            <p>In creation mode, "Clear Schema" button will trigger a complete erase of the created schema.</p>

            <hr/>

            <h4>View and Modify Existing Records</h4>
            <p><b>Step 1: Turn the create schema mode off. </b></p>
            <p>In viewing mode, the schemas in the database will be provided for selection. After selecting a schema, the playground will be filled with previous saved information.</p>

            <p><b>Step 2: View and modify the information.</b></p>
            <p>Same as the operations in creating mode, users can play with the nodes and save the update exactly as fore-mentioned Step 2 and 3.</p>

            <p><b>Optional: Clear the update.</b></p>
            <p>Different from creation mode, the clearing will only restore the changes to the loaded schema. No information will be uploaded.</p>

            <hr/>
            <h4 id='naming'>[1] Supported Naming Rules</h4>

            <ul>
                <li>The naming supports camel case and underscore naming style. Camel case example: <span>"helloWorld"</span>, <span>"thisIsACamelCase"</span>; Underscore example: <span>"hello_world"</span>, <span>"this_is_underscored"</span>.</li>
                <li>Do not use space, special characters in the naming. Try not to use digits as well.</li>
                <li>(Root node only) If the field will be named in Camel case, start the name with uppercase letter. For example: <span>"ApplicantInformation".</span></li>
            </ul>


        </div>
    )
}