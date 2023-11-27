import {TreeItem, TreeView} from "@mui/x-tree-view";
import React from "react";
import {AddBox, ChevronRight, ExpandMore, GifBox} from "@mui/icons-material";
import AddFieldModal from "./AddFieldModal";
import LinkFieldModal from "./LinkFieldModal";
import './SchemaTree.css';

export type TreeNode = {
    id: string,
    name: string,
    children?: TreeNode[]
    path: 'root' | string,
    linkedPath?: string,
};

const SchemaTreeComponent = (props : {
    initialTreeData?: TreeNode[],
    linkedTreeData?: TreeNode[],

    setSelectedNode?: (nodeId: string) => void,
    setSelectedPath?: (path: string) => void,

    enableAddField?: boolean,
    enableLinkField?: boolean,
    fetchData?: (nodes: TreeNode[]) => void,
    setLinkSource?: (nodeId: string, linkedPath: string) => void,

    exportData?: (data: any[]) => void,
}) => {
    // a container with a tree view of the schema

    const [originalSchemaNode, setOriginalSchemaNode] = React.useState('');
    const [addFieldModalOpen, setAddFieldModalOpen] = React.useState(false);
    const [linkFieldModalOpen, setLinkFieldModalOpen] = React.useState(false);
    const [treeData, setTreeData] = React.useState<TreeNode[]>(props.initialTreeData ?? [
        { id: '1', name: 'Input Root', children: [], path: 'root' } as TreeNode,
    ]);

    const findNode = (treeNodes: TreeNode[], targetId: string) : string | null => {
        const processNode = (node: TreeNode): string | null => {
            if (node.id === targetId) {
                return node.path;
            } else if (node.children) {
                return findNode(node.children, targetId);
            } else {
                return null;
            }
        }

        const result: (string | null)[] = treeNodes.map(processNode).filter((x) => x !== null);
        return result.length > 0 ? result[0] : null;
    }

    const triggerLink = (nodeId: string) => {
        const result = findNode(treeData, nodeId) ?? '';
        console.log("I am here", nodeId, result);
        props.setLinkSource?.(nodeId, result);
        return result;
    }

    const handleAddField = (name: string, type: string) => {
        setAddFieldModalOpen(false);
        handleAddNode(originalSchemaNode, name, type);
    }

    const handleAddNode = (parentId: string, name: string, type: string) => {
        const newId = Math.random().toString(); // generate a new id for the new node
        const newNode = {
            id: newId,
            name: name + ':' + type
        };

        const addNode: (nodes: TreeNode[]) => TreeNode[] = (nodes: TreeNode[]) => {
            return nodes.map((node) => {
                if (node.id === parentId) {
                    return { ...node,
                        children: [...(node.children || []),
                            {
                                ...newNode,
                                path: node.path + '.' + name,
                            }
                        ] as TreeNode[]
                    };
                } else if (node.children) {
                    return { ...node, children: addNode(node.children) };
                } else {
                    return node;
                }
            });
        };

        const result = addNode(treeData)

        setTreeData(result);
        props.fetchData?.(result);
    };

    const handleModifyNodePath = (nodeId: string, newPath: string) => {
        const modifyNode: (nodes: TreeNode[]) => TreeNode[] = (nodes: TreeNode[]) => {
            return nodes.map((node) => {
                if (node.id === nodeId) {
                    return { ...node,
                        linkedPath: newPath,
                    };
                } else if (node.children) {
                    return { ...node, children: modifyNode(node.children) };
                } else {
                    return node;
                }
            });
        };

        const result = modifyNode(treeData)

        setTreeData(result);
        props.fetchData?.(result);
        retrievePathMapping(result);
        console.log(result)
    }

    const retrievePathMapping = (data: TreeNode[]) => {
        const processNodes = (nodes: TreeNode[]) => {
            const result: any[] = [];
            nodes.forEach((node) => {
                if (node.linkedPath) {
                    result.push({
                        [`${node.path}`]: {
                            from: node.linkedPath
                        },
                        // path: node.path,
                        // linkedPath: node.linkedPath,
                    });
                }
                if (node.children) {
                    result.push(...processNodes(node.children));
                }
            });
            return result;
        }
        props.exportData?.(processNodes(data));
    }

    /*** Components ***/

    const AddBoxComponent = (id: string) => <span hidden={!(props.enableAddField ?? true)}><AddBox onClick={() => {
        setAddFieldModalOpen(true);
        setOriginalSchemaNode(id);
    }}/></span>;

    const LinkBoxComponent = (linkedPath?: string, hasChildren?: boolean) =>
        <span hidden={!(props.enableLinkField ?? false) || hasChildren} title={linkedPath}>
            <GifBox
                color={!linkedPath ? 'primary' : 'disabled'}
                onClick={() => {
                setLinkFieldModalOpen(true);
                }}/>
        </span>

    const renderTree = (node: TreeNode) => (
        <TreeItem
            key={node.id} nodeId={node.id} label={<div className="tree-node-label">
            <span>{node.name}</span>
            {AddBoxComponent(node.id)}
            {LinkBoxComponent(node.linkedPath, node.children ? node.children.length > 0 : false)}
        </div>}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    /*** Render ***/

    return (
        <div className="tree-view">
            <AddFieldModal
                open={addFieldModalOpen}
                handleClose={() => setAddFieldModalOpen(false)}
                handleAddField={handleAddField}
            />
            <LinkFieldModal
                treeData={props.linkedTreeData ?? []}
                open={linkFieldModalOpen}
                handleClose={() => setLinkFieldModalOpen(false)}
                onConfirm={triggerLink}
                schemaNode={originalSchemaNode}
                modifySchemaNodePath={handleModifyNodePath}
            />

            {/* A block for original schema */}
            <div>
                <TreeView
                    defaultExpanded={[]}
                    onNodeSelect={(_, node) => {
                        setOriginalSchemaNode(node);
                        props.setSelectedNode?.(node);
                        props.setSelectedPath?.(findNode(treeData, node) ?? '');

                        console.log("Selected node", node)
                    }
                }
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight/>}>
                    {treeData.map((node) => renderTree(node))}
                </TreeView>
            </div>
        </div>
    )
}

export default SchemaTreeComponent;