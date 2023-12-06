import {TreeNode} from "./TreeNode";

export const DisplayNode = (props: {
    node: TreeNode
}) => {
    const TypeStr = (props: {
        type?: string
    }) => props.type ?
        <span style={{color: 'grey', fontStyle: 'italic'}}>{`( ${props.type} )`}</span>
    : <div/>;

    return <span title={props.node.path}>
        {props.node.isArray ?
        `[ ${props.node.name} ]` :
        props.node.name}
        <TypeStr type={props.node.type}/>
    </span>
}