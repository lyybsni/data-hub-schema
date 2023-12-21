
export const mappingTrialExampleGuide = () => {
    return <div>
        <h3>Mapping Trial</h3>
        <hr/>
        <h4>Trial Mode</h4>
        <p>Before heading to handling the real data, a user can check whether a mapping is as desired or not. The sample data can be provided just as mapping procedure, or be directly typed/copied in the corresponding area.</p>
        <p>Select trail mode for the matching, and fill in the schema and mapping information.</p>
        <ul>
            <li>Try button can execute the conversion of the data, from the given structure to mapped structure. The result will be shown in the display area.</li>
            <li>Show schema button. The tree information can be retrieved by clicking this button.</li>
            <li>Show mapping button. The rules will be concluded into a table for checking.</li>
        </ul>
        <hr/>
        <h4>Production Mode</h4>
        <p>Production mode is for operations on the real data. Given the primary keys, the system will process the data records:</p>
        <ul>
            <li>Merge if there are matching records,</li>
            <li>Insert if there is not.</li>
        </ul>
        <hr/>
        <h4>Operational Histories</h4>
        <p>The trial round will not trigger data recording, however, there will be traces about the usage of APIs and functionalities in this page.</p>
        <p>For production records, since the job can be large in scale, there will be multiple records for a single operation if many temporary collections are related.</p>
    </div>
}