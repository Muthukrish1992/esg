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
} from "uxp/components";
import * as XLSX from 'xlsx';
import './uploadstyles.scss';

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
    MaleValue?: string;
    FemaleValue?: string;
}

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

        if (firstCell.toLowerCase().includes("section")) {
            currentActivityGroup = firstCell.split(":")[1]?.trim() || firstCell;
            continue;
        }

        if (firstCell.toLowerCase().includes("table")) {
            currentActivityCategory = firstCell;
            headers = [];
            headerRow = [];
            continue;
        }

        if (firstCell === "Criteria" || firstCell === "Criteria (English)") {
            headerRow = cleanRow.map(header => String(header || '').trim());
            headers = headerRow.filter(Boolean);
            continue;
        }

        if (headers.length > 0 && firstCell && 
            !firstCell.toLowerCase().includes("table") && 
            !firstCell.toLowerCase().includes("section")) {
            
            let totalIndex = headerRow.findIndex(header => {
                const headerStr = String(header || '').trim();
                return headerStr === 'Total';
            });

            if (totalIndex === -1 && cleanRow.length > 0) {
                totalIndex = cleanRow.length - 1;
            }

            const maleIndex = headerRow.findIndex(header => 
                String(header).toLowerCase().trim() === 'male' || 
                String(header).toLowerCase().trim() === 'm'
            );
            const femaleIndex = headerRow.findIndex(header => 
                String(header).toLowerCase().trim() === 'female' || 
                String(header).toLowerCase().trim() === 'f'
            );

            const rowData: TableData = {
                ActivityID: firstCell,
                ActivityCategory: currentActivityCategory,
                ActivityGroup: currentActivityGroup,
                Value: totalIndex > -1 ? cleanRow[totalIndex] || '' : '',
                Uploaded: "yes",
                Status: "Uploaded",
                MaleValue: maleIndex > -1 ? cleanRow[maleIndex] || '' : '',
                FemaleValue: femaleIndex > -1 ? cleanRow[femaleIndex] || '' : ''
            };

            processedData.push(rowData);
        }
    }

    return processedData;
};



const UploadDocumentSocial: React.FunctionComponent<IWidgetProps> = (props) => {
    const crudRef = useRef(null);
    const alert = useAlert();
    const [file, setFile] = useState<File | null>(null);
    const [sheets, setSheets] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState(false);
    
    const [selectedMonth, setSelectedMonth] = useState<string>(String(new Date().getMonth() + 1));
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()));

    const [showEditModel, setShowEditModel] = useState<boolean>(false);
    const [payload, setPayload] = useState<any>();
    const [tableData, setTableData] = useState<TableData[]>([]);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files[0]) {
            const file = files[0];
            if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                file.type === 'application/vnd.ms-excel') {
                handleFileUpload({ target: { files: [file] } } as any);
            } else {
                setError('Please upload only Excel files (.xlsx or .xls)');
            }
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            setError(null);
            setLoading(true);
            setSuccess(false);

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const binary = e.target?.result;
                    if (binary && typeof binary === 'string') {
                        const workbook = XLSX.read(binary, { type: 'binary' });
                        setSheets(workbook.SheetNames);
                    }
                    setLoading(false);
                } catch (error) {
                    console.error('Error reading Excel file:', error);
                    setError('Error reading Excel file. Please check the file format.');
                    setLoading(false);
                }
            };
            reader.onerror = () => {
                setError('Error reading the file. Please try again.');
                setLoading(false);
            };
            reader.readAsBinaryString(files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!file || !selectedSheet) {
            setError("Please select both a file and a sheet before submitting");
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
                        const worksheet = workbook.Sheets[selectedSheet];
                        const processedData = processExcelData(worksheet);
                        
                        setTableData(processedData);
                        const payload = {
                            json: JSON.stringify(processedData),
                            month: selectedMonth,
                            year: selectedYear
                        };

                        setPayload(payload);
                        setShowEditModel(true);
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
        setLoading(true);
        setError(null);
        const updatedPayload = {
            ...payload,
            json: JSON.stringify(tableData)
        };

        props.uxpContext?.executeAction('ESG', 'UploadSocialDocument', updatedPayload, {})
        .then((res) => {
            setSuccess(true);
            setShowUploadForm(false);
            setFile(null);
            setSelectedSheet("");
            setSheets([]);
            alert.show('Success', 'Data successfully submitted for approval');
            setShowEditModel(false);
        })
        .catch((error) => {
            console.error('Error executing action:', error);
            alert.show(`Error sending data to server.${error}`);
        })
        .finally(() => {
            setLoading(false);
        });
    };

    return (
        <WidgetWrapper>
            <TitleBar title='Social Data Upload'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>
            <div className="ESGWrapper">
                <div className="upload-section">
                    <div className="upload-form">
                        <div className="file-upload-container">
                            <div 
                                className={`drag-drop-area ${isDragging ? 'dragging' : ''} ${file ? 'has-file' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="upload-icon">
                                    <i className="fas fa-cloud-upload-alt"></i>
                                </div>
                                <div className="upload-text">
                                    <p>Drag and drop your Excel file here</p>
                                    <p>or</p>
                                    <label htmlFor="file-upload" className="custom-file-upload">
                                        Browse Files
                                    </label>
                                </div>
                                <input
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileUpload}
                                    className="hidden-input"
                                    id="file-upload"
                                />
                                {file && (
                                    <div className="file-info">
                                        <span className="file-name">{file.name}</span>
                                        <button 
                                            className="remove-file"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                setSheets([]);
                                                setSelectedSheet("");
                                            }}
                                        >
                                            
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="selection-controls">
                            <div className="date-selectors">
                                <div className="select-container">
                                    <label>Month</label>
                                    <Select
                                        options={getMonths()}
                                        selected={selectedMonth}
                                        onChange={(value) => setSelectedMonth(value as string)}
                                        placeholder="Select Month"
                                    />
                                </div>
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

                            {sheets.length > 0 && (
                                <div className="sheet-selection">
                                    <div className="select-container">
                                        <label>Sheet</label>
                                        <Select
                                            options={sheets.map(sheet => ({ label: sheet, value: sheet }))}
                                            selected={selectedSheet}
                                            onChange={(value) => setSelectedSheet(value as string)}
                                            placeholder="Select Sheet"
                                        />
                                    </div>
                                    <Button
                                        title="Submit"
                                        onClick={handleSubmit}
                                        disabled={!selectedSheet}
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
            <Modal 
    show={showEditModel}
    onClose={() => {
        setShowEditModel(false);
        setLoading(false);
    }}
    title="Edit ESG Data"
>
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
                                        label: 'Total Value',
                                        type: 'text',
                                        validate: { required: true }
                                    },
                                    {
                                        name: 'MaleValue',
                                        label: 'Male Value',
                                        type: 'text'
                                    },
                                    {
                                        name: 'FemaleValue',
                                        label: 'Female Value',
                                        type: 'text'
                                    }
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
                                status: "done",
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
                                        name: 'Value',
                                        label: 'Total Value',
                                        type: 'text',
                                        validate: { required: true }
                                    },
                                    {
                                        name: 'MaleValue',
                                        label: 'Male Value',
                                        type: 'text'
                                    },
                                    {
                                        name: 'FemaleValue',
                                        label: 'Female Value',
                                        type: 'text'
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
                                status: "done",
                                message: "Record added successfully",
                            };
                        },
                        afterSave: () => {}
                    }}
                    list={{
                        search: { 
                            enabled: true, 
                            fields: ['ActivityID', 'ActivityCategory', 'ActivityGroup', 'Value'] 
                        },
                        data: { getData: tableData },
                        defaultPageSize: 10,
                        title: 'ESG Data',
                        columns: [
                            { id: 'ActivityID', label: 'Activity ID' },
                            { id: 'ActivityCategory', label: 'Category' },
                            { id: 'ActivityGroup', label: 'Group' },
                            { id: 'Value', label: 'Total Value' },
                            { id: 'MaleValue', label: 'Male Value' },
                            { id: 'FemaleValue', label: 'Female Value' }
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

export default UploadDocumentSocial;

