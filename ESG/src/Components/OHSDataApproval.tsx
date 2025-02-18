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
    Modal,
    FormField,
    Input,
    TextArea,
    Label,
    CRUDComponent
} from "uxp/components";

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

interface Document {
    TransactionID:string
    ActivityCategory: string;
    ActivityGroup: string;
    MaleValue: string;
    FemaleValue: string;
    Value: string;
    _id: string;
    ActivityID: string;
    Year: string;
    Status: string;
    January?: string;
    February?:string;
    March?:string;
    April?:string;
    May?:string
    June?:string
    July?:string
    August?:string
    September?:string
    October?:string
    November?:string
    December?:string
}

const OHSDataApproval: React.FunctionComponent<IWidgetProps> = (props) => {
    const crudRef = useRef(null);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingDocument, setEditingDocument] = useState<Document | null>(null);
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
                'showOHSTransactionDetails', 
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
                        'updateOHSDocument',
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
        props.uxpContext?.executeAction('ESG', 'showOHSApprovalDocuments', {selectedYear}, {json:true})
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

    const handleApprove = (activity: Document, id: string) => {
        alert.confirm(`Do you want to approve document ${activity.TransactionID}?`)
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'approveOHSDocument', {TransactionID:activity.TransactionID}, {})
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
    const handleReject = (activity: Document, id: string) => {
        alert.confirm(`Do you want to reject document ${activity.TransactionID}?`)
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'rejectOHSDocument', {TransactionID:activity.TransactionID}, {})
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

    const handleApproveAll = () => {
        alert.confirm("Do you want to approve all the documents?")
        .then((hasConfirmed: any) => {
            if(hasConfirmed) {
                props.uxpContext.executeAction('ESG', 'ApproveAllOHSDocuments', {documents}, {json:true})
                    .then((res) => {
                        setApproval(`Document Approved ${documents.length}`);
                        alert.show(`Approved all ${documents.length} documents`);
                        fetchDocuments();
                    })
                    .catch((error) => {
                        alert.show(`error:${error}`);
                    });
            }
        })
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
        <WidgetWrapper className="OHS-approval-widget">
            <TitleBar title='OHS Document Approval' className="title-bar">
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
                    setSelectedActivity(null);
                }}
                title="Approve/Reject OHS Document"
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
                                            { name: 'ActivityID', label: 'Activity ID', type: 'text', validate: { required: true } },
                                            { name: 'ActivityCategory', label: 'Activity Category', type: 'text', validate: { required: true } },
                                            { name: 'ActivityGroup', label: 'Activity Group', type: 'text', validate: { required: true } },
                                            { name: 'Value', label: 'Value', type: 'text', validate: { required: true } },
                                            { name: 'January', label: 'January', type: 'text' },
                                            { name: 'February', label: 'February', type: 'text' },
                                            { name: 'March', label: 'March', type: 'text' },
                                            { name: 'April', label: 'April', type: 'text' },
                                            { name: 'May', label: 'May', type: 'text' },
                                            { name: 'June', label: 'June', type: 'text' },
                                            { name: 'July', label: 'July', type: 'text' },
                                            { name: 'August', label: 'August', type: 'text' },
                                            { name: 'September', label: 'September', type: 'text' },
                                            { name: 'October', label: 'October', type: 'text' },
                                            { name: 'November', label: 'November', type: 'text' },
                                            { name: 'December', label: 'December', type: 'text' }
                                        ]
                                        
                                    }
                                ],
                                onSubmit: handleUpdateActivity,
                                afterSave: () => {}
                            }}
                            list={{
                                search: { 
                                    enabled: true, 
                                    fields : ['ActivityID', 'ActivityCategory', 'ActivityGroup', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','Value']

                                },
                                data: { getData: transactionActivities },
                                defaultPageSize: 10,
                                title: 'Transaction Activities',
                                columns: [
                                    { id: 'ActivityID', label: 'Activity ID' },
                                    { id: 'ActivityCategory', label: 'Category' },
                                    { id: 'ActivityGroup', label: 'Group' },
                                    { id: 'January', label: 'January' },
                                    { id: 'February', label: 'February' },
                                    { id: 'March', label: 'March' },
                                    { id: 'April', label: 'April' },
                                    { id: 'May', label: 'May' },
                                    { id: 'June', label: 'June' },
                                    { id: 'July', label: 'July' },
                                    { id: 'August', label: 'August' },
                                    { id: 'September', label: 'September' },
                                    { id: 'October', label: 'October' },
                                    { id: 'November', label: 'November' },
                                    { id: 'December', label: 'December' },
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
    id: "OHSDataApproval",
    widget: OHSDataApproval,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

export default OHSDataApproval;