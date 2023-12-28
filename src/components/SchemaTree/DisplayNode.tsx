import { TreeNode } from "./TreeNode";
import { ReactElement } from "react";
import { css } from "@emotion/css";

export const DisplayNode = (props: {
    node: TreeNode,
    extra?: ReactElement
}) => {
    const TypeStr = (props: {
        type?: string
    }) => props.type ?
            <span style={{ color: 'grey', fontStyle: 'italic' }}>{`( ${props.type} )`}</span>
            : <div />;

    return <span title={props.node.path} className={displayNodeStyle}>
        {/* if the attribute is used as an ID column */}
        {props.node.isPrimary && <span className={css`color: red`}>*</span>}
        {/* display the items and arrays */}
        {props.node.isArray ? `[ ${props.node.name} ]` : props.node.name}
        <TypeStr type={props.node.type} />
        {props.extra ?? <div />}
    </span>
}

const displayNodeStyle = css`
    display: flex;
    flex-direction: row;
`;
