import React, { useState, useEffect, useRef } from "react";
import { 
    registerWidget, 
    IContextProvider 
} from '../uxp';
import jsPDF from "jspdf";
import "jspdf-autotable"; 
import * as XLSX from 'xlsx';
import { 
    useAlert,
    TitleBar, 
    FilterPanel, 
    WidgetWrapper,
    Button,
    Select,
    Loading,
    FormField
} from "uxp/components";
import './approvalstyles.scss'

interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

interface Document {
    _id: string;
    ActivityID: string;
    Month: string;
    Year: string;
    Status: string;
    MaleValue?:string
    FemaleValue?:string
    ActivityGroup?:string
    ActivityCategory?:string
    Value?:string
    Uploaded?:string
    TransactionID:string
}

const SocialReport: React.FunctionComponent<IWidgetProps> = (props) => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const alert = useAlert();
    const [selectedYear, setSelectedYear] = useState<string>(null);

    useEffect(() => {
        fetchDocuments();
    }, [ selectedYear]);
    
    const getYears = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: 5 }, (_, i) => ({
            label: String(currentYear - i),
            value: String(currentYear - i)
        }));
    };
    
    const fetchDocuments = () => {
        setLoading(true);
        props.uxpContext?.executeAction('ESG', 'showSocialReportDocuments', {selectedYear}, {json:true})
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

    const handleDownloadPDF = async (doc: Document) => {
        try {
            // Fetch detailed report data using TransactionID
            const reportData = await props.uxpContext?.executeAction(
                "ESG", 
                "downloadSocialTransactionReport",  // API to fetch transaction report
                { TransactionID: doc.TransactionID }, 
                { json: true }  // Expect JSON response
            );
    
            if (!reportData || reportData.length === 0) {
                throw new Error("No data received from server");
            }

            // Initialize jsPDF
            const pdf = new jsPDF();
            pdf.setFontSize(16);
            pdf.text("Social Report", 105, 20, { align: "center" });
    
            // Prepare table data
            const tableData = reportData.map((item: any) => [
                item.ActivityID,
                item.Year,
                item.MaleValue || "-",
                item.FemaleValue || "-",
                item.Value || "-",
            ]);
    
            // Add table using autoTable
            (pdf as any).autoTable({
                startY: 30,
                head: [["Activity ID",  "Year", "Male Value", "Female Value", "Value"]],
                body: tableData,
            });
    
            // Download PDF
            pdf.save(`Social_Report_${doc.Year}_${doc.TransactionID}.pdf`);
        } catch (error) {
            alert.show("Failed to download report");
            console.error("Error generating report:", error);
        }
    };

    const handleDownloadXLSX = async (doc: Document) => {
        try {
            // Fetch detailed report data using TransactionID
            const reportData = await props.uxpContext?.executeAction(
                "ESG", 
                "downloadSocialTransactionReport",  // API to fetch transaction report
                { TransactionID: doc.TransactionID }, 
                { json: true }  // Expect JSON response
            );
    
            if (!reportData || reportData.length === 0) {
                throw new Error("No data received from server");
            }
    
            // Prepare data for worksheet
            const data = reportData.map((item: any) => ({
                "Activity ID": item.ActivityID,
                "Year": item.Year,
                "Male Value": item.MaleValue || "-",
                "Female Value": item.FemaleValue || "-",
                "Value": item.Value || "-"
            }));
    
            // Create worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);
    
            // Auto-adjust column width
            const columnWidths = data.reduce((widths:any, row:any) => {
                Object.keys(row).forEach((key, index) => {
                    // Compare current cell value with existing width
                    const cellValue = String(row[key]);
                    const currentWidth = widths[index] || 10; // Default minimum width
                    widths[index] = Math.max(
                        currentWidth, 
                        key.length,  // Header length
                        cellValue.length  // Cell content length
                    );
                });
                return widths;
            }, []);
    
            // Apply column widths
            worksheet['!cols'] = columnWidths.map((width: any) => ({ 
                width: width + 2  // Add some extra padding
            }));
    
            // Create workbook and add worksheet
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Social Report");
    
            // Download Excel file
            XLSX.writeFile(workbook, `Social_Report_${doc.Year}_${doc.TransactionID}.xlsx`);
        } catch (error) {
            alert.show("Failed to download report");
            console.error("Error generating report:", error);
        }
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
                                <tr key={doc._id}>
                                    <td>{doc.TransactionID}</td>
                                    <td>{doc.Year}</td>
                                    <td>{doc.Status}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <Button
                                                title="Download PDF"
                                                onClick={() => handleDownloadPDF(doc)}
                                                className="action-button pdf-button"
                                            />
                                            
                                            <Button
                                                title="Download Excel"
                                                onClick={() => handleDownloadXLSX(doc)}
                                                className="action-button xlsx-button"
                                            />
                                        </div>
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
        <WidgetWrapper className="social-approval-widget">
            <TitleBar title='Social Reports' className="title-bar">
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
        </WidgetWrapper>
    );
};

registerWidget({
    id: "SocialReport",
    widget: SocialReport,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

export default SocialReport