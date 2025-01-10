import * as React from "react";
import { useState, useEffect } from "react";
import { 
    registerWidget, 
    IContextProvider 
} from './uxp';
import { 
    TitleBar, 
    FilterPanel, 
    WidgetWrapper,
    Button,
    Select,
    Loading
} from "uxp/components";
import * as XLSX from 'xlsx';

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
    [key: string]: any;
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

            // Find male/female indices
            const maleIndex = headerRow.findIndex(header => 
                String(header).toLowerCase().trim() === 'male' || 
                String(header).toLowerCase().trim() === 'm'
            );
            const femaleIndex = headerRow.findIndex(header => 
                String(header).toLowerCase().trim() === 'female' || 
                String(header).toLowerCase().trim() === 'f'
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
                MaleValue: maleIndex > -1 ? cleanRow[maleIndex] || '' : '',
                FemaleValue: femaleIndex > -1 ? cleanRow[femaleIndex] || '' : ''
            };

            processedData.push(rowData);
        }
    }

    console.log("Processed Data:", processedData);
    return processedData;
};

const ESGWidget: React.FunctionComponent<IWidgetProps> = (props) => {
    const [file, setFile] = useState<File | null>(null);
    const [sheets, setSheets] = useState<string[]>([]);
    const [selectedSheet, setSelectedSheet] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showUploadForm, setShowUploadForm] = useState<boolean>(false);
    
    const [selectedMonth, setSelectedMonth] = useState<string>(String(new Date().getMonth() + 1));
    const [selectedYear, setSelectedYear] = useState<string>(String(new Date().getFullYear()));

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
                        
                        const finalData = processedData.map(item => ({
                            ...item,
                            Month: selectedMonth,
                            Year: selectedYear
                        }));

                        const payload = {
                            json: JSON.stringify(finalData),
                            month: selectedMonth,
                            year: selectedYear
                        };

                        console.log("Final payload:", payload);

                        props.uxpContext?.executeAction('ESG', 'GetDataFromExcel', payload, {})
                            .then((res) => {
                                setSuccess(true);
                                setShowUploadForm(false);
                                setFile(null);
                                setSelectedSheet("");
                                setSheets([]);
                            })
                            .catch((error) => {
                                console.error('Error executing action:', error);
                                setError('Error sending data to server');
                            })
                            .finally(() => {
                                setLoading(false);
                            });
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
        console.log('Approve button clicked');
        alert('Approval functionality will be implemented here');
    };

    return (
        <WidgetWrapper>
            <TitleBar title='ESG Data Upload'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>

            <div className="flex flex-col space-y-4 p-4">
                <div className="flex items-center space-x-4 border-b pb-4">
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <Button
                        title="Upload Excel"
                        onClick={() => setShowUploadForm(true)}
                    >
                        Upload Excel
                    </Button>
                    <Button
                        title="Approve"
                        onClick={handleApprove}
                    >
                        Approve
                    </Button>
                </div>

                {showUploadForm && (
                    <div className="flex flex-col space-y-4 mt-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                title="Select File"
                                onClick={() => document.getElementById('file-upload')?.click()}
                            >
                                Select File
                            </Button>
                            {file && <span className="text-sm text-gray-600">{file.name}</span>}
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-40">
                                <Select
                                    options={getMonths()}
                                    selected={selectedMonth}
                                    onChange={(value) => setSelectedMonth(value as string)}
                                    placeholder="Select Month"
                                />
                            </div>
                            <div className="w-40">
                                <Select
                                    options={getYears()}
                                    selected={selectedYear}
                                    onChange={(value) => setSelectedYear(value as string)}
                                    placeholder="Select Year"
                                />
                            </div>
                        </div>

                        {sheets.length > 0 && (
                            <div className="flex items-center space-x-4">
                                <div className="w-64">
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
        </WidgetWrapper>
    );
};

registerWidget({
    id: "ESG",
    widget: ESGWidget,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

export default ESGWidget;