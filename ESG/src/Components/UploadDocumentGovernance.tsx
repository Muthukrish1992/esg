import * as React from "react";
import { useState, useEffect, useRef } from "react";
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
    CRUDComponent,
    CRUDComponentInstanceProps,
    ActionResponse,
    FileInput,
    IconButton,
} from "uxp/components";
import * as XLSX from 'xlsx';
import './uploadstyles.scss'

export interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

interface TableData {
    ActivityID: string;
    ActivityCategory: string;
    ActivityGroup: string;
    Value: string;
    Uploaded: string;
    Status: string;
    Month?: string;
    Year?: string;
    Unit?:string;
}

const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 10 }, (_, i) => ({
        label: String(currentYear - i),
        value: String(currentYear - i)
    }));
};

const processExcelData = (worksheet: XLSX.WorkSheet): TableData[] => {
    const processedData: TableData[] = [];
    
    const options = { 
        raw: true,
        header: 1,
        defval: '',
        blankrows: false
    };
    
    const jsonData = XLSX.utils.sheet_to_json(worksheet, options);
    console.log("Raw Excel Data:", jsonData);

    let currentActivityGroup = "";
    let currentActivityCategory = ""; 
    let headers: string[] = [];
    let headerRow: any[] = [];
    
    for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (!row || !row.length) continue;

        const cleanRow = row.map(cell => String(cell || '').trim());
        const firstCell = cleanRow[0];

        // Check for Section/Activity Group
        if (firstCell.toLowerCase().includes("section")) {
            currentActivityGroup = firstCell.split(":")[1]?.trim() || firstCell;
            console.log("Found Activity Group:", currentActivityGroup);
            continue;
        }

        // Check for Table header
        if (firstCell.toLowerCase().includes("table")) {
            currentActivityCategory = firstCell;
            headers = [];
            headerRow = [];
            console.log("Found Activity Criteria:", currentActivityCategory);
            continue;
        }

        // Look for header row with more specific matching
        if (firstCell === "Criteria" || firstCell === "Criteria (English)") {
            headerRow = cleanRow.map(header => String(header || '').trim());
            headers = headerRow.filter(Boolean);
            
            // Debug header detection
            console.log("Headers Found:", headerRow);
            continue;
        }

        // Process data rows
        if (headers.length > 0 && firstCell && 
            !firstCell.toLowerCase().includes("table") && 
            !firstCell.toLowerCase().includes("section")) {
            
            // Find total column index - look for exact match
            let totalIndex = headerRow.findIndex(header => {
                const headerStr = String(header || '').trim();
                return headerStr === 'Total';
            });

            // If Total not found, try looking for it in last column
            if (totalIndex === -1 && cleanRow.length > 0) {
                totalIndex = cleanRow.length - 1;
            }

            const unitIndex = headerRow.findIndex(header => 
                String(header).toLowerCase().trim() === 'unit'
            );

            console.log("Processing row:", {
                firstCell,
                totalIndex,
                totalValue: totalIndex > -1 ? cleanRow[totalIndex] : null,
                fullRow: cleanRow
            });

            const rowData: TableData = {
                ActivityID: firstCell,
                ActivityCategory: currentActivityCategory,
                ActivityGroup: currentActivityGroup,
                Value: totalIndex > -1 ? cleanRow[totalIndex] || '' : '',
                Uploaded: "yes",
                Status: "Uploaded",
                Unit: unitIndex > -1 ? cleanRow[unitIndex] || '' : '',
            };

            processedData.push(rowData);
        }
    }

    console.log("Processed Data:", processedData);
    return processedData;
};

const UploadDocumentGovernance: React.FunctionComponent<IWidgetProps> = (props) => {
    const crudRef = useRef(null);
    const alert = useAlert();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
    
    // Default month is current month - we'll keep this in state even though dropdown is removed
    const [selectedMonth, setSelectedMonth] = useState<string>(String(new Date().getMonth() + 1));
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()));

    const [showEditModel,setShowEditModel] = useState<boolean>(false)
    const [payload,setPayload] = useState<any>()
    const [tableData, setTableData] = useState<TableData[]>([]);

    // Define the default sheet name
    const defaultSheetName = "Input  - Governance Revised ";

    const refreshCrud = () => {
        if (crudRef.current) {
            crudRef.current.refresh();
        }
    };
    
    const validateUpload = (): boolean => {
        if (!file) {
            setError("Please select a file to upload");
            return false;
        }

        if (!selectedYear) {
            setError("Please select a year");
            return false;
        }

        return true;
    };
    
    const handleCancelUpload = async () => {
        setFile(null);
    }
    
    const handleFileChange = async (file: File, isValid: boolean) => {
        if (!isValid) {
            setError('Please upload only Excel files (.xlsx or .xls)');
            return;
        }

        setFile(file);
        setError(null);
        setLoading(false);
        setSuccess(false);
    };

    const handleSubmit = async () => {
        if (!validateUpload()) {
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const reader = new FileReader();
            reader.onload = async (e: ProgressEvent<FileReader>) => {
                try {
                    const binary = e.target?.result;
                    if (binary && typeof binary === 'string') {
                        const workbook = XLSX.read(binary, { type: 'binary' });
                        
                        // Check if the default sheet exists
                        if (!workbook.SheetNames.includes(defaultSheetName)) {
                            setError(`Sheet "${defaultSheetName}" not found in the uploaded file. Available sheets: ${workbook.SheetNames.join(", ")}`);
                            setLoading(false);
                            return;
                        }
                        
                        const worksheet = workbook.Sheets[defaultSheetName];
                        const processedData = processExcelData(worksheet);
                        setTableData(processedData);
                        const payload = {
                            json: JSON.stringify(processedData),
                            month: selectedMonth,
                            year: selectedYear
                        };
                        console.log("Final payload:", payload);
                        setPayload(payload)
                        setShowEditModel(true)
                        setLoading(false);
                    }
                } catch (error) {
                    console.error('Error processing sheet:', error);
                    setError('Error processing the Excel sheet. Please check the file format.');
                    setLoading(false);
                }
            };
            reader.onerror = () => {
                setError('Error reading the file. Please try again.');
                setLoading(false);
            };
            reader.readAsBinaryString(file);
        } catch (error) {
            setError('Error processing the request');
            setLoading(false);
        }
    };

    const handleApprove = () => {
        console.log(tableData)
        
        setLoading(true);
        setError(null);
        const updatedPayload = {
            ...payload,
            json: JSON.stringify(tableData)
        };

        props.uxpContext?.executeAction('ESG', 'UploadGovernanceDocument', updatedPayload, {})
        .then((res) => {
            setSuccess(true);
            setShowUploadForm(false);
            setFile(null);
            alert.show('Document successfully submitted for approval');
            setShowEditModel(false);
        })
        .catch((error) => {
            console.error('Error executing action:', error);
            alert.show(`${error}`);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <WidgetWrapper className="esg-upload-wrapper">
            <TitleBar title='Governance Data Upload' className="title-bar">
                <FilterPanel>
                </FilterPanel>
            </TitleBar>
            <div className="ESGWrapper">
                <div className="upload-section">
                    <div className="upload-form">
                        <div className="file-upload-container">
                            {file ? (
                                <div className="file-info">
                                    <div className="file-details">
                                        <span className="file-name">{file.name}</span>
                                        <IconButton
                                            type="close"
                                            onClick={handleCancelUpload}
                                            className="cancel-upload"
                                            size="small"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <FileInput
                                    value={file}
                                    onChange={handleFileChange}
                                    className="esg-file-input"
                                    dropAreaIcon={'file'}
                                    dropAreaLabel="Drag and drop your Excel file here or click to browse"
                                    preview={{
                                        showName: true,
                                        showPreview: false
                                    }}
                                />
                            )}
                        </div>

                        <div className="selection-controls">
                            <div className="controls-row">
                                <div className="select-container">
                                    <label>Year</label>
                                    <Select
                                        options={getYears()}
                                        selected={selectedYear}
                                        onChange={(value) => setSelectedYear(value as string)}
                                        placeholder="Select Year"
                                    />
                                </div>
                            </div>
                            {file && (
                                <div className="button-container">
                                    <Button
                                        title="Submit"
                                        onClick={handleSubmit}
                                        className="submit-btn"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            )}
                        </div>

                        {success && (
                            <div className="success-message">
                                File "{file?.name}" uploaded successfully and submitted for approval
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        {loading && <Loading />}
                    </div>
                </div>
            </div>
            <Modal show={showEditModel}
                onClose={() => {setShowEditModel(false),setLoading(false)}}
                title={"Edit ESG Data"}>
                <div className="p-4">
                {error && (
                    <div className="mb-4 p-4 bg-red-50 text-red-600 rounded">
                        {error}
                    </div>
                )}
                        {success ? (
            <div className="p-4 bg-green-50 text-green-600 rounded">
                Data successfully submitted for approval
            </div>
        ) : (
            <>
                    <CRUDComponent
                        ref={crudRef}
                        edit={{
                            title: 'Edit ESG Data',
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
                                        },

                                    ]
                                }
                            ],
                            onSubmit: async (data: any, oldData: any): Promise<ActionResponse> => {
                                setTableData(prevData => 
                                    prevData.map(item => 
                                        item === oldData ? { ...data, Status: "Uploaded", Uploaded: "yes" } : item
                                    )
                                );
                                return {
                                    status: "done", // Adding required status field
                                    message: "Record updated successfully",
                                };
                            },
                            afterSave: () => {}
                        }}
                        add={{
                            title: 'Add New ESG Data',
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
                                            name: 'Unit',
                                            label: 'Unit',
                                            type: 'text'
                                        },
                                        {
                                            name: 'Value',
                                            label: 'Total',
                                            type: 'text',
                                            validate: { required: true }
                                        }
                                    ]
                                }
                            ],
                            onSubmit: async (data: any): Promise<ActionResponse> => {
                                const newRecord = {
                                    ...data,
                                    Status: "Uploaded",
                                    Uploaded: "yes",
                                    Month: selectedMonth,
                                    Year: selectedYear
                                };
                                setTableData(prev => [...prev, newRecord]);
                                return {
                                    status: "done", // Adding required status field
                                    message: "Record added successfully",
                                    
                                };
                            },
                            afterSave: () => {}
                        }}
                        list={{
                            search: { 
                                enabled: true, 
                                fields: ['ActivityID', 'ActivityCategory', 'ActivityGroup', 'Value','Unit'] 
                            },
                            data: { getData:tableData },
                            defaultPageSize: 10,
                            title: 'ESG Data',
                            columns: [
                                { id: 'ActivityID', label: 'Activity ID' },
                                { id: 'ActivityCategory', label: 'Category' },
                                { id: 'ActivityGroup', label: 'Group' },
                                { id: 'Unit', label: 'Unit' },
                                { id: 'Value', label: 'Total' }
                            ]
                        }}
                    />
                    <div className="mt-4 flex justify-end">
                        <Button
                            className="approve"
                            title="Submit for Approval"
                            onClick={handleApprove}
                        >
                            Submit for Approval
                        </Button>
                    </div>
                    </>
                    )}
                </div>
                    
            </Modal>
        </WidgetWrapper>
    );
};

export default UploadDocumentGovernance;