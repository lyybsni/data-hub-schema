
export const apiCallGuide = () => {
    return <div>
        <h3>
            API Calls
        </h3>
        <hr/>
        <h4>Data Ingest</h4>
        <p>Applications can utilize RESTful requests to apply for data modification.</p>
        <p><b>Through Bulk Data (JSON)</b></p>

        <table>
            <tbody>
            <tr>
                <th>
                    Method
                </th>
                <td>
                    POST
                </td>
            </tr>
            <tr>
                <th>Endpoint</th>
                <td><span>$&#123;baseUrl&#125;/api/data-ingest/raw/&#123;mappingId&#125;</span></td>
            </tr>
            <tr>
                <th>Parameters</th>
                <td>
                    <ul>
                        <li><span>clientId</span>. Required.</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Request Body</th>
                <td><ul>
                    <li><span>data: Object[]</span>. Required.</li>
                </ul></td>
            </tr>
            <tr>
                <th>Response Body</th>
                <td>
                    <ul>
                        <li><span>ref: UUID</span>. The reference ID for looking up operation merge.</li>
                        <li><span>number: int</span>. The number of affected rows.</li>
                    </ul>
                </td>
            </tr>

            </tbody>
        </table>

        <p><b>Through Bulk Data (CSV)</b></p>

        <table>
            <tbody>
            <tr>
                <th>
                    Method
                </th>
                <td>
                    POST
                </td>
            </tr>
            <tr>
                <th>Endpoint</th>
                <td><span>$&#123;baseUrl&#125;/api/data-ingest/raw-file/&#123;mappingId&#125;</span></td>
            </tr>
            <tr>
                <th>Parameters</th>
                <td>
                    <ul>
                        <li><span>clientId</span>. Required.</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Headers</th>
                <td>
                    <ul>
                        <li><span>ContentType: application/multipart</span></li>
                    </ul>
                </td>
            </tr>
            <tr>
                <th>Request Body</th>
                <td><ul>
                    <li><span>file: File</span>. Required.</li>
                </ul></td>
            </tr>
            <tr>
                <th>Response Body</th>
                <td>
                    <ul>
                        <li><span>ref: UUID</span>. The reference ID for looking up operation merge.</li>
                        <li><span>number: int</span>. The number of affected rows.</li>
                    </ul>
                </td>
            </tr>
            </tbody>
        </table>
        <p><b>Through Message (MQTT v3.1.1)</b></p>
        <p>The service also listens to the message sending to the server. Every message piece is expected to contain (at least one) complete entity information. Under this category, streaming is available.</p>
        <p>TBD.</p>
        <p><b>Status Check</b></p>
        <p>TBD.</p>
        <hr/>
        <h4>Data Export</h4>
        <p><b>Expose Meta-data</b></p>
        <p><b>Dump From Data-hub</b></p>
        <p><b>Data Aggregation through SparkQL</b></p>
        <p>TBD.</p>
        <hr/>
        <h4>Miscellaneous</h4>
        <p><b>Status Codes</b></p>
        <ul>
            <li>200 - OK. The request is well accepted. The synchronized logic has been executed and a reference ID has been generated for the a-synchronized part (if any).</li>
            <li>400 - Bad Request. The request has invalid form or parameters.</li>
            <li>401 - Unauthorized. The authentication context is not provided.</li>
            <li>403 - Forbidden. The provided credential is hindered from visiting the corresponding schema.</li>
        </ul>
    </div>
}