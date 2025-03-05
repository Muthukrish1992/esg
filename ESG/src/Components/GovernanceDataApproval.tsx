// GovernanceDataApproval.tsx
import React, { useState, useEffect, useRef } from "react";
import { 
    registerWidget, 
    IContextProvider 
} from '../uxp';
import { 
    useAlert,
    TitleBar, 
    FilterPanel, 
    WidgetWrapper,
    Button,
    Select,
    Loading,
    FormField,
    Modal,
    ConfirmButton,
    Input,
    CRUDComponent
} from "uxp/components";
import './approvalstyles.scss'

// Interface definitions
interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

interface Document {
    TransactionID: string;
    _id: string;
    ActivityID: string;
    Month: string;
    Year: string;
    Status: string;
    ActivityGroup?:string
    ActivityCategory?:string
    Value?:string
    Unit?:string
}

// Main Component
const GovernanceDataApproval: React.FunctionComponent<IWidgetProps> = (props) => {
    const crudRef = useRef(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [selectedActivity, setSelectedActivity] = useState<Document | null>(null);
    const [showApprovalDocument, setShowApprovalDocument] = useState(false);
        const [transactionActivities, setTransactionActivities] = useState<any[]>([]);
    const alert = useAlert();
    const [approval, setApproval] = useState<any>();

    const [selectedYear, setSelectedYear] = useState<string>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingActivity, setEditingActivity] = useState<Document | null>(null);


    useEffect(() => {
        fetchDocuments();
    }, [approval, selectedYear]);
    const fetchTransactionDetails = async (transactionId: string) => {
        try {
            const activities = await props.uxpContext?.executeAction(
                'ESG', 
                'showGovernanceTransactionDetails', 
                { transactionId }, 
                { json: true }
            );
            setTransactionActivities(activities);
        } catch (error) {
            alert.show("Failed to fetch transaction details");
            console.error("Error fetching transaction details:", error);
        }
    };
            // Your existing fetchDocuments, handleApprove, handleReject, etc. functions...

            const handleUpdateActivity = async (data: any, oldData: any): Promise<any> => {
                try {
                    await props.uxpContext?.executeAction(
                        'ESG',
                        'updateGovernanceDocument',
                        { 
                            id: oldData._id,  // Using the _id from the original activity
                            updates: data      // Passing the updated data
                        },
                        { json: true }
                    );
                    
                    // Update the local state
                    setTransactionActivities(prevActivities => 
                        prevActivities.map(activity => 
                            activity._id === oldData._id ? { ...activity, ...data } : activity
                        )
                    );
        
                    return {
                        status: "done",
                        message: "Activity updated successfully"
                    };
                } catch (error) {
                    console.error("Error updating activity:", error);
                    return {
                        status: "error",
                        message: "Failed to update activity"
                    };
                }
            };

    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => ({
            label: String(currentYear - i),
            value: String(currentYear - i)
        }));
    };

    const fetchDocuments = () => {
        setLoading(true);
        props.uxpContext?.executeAction('ESG', 'showGovernanceApprovalDocuments', { selectedYear}, {json:true})
            .then((res) => {
                setDocuments(res);
            })
            .catch((error) => {
                alert.show("Failed to fetch documents");
                console.error("Error fetching documents:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Modified handleApprove to use the latest activity data
    const handleApprove = (activity: Document, id: string) => {
        alert.confirm(`Do you want to approve document ${activity.TransactionID}?`)
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'approveGovernanceDocument', {TransactionID:activity.TransactionID}, {})
                    .then((res) => {
                        setApproval(`Activity Approved ${activity.TransactionID}`);
                        alert.show(`Approved document: ${activity.TransactionID}`);
                        setShowApprovalDocument(false);
                        fetchDocuments();
                    })
                    .catch((error) => {
                        alert.show(`error:${error}`);
                    });
            }
        });
    };

    const handleApproveAll = () => {
        alert.confirm("Do you want to approve all the documents?")
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'ApproveAllGovernanceDocuments', {documents}, {json:true})
                    .then((res) => {
                        setApproval(`Documents Approved ${documents.length}`);
                        alert.show(`Approved all ${documents.length} documents`);
                        fetchDocuments();
                    })
                    .catch((error) => {
                        alert.show(`error:${error}`);
                    });
            }
        })
    };

    const handleReject = (activity: Document, id: string) => {
        alert.confirm(`Do you want to reject document ${activity.TransactionID}?`)
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'rejectGovernanceDocument', {TransactionID:activity.TransactionID}, {})
                    .then((res) => {
                        alert.show(`Rejected document: ${activity.TransactionID}`);
                        setShowApprovalDocument(false);
                        fetchDocuments();
                    })
                    .catch((error) => {
                        alert.show(`error:${error}`);
                    });
            }
        });
    };
    const handleDelete = (activity: Document) => {
        alert.confirm(`Do you want to delete transaction ${activity.TransactionID}?`)
            .then((hasConfirmed: any) => {
                if(hasConfirmed) {
                    props.uxpContext.executeAction('ESG', 'deleteGovernanceTransaction', { TransactionID: activity.TransactionID }, {})
                        .then((res) => {
                            alert.show(`Deleted transaction: ${activity.TransactionID}`);
                            fetchDocuments(); // Refresh the list after deletion
                        })
                        .catch((error) => {
                            alert.show(`Error deleting transaction: ${error}`);
                        });
                }
            });
    };


    const renderContent = () => {
        if (loading) {
            return <Loading />;
        }

        if (!documents || documents.length === 0) {
            return (
                <div className="no-documents-message">
                    <p>No documents to approve</p>
                </div>
            );
        }

        return (
            <div className="approval-table-container">
                <div className="approval-header">
                    <Button
                        title="Approve All"
                        onClick={handleApproveAll}
                        className="approve-all-button"
                    />
                </div>

                <div className="table-wrapper">
                    <table className="approval-table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Year</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.TransactionID}>
                                    <td>{doc.TransactionID}</td>
                                    <td>{doc.Year}</td>
                                    <td>{doc.Status}</td>
                                    <td>
                                        <Button
                                            title="Approve/Reject"
                                            onClick={() => {
                                                setSelectedDocument(doc);
                                                fetchTransactionDetails(doc.TransactionID);
                                                setShowApprovalDocument(true);
                                            }}
                                            className="action-button"
                                            disabled={doc.Status === 'Approved'}
                                        />
                                        <Button
                                            title="Delete Document"
                                            onClick={() => handleDelete(doc)}
                                            className="delete-button"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    return (
        <WidgetWrapper className="governance-approval-widget">
            <TitleBar title='Governance Document Approval' className="title-bar">
                <FilterPanel onClear={() => {
                    setSelectedYear("");
                }}>

                    <FormField>
                        <Select
                            options={getYears()}
                            selected={selectedYear}
                            onChange={(value) => setSelectedYear(value as string)}
                            placeholder="Select Year"
                        />
                    </FormField>
                </FilterPanel>
            </TitleBar>
            {renderContent()}
            <Modal 
                show={showApprovalDocument}
                onClose={() => {
                    setShowApprovalDocument(false);
                    setSelectedDocument(null);
                    setTransactionActivities([]);
                }}
                title="Approve/Reject Social Document"
            >
                {selectedDocument && (
                    <div>
                        <div className="approval-actions">
                            <Button 
                                title="Approve" 
                                onClick={() => handleApprove(selectedDocument, selectedDocument._id)}
                            />
                            <Button 
                                title="Reject" 
                                onClick={() => handleReject(selectedDocument, selectedDocument._id)}
                            />
                        </div>
                        <CRUDComponent
                            ref={crudRef}
                            edit={{
                                title: 'Edit Activity Data',
                                formStructure: [
                                    {
                                        columns: 1,
                                        fields: [
                                            {
                                                name: 'ActivityID',
                                                label: 'Activity ID',
                                                type: 'text',
                                                validate: { required: true }
                                            },
                                            {
                                                name: 'ActivityCategory',
                                                label: 'Activity Category',
                                                type: 'text',
                                                validate: { required: true }
                                            },
                                            {
                                                name: 'ActivityGroup',
                                                label: 'Activity Group',
                                                type: 'text',
                                                validate: { required: true }
                                            },
                                            {
                                                name: 'Value',
                                                label: 'Value',
                                                type: 'text',
                                                validate: { required: true }
                                            },
                                            {
                                                name: 'Unit',
                                                label: 'Unit',
                                                type: 'text'
                                            }
                                        ]
                                    }
                                ],
                                onSubmit: handleUpdateActivity,
                                afterSave: () => {}
                            }}
                            list={{
                                search: { 
                                    enabled: true, 
                                    fields: ['ActivityID', 'ActivityCategory', 'ActivityGroup', 'Value', 'Unit'] 
                                },
                                data: { getData: transactionActivities },
                                defaultPageSize: 10,
                                title: 'Transaction Activities',
                                columns: [
                                    { id: 'ActivityID', label: 'Activity ID' },
                                    { id: 'ActivityCategory', label: 'Category' },
                                    { id: 'ActivityGroup', label: 'Group' },
                                    { id: 'Unit', label: 'Unit' },
                                    { id: 'Value', label: 'Value' }
                                ]
                            }}
                        />
                    </div>
                )}
            </Modal>
        </WidgetWrapper>
    );
};

registerWidget({
    id: "GovernanceDataApproval",
    widget: GovernanceDataApproval,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

export default GovernanceDataApproval;