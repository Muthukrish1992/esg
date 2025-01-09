
import { IWidgetTemplate } from 'widget-designer/components';
import BundleConfig from '../bundle.json';
import LocalizationMessages from '../localization.json';
import { IconProp } from "@fortawesome/fontawesome-svg-core";


// window interface
interface ILayout {
    w?: number,
    h?: number,
    isDraggable?: boolean,
    isResizable?: boolean,
    maxH?: number,
    maxW?: number,
    minH?: number,
    minW?: number,
    static?: boolean
}

interface IContainer {
    background?: string
}

interface IWidgetPropConfig {
    name: string,
    label: string,
    type: 'text' | 'string' | 'password' | 'number' | 'email' | 'checkbox' | 'toggle' | 'select' | 'date' | 'time' | 'json',
    value?: string | number | boolean,
    placeholder?: string,
    options?: Array<{ label: string, value: string }>,

    validate?: {
        required?: boolean // default is false 
        allowEmptyString?: boolean // trim value. only for string values 
        minLength?: number
        maxLength?: number
        regExp?: RegExp
        allowZeros?: boolean // on;y applicable to numbers 
        minVal?: number
        maxVal?: number
        customValidateFunction?: (value: any) => { valid: boolean, error?: string }// this is to give a custom validate function, which takes the value and return a boolean indicating value is valid or not
    }
}
export interface IConfigPanelProps {
    configs: any // configred props 
    uxpContext: IContextProvider,
    instanceId: string,
    onSubmit: (data: { [key: string]: any }) => void
    onCancel?: () => void
}
type IWidgetPreloader = 'default' | 'line-chart' | 'bar-chart' | 'donut-chart' | 'heatmap-chart' | 'gauge' | 'map'

interface IWidgetConfig {
    layout?: ILayout
    props?: IWidgetPropConfig[],
    configPanel?: React.FunctionComponent<IConfigPanelProps>,
    preLoader?: IWidgetPreloader
}

interface IWidgetObject {
    id: string,
    widget: any,
    configs?: IWidgetConfig
    defaultProps?: { [propName: string]: any }
    external?: {
        styles?: { [key: string]: string }
        scripts?: { [key: string]: string }
    }
    isTemplate?: boolean,
    isDefaultTemplate?: boolean
}
type SidebarLinkClick = () => void;

export interface ISidebarLinkProps {
    onClose: () => void;
    uxpContext: IContextProvider
}
interface IMenuPanelProps {
    uxpContext: IContextProvider
}
interface ISidebarLink {
    id: string,
    click?: SidebarLinkClick
    component?: React.FunctionComponent<ISidebarLinkProps> | React.Component<ISidebarLinkProps, {}>,
    link?: string,
    // target?: string,
    // icon?: string,
    // label: string,
}
interface IMenuItem {
    id: string,
    title?: string,
    content: () => JSX.Element
    link?: string,
    component?: React.FunctionComponent<ISidebarLinkProps> | React.Component<ISidebarLinkProps, {}>,
    menuPanel?: React.FunctionComponent<IMenuPanelProps> | React.Component<IMenuPanelProps, {}>
}

export interface ICustomUIProps {
    uxpContext: IContextProvider
}
interface IRenderUIItemProps {
    id: string,
    component: React.FunctionComponent<ICustomUIProps> | React.Component<ICustomUIProps, {}>,
    uiProps?: any,
    showDefaultHeader?: boolean
}
declare global {
    interface Window {
        registerWidget(config: IWidgetObject): void;
        registerLink(config: ISidebarLink): void;
        registerUI(config: IRenderUIItemProps): void;
        registerMenuItem(config: IMenuItem): void
    }
}


interface IWidgetManager {
    loadFromMarketPlace: boolean;
    url: string;
}

interface IPartialContextProvider {
    root: string,
    // sidebarContent: ISidebarLink[],
    scriptFiles: string[],
    widgetManager: IWidgetManager;
    lucyUrl: string;
    apiKey: string;
    userKey: string;
}

/**
 * Options for executing Lucy Actions
 */
interface ILucyActionExecutionOptions {
    /** Set this to true to parse the data as JSON and return it */
    json?: boolean;
    // unique key for the request 
    // better to have a combination of instance id and some text  (<instanceId>-<some-text>) to keep the uniqueness 
    // this key will be used when caching (coming soon :)) and cancelling previous requests 
    key?: string

    // cancel the previous request if a new request comes with the same key (above). 
    // default is false
    cancelPrevious?: boolean,

    // to skip batching and execute separately, set to true. 
    // default is false
    executeImmidiately?: boolean
}

type IDataFunction = (max: number, lastPageToken: string, args?: any) => Promise<{ items: Array<any>, pageToken: string }>;

type IShowUITypes = "popup" | "tab"
interface IShowUIOptions {
    target?: "_blank" | "_self"
}
export interface IContextProvider extends IPartialContextProvider {
    executeAction: (model: string, action: string, parameters: any, options?: ILucyActionExecutionOptions) => Promise<any>;
    executeService: (app: string, service: string, parameters: any, options?: ILucyActionExecutionOptions) => Promise<any>;
    executeComponent(component: string, route: string, method: 'get' | 'post' | 'put' | 'patch' | 'delete', params: any, body?: any): Promise<any>;
    fireEvent: (eventID: string) => Promise<void>;
    hasAppRole: (roles: string | string[]) => Promise<boolean>;
    /**
     * This will return a function that can be passed into DataList, DataTable, DynamicList
     * (max: number, lastPageToken: string, args?: any) => Promise<{ items: Array<any>, pageToken: string }>
     * this function will return a paginated set of documents for the given filter in args 
     * 
     * pass the Lucy modal name & collection name 
     */
    fromLucyDataCollection(model: string, collection: string): IDataFunction
    /**
     * 
     * @param uiId 
     * @param bundleId 
     * @param author 
     * @param type 
     * @param options 
     * 
     * this function will execute the render UI function & will render the given ui
     * 
     */
    executeRenderUI: (uiId: string, bundleId?: string, author?: string, type?: IShowUITypes, options?: IShowUIOptions) => void,
    /**
     * this will be used handle localization messages
     * @param code 
     * @param params 
     * @returns 
     */
    $L: (code: string, params?: any) => string
    language?: string
}
export function registerWidget(_widget: IWidgetObject) {
    let id = (BundleConfig.id + '/widget/' + _widget.id).toLowerCase();

    if (!window.registerWidget) {
        console.error('This code is not being run within the context of UXP');
        return;
    }

    // get widget details from bundle.json 
    // get widget
    let _widgetDetails = BundleConfig.widgets?.find((w: any) => w.id == _widget.id)

    if (!_widgetDetails) {
        console.log("Please update the bundle.json")
        throw "Error: The widget you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedWidget = { ..._widget, ..._widgetDetails, ...{ id } };

    window.registerWidget(updatedWidget);
}
export function registerLink(_link: ISidebarLink) {
    let id = (BundleConfig.id + '/sidebarlink/' + _link.id).toLowerCase();

    if (!window.registerLink) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering link....', id);
    // get widget details from bundle.json 
    // get widget
    let _linkDetails = BundleConfig.sidebarLinks?.find((s: any) => s.id == _link.id)

    if (!_linkDetails) {
        console.log("Please update the bundle.json")
        throw "Error: The sidebar link you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedLink = { ..._link, ..._linkDetails, ...{ id } }

    window.registerLink(updatedLink);
}
export function registerMenuItem(_menuItem: IMenuItem) {
    let id = (BundleConfig.id + '/menuitem/' + _menuItem.id).toLowerCase();
    if (!window.registerMenuItem) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering menu item....', id);
    // get widget details from bundle.json 
    // get widget
    let _menuItemDetails = BundleConfig.menuItems.find((s: any) => s.id == _menuItem.id)
    if (!_menuItemDetails) {
        console.log("Please update the bundle.json")
        throw "Error: The menu item you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedMenuItem = { ..._menuItem, ..._menuItemDetails, ...{ id } }

    window.registerMenuItem(updatedMenuItem);
}
export function registerUI(_ui: IRenderUIItemProps) {
    let id = (BundleConfig.id + '/ui/' + _ui.id).toLowerCase();
    if (!window.registerUI) {
        console.error('This is not is not being run within the UXP context');
        return;
    }
    console.log('registering link....', id);
    // get widget details from bundle.json 
    // get widget
    let _uiDetails = BundleConfig.uis.find((s: any) => s.id == _ui.id)
    if (!_uiDetails) {
        console.log("Please update the bundle.json")
        throw "Error: The ui you are trying to register is not in the bundle.json. Please update the bundle.json before continue";
    }
    // merge them
    let updatedUI = { ..._ui, ..._uiDetails, ...{ id } }
    window.registerUI(updatedUI);
}

export function enableLocalization() {
    (window as any).registerLocalization(LocalizationMessages)
}

export const getUrlFriendlyString = (string: string, removeSlashes?: boolean): string => {
    const from = "ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;"
    const to = "aaaaaeeeeeiiiiooooouuuunc------"

    const newText = string.split('').map(
        (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)))

    return newText
        .toString()                     // Cast to string
        .toLowerCase()                  // Convert the string to lowercase letters
        .trim()                         // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/'/g, '-e')           // Replace single quates with -
        .replace(/&/g, '-and-')           // Replace & with 'and'
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-');        // Replace multiple - with single -
}

export function registerCustomWidgetTemplate(template: IWidgetTemplate) {
    let id = getUrlFriendlyString(template.id)
    if (!template.icon) template.icon = ['fad', 'align-justify'] as IconProp

    (window as any).registerCustomWidgetTemplate(template)
    registerWidget({
        id: id,
        widget: template.template,
        isTemplate: true,
        isDefaultTemplate: false, // mark this widget as a custom template
        configs: {
            layout: template.layout || { w: 10, h: 10 },
            props: [
                {
                    name: "uiProps",
                    label: "UI",
                    type: "json"
                }
            ],
            preLoader: template?.preLoader || 'default'
        },
        defaultProps: {
            uiProps: {},
        }
    })
}