
export const schemaMappingGuide = () => {
    return <div>
        <h3>Schema Mapping</h3>
        <hr/>
        <h4>Input information</h4>
        <p>In the data schema panel, the operations are allowed similar to the schema management part. Users can manipulate the input schema freely. However, the schema cannot be saved (since it is not an interest point for data-hub service).</p>
        <p>Besides carefully inputting the source schema, uploading sample data are encouraged to reduce the workload.</p>
        <ul>
            <li>JSON file. For document-based structures/NoSQL applications, a JSON data sample is appreciated in the form of the example provided in <a href='#json-example'>[2]</a>.</li>
            <li>CSV file. For column-based structures/SQL applications, a CSV file can be consumed, exampled in <a href='#csv-example'>[3]</a>.</li>
        </ul>
        <p>Although not uploaded to our server, you can download and re-upload the schema in the form of JSON file.</p>

        <hr/>
        <h4>Output information</h4>
        <p><b>Create new mapping rules.</b></p>
        <p>For mapping rules, there are creation mode and modifying mode as well. Since the concepts are similar with the schema mapping, in this section only creation will be introduced.</p>
        <p><b>Auto-mapping same name fields</b></p>
        <p>By clicking "Match" button, the field pairs that shares same name (ignoring the styling) will show up for selection. Selected and submitted pairs will be directly linked using "inherit" operator, which will be covered later.</p>

        <p><b>Special rules creation</b></p>
        <p>Afterwards, for each node, a "Link" option is provided for link a schema node with data input node.</p>
        <p>Currently, there are rules supported:</p>
        <ul>
            <li><b>Directly Inherit</b>. Directly copy the value of the field into the target field. Please be noted that, since the target schema is type-insensitive currently, mixing types might trigger enormous errors. For example, for a field of telephone number, with target field as strings, inputting numerical input will be accepted; however, reading the item will be prohibited in strong typed languages.</li>
            <li><b>Expression Mapping</b>. Users are allow to use SpEL for editing the mapping rules.</li>
            <li><b>Regular Expression Mapping</b>. This is a special case for expression - which accepts capturing features of regex.</li>
            <li>(Experimental) <b>Enumeration Mapping</b>. TBS.</li>
            <li>(Experimental) <b>Array Aggregation</b>. TBS.</li>
        </ul>
        <p>A full example is provided in [4].</p>

        <hr/>
        <p><b id='json-example'>JSON File Example</b></p>
        <p> The following is an example of JSON file for uploading:</p>
        <p>
            <code>
                {`{`} <br/>
                &emsp;&emsp;"Application": [&emsp;&emsp;// the name of your entity<br/>
                &emsp;&emsp;&emsp;&emsp;{`{`}<br/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"applicationId": 142130123,&emsp;&emsp;&emsp;&emsp;// numerical<br/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"applicantInformation": {`{`}<br/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"name": "CHAN Tai Man",&emsp;&emsp;&emsp;&emsp;// literal<br/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;"age": 25,<br/>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{`}`}<br/>
                &emsp;&emsp;&emsp;&emsp;{`}`}<br/>
                &emsp;&emsp;]<br/>
                {`}`}
            </code>
        </p>
        <p><b id='csv-example'>CSV File Example</b></p>
        <p>
            The following is an example of CSV file (name it as <span>Applicant.csv</span> for naming the schema) for uploading:
        </p>
        <table>
            <thead>
            <tr>
                <th>application_id</th>
                <th>name</th>
                <th>age</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>142130123</td>
                <td>CHAN Tai Man</td>
                <td>25</td>
            </tr>
            </tbody>
        </table>
        <p><b>Mapping Example</b></p>
    </div>
}