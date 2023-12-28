import { TreeItem, TreeView } from "@mui/x-tree-view";
import React, { useEffect, useMemo } from "react";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import AddFieldModal from "./modals/AddFieldModal";
import LinkFieldModal from "./modals/LinkFieldModal";
import '../../pages/Mapping/SchemaTree.css';
import { BasicNode, Linage, TreeNode } from "./TreeNode";
import { DisplayNode } from "./DisplayNode";
import MenuListComposition from "../Menu/NodeMenu";
import { stringifyLinage } from "./SchemaTreeFormatter";
import { css } from "@emotion/css";
import { useDispatch } from "react-redux";
import { successAlert } from "../../utils/Request";
import { openAlert } from "../../redux/AlertSlice";

const SchemaTreeComponent = (props: {
    initialTreeData?: TreeNode[],
    linkedTreeData?: TreeNode[],

    setSelectedNode?: (nodeId: string) => void,
    setSelectedPath?: (path: string) => void,
    disabled?: boolean,

    enableAddField?: boolean,
    enableLinkField?: boolean,
    fetchData?: (nodes: TreeNode[]) => void,

    exportData?: (data: Map<string, Linage>) => void,
    linageMap?: Map<string, Linage>,
}) => {
    // a container with a tree view of the schema

    const dispatch = useDispatch();

    const [originalSchemaNode, setOriginalSchemaNode] = React.useState({} as TreeNode);
    const [addFieldModalOpen, setAddFieldModalOpen] = React.useState(false);
    const [linkFieldModalOpen, setLinkFieldModalOpen] = React.useState(false);
    const [onModify, setOnModify] = React.useState(false);
    const [treeData, setTreeData] = React.useState<TreeNode[]>(props.initialTreeData ?? [
        { id: '1', name: 'InputRoot', children: [], path: 'root' } as TreeNode,
    ]);

    const linageMap = useMemo(() => props.linageMap ?? new Map<string, Linage>(), [props.linageMap])

    const getAllNodeIds = (nodes: TreeNode[]): string[] => {
        const result: string[] = [];
        const processNode = (node: TreeNode) => {
            result.push(node.id);
            if (node.children) {
                node.children.forEach(processNode);
            }
        }
        nodes.forEach(processNode);
        return result;
    }

    const findNode = (treeNodes: TreeNode[], targetId: string): TreeNode | null => {
        const processNode = (node: TreeNode): TreeNode | null => {
            if (node.id === targetId) {
                return node;
            } else if (node.children) {
                return findNode(node.children, targetId);
            } else {
                return null;
            }
        }

        // TODO: enhance
        const result: (TreeNode | null)[] = treeNodes.map(processNode).filter((x) => !!x);
        return result.length > 0 ? result[0] : null;
    }

    const findParent = (treeNodes: TreeNode[], targetId: string): TreeNode | null => {
        var temp = [...treeNodes];

        while (temp.length !== 0) {
            const result = temp.filter(node => node.children?.find(child => child.id === targetId));
            if (result.length > 0 && result[0] !== undefined) {
                return result[0];
            }
            temp = temp.flatMap(node => node.children ?? []);
        }
        return null;
    }

    // TODO: fix the linking problem
    useEffect(() => {
        if (props.initialTreeData) {
            setTreeData(props.initialTreeData)
        }
    }, [props.initialTreeData]);

    const handleAddField = (node: BasicNode) => {
        setAddFieldModalOpen(false);
        handleAddNode(originalSchemaNode.id, node);
        dispatch(openAlert(successAlert("Field added successfully.")));
    }

    const handleDeleteNode = (nodeId: string) => {
        const parent = findParent(treeData, nodeId);
        if (parent) {
            parent.children = parent?.children?.filter((child) => child.id !== nodeId);
            setTreeData([...treeData]);
            props.fetchData?.(treeData);
        }
        dispatch(openAlert(successAlert("Node deleted successfully.")));
    }

    const handleModifyNode = (nodeId: string, newValue: BasicNode) => {
        const treeDataCopy = [...treeData];
        const targetNode = findNode(treeDataCopy, nodeId);

        const modifyRoot = (node: TreeNode, pre: string, next: string) => {
            const fromPath = node.path;
            const toPath = node.path.replace(pre, next);

            const fromValue = linageMap.get(fromPath);
            if (fromValue !== undefined) {
                linageMap.set(toPath, fromValue);
                linageMap.delete(fromPath);
            }

            node.path = node.path.replace(pre, next);
            node.children?.forEach((child) => {
                modifyRoot(child, pre, next);
            });
        }

        if (targetNode) {
            targetNode.name = newValue.name;
            targetNode.type = newValue.type;

            let targetPaths = '';
            if (targetNode.path.includes(".")) {
                targetPaths = targetNode.path.split(".")
                    .slice(0, -1)
                    .reduce((acc, cur) => {
                        return acc + "." + cur
                    }) + "." + newValue.name;
            } else {
                targetPaths = newValue.name;
            }
            modifyRoot(targetNode, targetNode.path, targetPaths);

            setTreeData(treeDataCopy);
            props.fetchData?.(treeDataCopy);
        }
        setAddFieldModalOpen(false);

        dispatch(openAlert(successAlert("Node modified successfully.")));
    }

    const handleAddNode = (parentId: string, node: BasicNode) => {
        const newId = Math.random().toString(); // generate a new id for the new node
        const newNode = {
            id: newId,
            ...node
        };

        const addNode: (nodes: TreeNode[]) => TreeNode[] = (nodes: TreeNode[]) => {
            return nodes.map((child) => {
                if (child.id === parentId) {
                    return {
                        ...child,
                        type: undefined,
                        children: [...(child.children || []),
                        {
                            ...newNode,
                            // TODO: fix path generation in the end
                            path: child.path + '.' + node.name,
                        }
                        ] as TreeNode[]
                    };
                } else if (child.children) {
                    return { ...child, children: addNode(child.children) };
                } else {
                    return child;
                }
            });
        };

        const result = addNode(treeData)

        setTreeData(result);
        props.fetchData?.(result);

        dispatch(openAlert(successAlert("Node added successfully.")));
    };

    const handleDeleteLink = (path: string) => {
        linageMap.delete(path);
        props.exportData?.(linageMap);

        dispatch(openAlert(successAlert("Link deleted successfully.")));
    };

    /*** Components ***/
    const enabled = [] as string[];
    if (props.enableAddField) {
        enabled.push('add');
        enabled.push('modify');
        enabled.push('delete');
    }
    if (props.enableLinkField) {
        enabled.push('link');
        enabled.push('delete-link')
    }

    const renderTree = (node: TreeNode) => (
        <TreeItem
            key={node.id}
            nodeId={node.id}
            disabled={props.disabled ?? false}
            label={<div className="tree-node-label">
                <DisplayNode node={node} extra={
                    <span className={css`
                      color: yellowgreen;
                      font-style: italic;
                      font-size: 0.5em;
                    `}>{linageMap.has(node.path) && linageMap.get(node.path) ? stringifyLinage(linageMap.get(node.path)) : ''}</span>
                } />

                <span hidden={props.enableLinkField && !node.isArray && (!!node.children?.length) && (node.children.length > 0)}>
                    <MenuListComposition enabled={
                        node.id === treeData[0].id ?
                            enabled.filter(val => val !== 'delete') : enabled
                    } color={linageMap.has(node.path) ? 'secondary' : 'primary'}
                        onAdd={() => {
                            setAddFieldModalOpen(true);
                            setOriginalSchemaNode(node);
                            setOnModify(false);
                        }}
                        onModify={() => {
                            setAddFieldModalOpen(true);
                            setOriginalSchemaNode(node);
                            setOnModify(true);
                        }}
                        onLink={() => {
                            setLinkFieldModalOpen(true);
                        }}
                        onDelete={() => {
                            handleDeleteNode(node.id);
                        }}
                        onDeleteLink={() => {
                            handleDeleteLink(node.path);
                        }}
                    /></span>
            </div>}>
            {Array.isArray(node.children) ? node.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    );

    /*** Render ***/

    return (
        <div className="tree-view">
            {addFieldModalOpen ? <AddFieldModal
                open={addFieldModalOpen}
                handleClose={() => setAddFieldModalOpen(false)}
                onAdd={handleAddField}
                initialValues={originalSchemaNode ?? null}
                onModify={onModify ? (v) => handleModifyNode(originalSchemaNode.id, v) : undefined}
            /> : <div />}
            {linkFieldModalOpen ? <LinkFieldModal
                treeData={props.linkedTreeData ?? []}
                open={linkFieldModalOpen}
                handleClose={() => setLinkFieldModalOpen(false)}

                onSubmit={(linkInfo) => {
                    linageMap.set(originalSchemaNode.path, {
                        ...linkInfo,
                        primary: originalSchemaNode.isPrimary
                    });
                    props.exportData?.(linageMap);
                }}
            /> : <div />}

            {/* A block for original schema */}
            <div>
                <TreeView
                    defaultExpanded={getAllNodeIds(treeData)}
                    onNodeSelect={(_, id) => {
                        const node = findNode(treeData, id) ?? {} as TreeNode;
                        setOriginalSchemaNode(node);
                        props.setSelectedNode?.(id);
                        props.setSelectedPath?.(node.path);
                    }
                    }
                    defaultCollapseIcon={<ExpandMore />}
                    defaultExpandIcon={<ChevronRight />}>
                    {treeData.map((node) => renderTree(node))}
                </TreeView>
            </div>
        </div>
    )
}

export const findPrimary = (treeNodes: TreeNode[]): TreeNode[] => {
    var temp = [...treeNodes];
    let result: TreeNode[] = [];

    while (temp.length !== 0) {
        result = [...result, ...temp.filter(node => node.isPrimary)];
        temp = temp.flatMap(node => node.children ?? []);
    }
    return result;
}

export default SchemaTreeComponent;