import * as React from "react";
import { useState } from "react";
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
    ActivityName: string;
    ActivityGroup: string;
    [key: string]: any;  // Dynamic keys based on table columns
}

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

    let currentActivityName = "";
    let currentTableTitle = "";
    let headers: string[] = [];
    let headerRow: any[] = [];
    
    // Process each row
    for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i] as any[];
        if (!row || !row.length) continue;

        const cleanRow = row.map(cell => String(cell || '').trim());
        const firstCell = cleanRow[0];

        // Check for Section/Activity Name
        if (firstCell.toLowerCase().includes("section")) {
            currentActivityName = firstCell.split(":")[1]?.trim() || firstCell;
            continue;
        }

        // Check for Table header
        if (firstCell.toLowerCase().includes("table")) {
            currentTableTitle = firstCell;
            headers = [];
            headerRow = [];
            continue;
        }

        // Look for header row
        if (firstCell === "Criteria" || firstCell === "Criteria (English)") {
            headerRow = cleanRow;
            headers = cleanRow.filter(Boolean);  // Remove empty headers
            continue;
        }

        // Process data rows
        if (headers.length > 0 && firstCell && 
            !firstCell.toLowerCase().includes("table") && 
            !firstCell.toLowerCase().includes("section")) {
            
            const rowData: TableData = {
                ActivityName: currentActivityName,
                ActivityGroup: currentTableTitle
            };

            // Add data for each header
            headers.forEach((header, index) => {
                if (header) {
                    const value = cleanRow[headerRow.indexOf(header)];
                    rowData[header] = value || '';
                }
            });

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
    const [data, setData] = useState<TableData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            console.log("File selected:", files[0].name);
            setFile(files[0]);
            setError(null);
            setLoading(true);

            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                try {
                    const binary = e.target?.result;
                    if (binary && typeof binary === 'string') {
                        const workbook = XLSX.read(binary, { type: 'binary' });
                        console.log("Available sheets:", workbook.SheetNames);
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

        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            try {
                const binary = e.target?.result;
                if (binary && typeof binary === 'string') {
                    const workbook = XLSX.read(binary, { type: 'binary' });
                    const worksheet = workbook.Sheets[selectedSheet];
                    const processedData = processExcelData(worksheet);
                    setData(processedData);
                }
                setLoading(false);
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
    };

    return (
        <WidgetWrapper>
            <TitleBar title='ESG Data Upload'>
                <FilterPanel>
                </FilterPanel>
            </TitleBar>

            <div className="flex flex-col space-y-4 p-4">
                <div className="flex items-center space-x-4">
                    <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                    />
                    <label htmlFor="file-upload">
                        <Button
                            title="Upload Excel"
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            Upload Excel
                        </Button>
                    </label>
                    {file && <span className="text-sm text-gray-600">{file.name}</span>}
                </div>

                {sheets.length > 0 && (
                    <div className="flex items-center space-x-4">
                        <div className="w-64">
                            <Select
                                options={sheets.map(sheet => ({ label: sheet, value: sheet }))}
                                selected={selectedSheet}
                                onChange={(value) => {
                                    console.log("Sheet selected:", value);
                                    setSelectedSheet(value as string);
                                }}
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

                {error && (
                    <div className="text-red-600 text-sm">
                        {error}
                    </div>
                )}

                {loading && <Loading />}

                {data && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Processed Data Preview:</h3>
                        <div className="max-h-60 overflow-auto border rounded p-4 bg-gray-50">
                            <pre>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                )}
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