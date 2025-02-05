import * as React from "react";
import { useState, useEffect } from "react";
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
    TableComponent,
    DataTable,
    DateRangePicker,
    FormField
} from "uxp/components";
import './approvalstyles.scss'

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

interface Document {
    id: string;
    documentName: string;
    uploadDate: string;
    status: string;
}

const Approval: React.FunctionComponent<IWidgetProps> = (props) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const alert = useAlert();
    const [approval,setApproval] = useState<any>()
    const [selectedMonth, setSelectedMonth] = useState<string>(null);
    const [selectedYear, setSelectedYear] = useState<string>(null);

    useEffect(() => {
        fetchDocuments();
    }, [approval,selectedMonth,selectedYear]);
    const getMonths = () => [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' }
    ];
    
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => ({
            label: String(currentYear - i),
            value: String(currentYear - i)
        }));
    };
    const fetchDocuments = () => {
        console.log("month and year",selectedMonth,selectedYear)
        setLoading(true);
        props.uxpContext?.executeAction('ESG', 'showApprovalDocuments', {selectedMonth,selectedYear}, {json:true})
            .then((res) => {
                console.log("res",res)
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

    const handleApprove = (Activity: any) => {
        props.uxpContext.executeAction('ESG','approveDocument',{Activity},{})
        .then((res)=>{
            setApproval(`Acivity Approved ${Activity.ActivityID}`)
            alert.show(`Approved document: ${Activity.ActivityID}`);
        })
        .catch((error)=>{
            alert.show(`error:${error}`)
        })
    };

    const handleApproveAll = () => {
        console.log("documents",documents)
        
        props.uxpContext.executeAction('ESG','approveAllDocuments',{documents},{json:true})
        .then((res)=>{
            console.log("res approve all",res)
            setApproval(`Acivity Approved ${res.length}`)
            alert.show(`Approving all ${res.length} documents`);
        })
        .catch((error)=>{
            alert.show(`error:${error}`)
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
            <>
                <Button
                    title="Approve All"
                    onClick={handleApproveAll}
                    className="approve-all-button"
                />
                <div className="approval-table-container">
                    <DataTable
                        data={documents}
                        pageSize={5}
                        className="custom-data-table"
                        columns={[
                            {
                                title: "Activity",
                                width: "25%",
                                renderColumn: (item) => <div>{item.ActivityID}</div>,
                            },
                            {
                                title: "Month",
                                width: "10%",
                                renderColumn: (item) => <div>{item.Month}</div>,
                            },
                            {
                                title: "Year",
                                width: "10%",
                                renderColumn: (item) => <div>{item.Year}</div>,
                            },
                            {
                                title: "Status",
                                width: "15%",
                                renderColumn: (item) => <div>{item.Status}</div>,
                            },
                            {
                                title: "Approve",
                                width: "15%",
                                renderColumn: (item) => (
                                    <div>
                                        <Button 
                                            title="Approve" 
                                            onClick={() => handleApprove(item)} 
                                        />
                                    </div>
                                ),
                            },
                        ]}
                    />
                </div>
            </>
        );
    };

    return (
        <WidgetWrapper>
            <TitleBar title='Document Approval'>
                <FilterPanel onClear={()=>{
                    setSelectedMonth("")
                    setSelectedYear("")
                }}>
                <FormField>
                <Select
                    options={getMonths()}
                    selected={selectedMonth}
                    onChange={(value) => setSelectedMonth(value as string)}
                    placeholder="Select Month"
                />
          </FormField>
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
        </WidgetWrapper>
    );
};

registerWidget({
    id: "Approval",
    widget: Approval,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

export default Approval;