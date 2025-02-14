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
    Year?: string;
    MaleValue?: string;
    FemaleValue?: string;
    January?: string;
    February?: string;
    March?: string;
    April?: string;
    May?: string;
    June?: string;
    July?: string;
    August?: string;
    September?: string;
    October?: string;
    November?: string;
    December?: string;
}

const getYears = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, i) => ({
        label: String(currentYear - i),
        value: String(currentYear - i)
    }));
};


// Define month keys as a type for type safety
type MonthKey = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 
                'July' | 'August' | 'September' | 'October' | 'November' | 'December';

interface TableData {
    ActivityID: string;
    ActivityCategory: string;
    ActivityGroup: string;
    Value: string;
    Uploaded: string;
    Status: string;
    Year?: string;
    January?: string;
    February?: string;
    March?: string;
    April?: string;
    May?: string;
    June?: string;
    July?: string;
    August?: string;
    September?: string;
    October?: string;
    November?: string;
    December?: string;
}

type MonthColumns = Record<MonthKey, number>;

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
    
    // Month mapping for locating correct columns
    const monthColumns: MonthColumns = {
        January: -1,
        February: -1,
        March: -1,
        April: -1,
        May: -1,
        June: -1,
        July: -1,
        August: -1,
        September: -1,
        October: -1,
        November: -1,
        December: -1
    };
    
    const months: MonthKey[] = Object.keys(monthColumns) as MonthKey[];
    
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
            console.log("Found Activity Category:", currentActivityCategory);
            continue;
        }

        // Look for header row and identify month columns
        if (firstCell === "Criteria" || firstCell === "Criteria (English)") {
            headerRow = cleanRow.map(header => String(header || '').trim());
            headers = headerRow.filter(Boolean);
            
            // Find month column indices
            months.forEach(month => {
                monthColumns[month] = headerRow.findIndex(header => 
                    String(header).trim().toLowerCase() === month.toLowerCase()
                );
            });
            
            console.log("Headers Found:", headerRow);
            console.log("Month Columns:", monthColumns);
            continue;
        }

        // Process data rows
        if (headers.length > 0 && firstCell && 
            !firstCell.toLowerCase().includes("table") && 
            !firstCell.toLowerCase().includes("section")) {
            
            const rowData: TableData = {
                ActivityID: firstCell,
                ActivityCategory: currentActivityCategory,
                ActivityGroup: currentActivityGroup,
                Value: '', // We'll calculate this from monthly values if needed
                Uploaded: "yes",
                Status: "Uploaded"
            };

            // Add monthly values
            months.forEach(month => {
                const index = monthColumns[month];
                if (index !== -1) {
                    rowData[month] = cleanRow[index] || '';
                }
            });

            // Calculate total if needed (sum of all months)
            const monthlyValues = months
                .map(month => Number(rowData[month]) || 0);
            
            const total = monthlyValues.reduce((sum, val) => sum + val, 0);
            rowData.Value = String(total || '');

            processedData.push(rowData);
        }
    }

    console.log("Processed Data:", processedData);
    return processedData;
};
 

const UploadDocumentOHS: React.FunctionComponent<IWidgetProps> = (props) => {
    const crudRef = useRef(null);
    const alert = useAlert();
    const [file, setFile] = useState<File | null>(null);
    const [sheets, setSheets] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
    
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()));

    const [showEditModel,setShowEditModel] = useState<boolean>(false)
    const [payload,setPayload] = useState<any>()
    const [tableData, setTableData] = useState<TableData[]>([]);

    const refreshCrud = () => {
        if (crudRef.current) {
            crudRef.current.refresh();
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

        props.uxpContext?.executeAction('ESG', 'UploadOHSDocument', updatedPayload, {})
        .then((res) => {
            
            setSuccess(true);
            setShowUploadForm(false);
            setFile(null);
            setSelectedSheet("");
            setSheets([]);
            alert.show('Success', 'Data successfully submitted for approval'); // Using alert hook
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
            <TitleBar title='OHS Data Upload'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>
            <div className="ESGWrapper">
                <div className="flex items-center space-x-4 border-b pb-4">
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <Button
                    className="upload"
                        title="Upload Excel"
                        onClick={() => setShowUploadForm(true)}
                    >
                        Upload Excel
                    </Button>

                </div>

                {showUploadForm && (
                    <div className="flex flex-col space-y-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <label>
                                Selected File
                            </label>
                            
                            {file && <span className="text-sm text-gray-600">{file.name}</span>}
                        </div>

                        <div className="flex items-details">

                            <div className="getYears">
                                <Select
                                    options={getYears()}
                                    selected={selectedYear}
                                    onChange={(value) => setSelectedYear(value as string)}
                                    placeholder="Select Year"
                                />
                            </div>
                        </div>

                        {sheets.length > 0 && (
                            <div className="submitSheet">
                                <div className="selectSheet">
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
                                    className="Submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {success && (
                    <div className="text-green-600 bg-green-50 p-4 rounded">
                        File "{file?.name}" uploaded successfully and submitted for approval
                    </div>
                )}

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {loading && <Loading />}
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
 
                ]
            },
            {
                title: 'Monthly Values',
                columns: 1,
                fields: [
                    {
                        name: 'January',
                        label: 'January',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'February',
                        label: 'February',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'March',
                        label: 'March',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'April',
                        label: 'April',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'May',
                        label: 'May',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'June',
                        label: 'June',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'July',
                        label: 'July',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'August',
                        label: 'August',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'September',
                        label: 'September',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'October',
                        label: 'October',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'November',
                        label: 'November',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'December',
                        label: 'December',
                        type: 'text',
                        value: '0'
                    }
                ]
            }
        ],
        onSubmit: async (data: any, oldData: any): Promise<ActionResponse> => {
            // Calculate total value from monthly values
            const monthlyTotal = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ].reduce((sum, month) => sum + (Number(data[month]) || 0), 0);

            const updatedData = {
                ...data,
                Value: String(monthlyTotal),
                Status: "Uploaded",
                Uploaded: "yes"
            };

            setTableData(prevData => 
                prevData.map(item => 
                    item === oldData ? updatedData : item
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
                    }
                ]
            },
            {
                title: 'Monthly Values',
                columns: 1,
                fields: [
                    {
                        name: 'January',
                        label: 'January',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'February',
                        label: 'February',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'March',
                        label: 'March',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'April',
                        label: 'April',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'May',
                        label: 'May',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'June',
                        label: 'June',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'July',
                        label: 'July',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'August',
                        label: 'August',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'September',
                        label: 'September',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'October',
                        label: 'October',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'November',
                        label: 'November',
                        type: 'text',
                        value: '0'
                    },
                    {
                        name: 'December',
                        label: 'December',
                        type: 'text',
                        value: '0'
                    }
                ]
            }
        ],
        onSubmit: async (data: any): Promise<ActionResponse> => {
            // Calculate total value from monthly values
            const monthlyTotal = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ].reduce((sum, month) => sum + (Number(data[month]) || 0), 0);

            const newRecord = {
                ...data,
                Value: String(monthlyTotal),
                Status: "Uploaded",
                Uploaded: "yes",
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
            { id: 'January', label: 'Jan' },
            { id: 'February', label: 'Feb' },
            { id: 'March', label: 'Mar' },
            { id: 'April', label: 'Apr' },
            { id: 'May', label: 'May' },
            { id: 'June', label: 'Jun' },
            { id: 'July', label: 'Jul' },
            { id: 'August', label: 'Aug' },
            { id: 'September', label: 'Sep' },
            { id: 'October', label: 'Oct' },
            { id: 'November', label: 'Nov' },
            { id: 'December', label: 'Dec' }
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

export default UploadDocumentOHS;
