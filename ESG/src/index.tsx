import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { 
    registerWidget, 
    IContextProvider 
} from './uxp';
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
import './styles.scss'
import UploadDocument from "./Components/UploadDocument";
import Approval from "./Components/Approval";

export interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

const ESGWidget: React.FunctionComponent<IWidgetProps> = (props) => {
     
        return (
        <>
            <UploadDocument></UploadDocument>
            <Approval></Approval>
        </>
        )
    
};


registerWidget({
    id: "UploadDocument",
    widget: UploadDocument,
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
