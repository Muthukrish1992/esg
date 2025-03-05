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
import UploadDocumentSocial from "./Components/UploadDocumentSocial";
import UploadDocumentOHS from "./Components/UploadDocumentOHS";
import SocialDataApproval from "./Components/SocialDataApproval";
import GovernanceDataApproval from "./Components/GovernanceDataApproval";
import UploadDocumentGovernance from "./Components/UploadDocumentGovernance";
import OHSDataApproval from "./Components/OHSDataApproval";
import SocialReport from "./Components/SocialReport";
import GovernanceReport from "./Components/GovernanceReport";
import OHSReport from "./Components/OHSReport";


export interface IWidgetProps {
    uxpContext?: IContextProvider,
    instanceId?: string
}

const ESGWidget: React.FunctionComponent<IWidgetProps> = (props) => {
     
        return (
        <>
            <UploadDocumentSocial></UploadDocumentSocial>
            <SocialDataApproval></SocialDataApproval>
            <SocialReport></SocialReport>
            <OHSReport></OHSReport>
            <GovernanceReport></GovernanceReport>
            <GovernanceDataApproval></GovernanceDataApproval>
            <OHSDataApproval></OHSDataApproval>
            <UploadDocumentGovernance></UploadDocumentGovernance>
        </>
        )
    
};


registerWidget({
    id: "UploadDocumentSocial",
    widget: UploadDocumentSocial,
    configs: {
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});
registerWidget({
    id: "UploadDocumentGovernance",
    widget: UploadDocumentGovernance,
    configs: {
        props:[
            
        ],
        layout: {
            w: 12,
            h: 12,
            minH: 12,
            minW: 12
        }
    }
});

registerWidget({
    id: "UploadDocumentOHS",
    widget: UploadDocumentOHS,
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
