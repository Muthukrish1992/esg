declare module "widget-designer/components" {


    export type IWidgetMode = 'preview' | 'live' | 'thumbnail';
    export type PropertyPanelType = 'general' | 'properties' | 'fields' | 'templates';

    export interface IWidgetProps {
        description?: string;
        name?: string;
        height?: number;
    }


    export interface IWidgetTemplateProps<T = any> {
        uxpContext?: IContextProvider;
        designer: IWDDesignModeProps;
        uiProps?: T;
        initialSource: string;
        updateWidgetHeight?: (height: number) => void
    }
    export type TemplateRenderer = (props: IWidgetTemplateProps) => JSX.Element;
    export interface ILayoutProps {
        w?: number,
        h?: number,
        minW?: number,
        minH?: number,
        maxH?: number,
        maxW?: number
    }
    export type TargetDataStructure = 'value' | 'dictionary' | 'value-array' | 'dictionary-array';

    export interface IWidgetTemplate {
        template: TemplateRenderer;
        toolbar?: TemplateRenderer;
        id: string;
        name: string,
        description: string;
        icon?: IconProp | JSX.Element,
        canDragDropFields?: boolean,
        layout?: ILayoutProps,
        complexity?: 'easy' | 'medium' | 'hard' | 'advanced',
        preLoader?: IWidgetPreloader,
        expectedSchema?: TargetDataStructure,
        autoHieght?: boolean,
        getHeight?: () => number,
        defaultProps?: any,
        key?: string // for user templates
        isTemplate?: boolean,
        moduleId?: string
    }
    export type IUIPropertyDefinitionMap = {
        [key: string]: (
            IUIPropertyDefinition<IBaseProperty>
            | { [subKey: string]: IUIPropertyDefinition<IBaseProperty> }
        )
    };

    export type SourceBrowser = (uxpContext: IContextProvider, template: IWidgetTemplate, onCancel: () => void, onSelected: (source: IModelPreview | IActionPreview) => Promise<boolean>) => React.ReactElement;

    export interface IErrorProps {
        id: string,
        error: string,
        type: 'property' | 'general',
        containerId?: string,
        fieldId?: string,
        fieldClassName?: string,
        highLightOnAdd?: boolean
    }
    export interface IWDDesignModeProps {
        mode: IWidgetMode;
        widgetName: string;
        selectedPanel?: PropertyPanelType
        onSelect: (ref: any, props: any, data: any, id?: string) => void;
        selectedItem: any;
        setUIProps: (uiProps: any) => void;
        setWidgetProperties: (props: IWidgetProps) => void;
        sourceBrowser: SourceBrowser;
        addErrors: (errors: IErrorProps[]) => void
        removeErrors: (ids: string[]) => void
        removeAllErrors: () => void
    }


    export type PropertyPath = string | number | Array<string | number>;


    export interface IBaseProperty {
    }

    export interface IPropertyEditorProps<T> {
        uiProps: T;
        onChange: (newProps: T) => void;
        onChangeAny: (path: PropertyPath, value: any) => void;
        uxpContext: IContextProvider,
        data?: any
        parentUIProps: any;
        designer: IWDDesignModeProps;
    }

    export interface IUIPropertyDefinition<T> {
        defaults: T;
        render: (props: IPropertyEditorProps<T>, uxpContext?: IContextProvider, data?: any, containerId?: string) => JSX.Element;
    }
    export interface ISelectableItemUIProp {
        id: PropertyPath;
        value: IBaseProperty;
        definition: IUIPropertyDefinition<IBaseProperty>; //IUIPropertyDefinition<any?> ?
    }

    export interface ISelectableItemProps {
        designer: IWDDesignModeProps;
        props: ISelectableItemUIProp[];
        style?: React.CSSProperties;
        onChange?: (props: any) => void;
        data?: any;
        className?: string;
        showAtRuntime?: boolean;
        elementId?: string;
        preventLosingFocusOnNextClick?: boolean;
    }
    export const SelectableItem: React.FunctionComponent<ISelectableItemProps>

    export function SimpleTextProperty(title: string, props: string, showCategoryTitle?: boolean): IUIPropertyDefinition<string>

    export function selectUIProps(props: any, propDefs: any, ...keys: string[]): ISelectableItemUIProp[]


    export interface IWDFilterPanelProps {
        designer: IWDDesignModeProps,
        uxpContext: IContextProvider,
        uiProps?: any,
        containerRef: React.MutableRefObject<any>
        data: { [key: string]: any }
        onChangeFilters: (data: any) => void,
        onClearFilters: () => void,
        onOpenPanel?: () => void,
        onClosePanel?: () => void
    }
    export const WidgetDesignerFilterPanel: React.FunctionComponent<IWDFilterPanelProps>

    export interface IWidgetWrapperWithSidebarProps {
        className: string;
        designer?: IWDDesignModeProps;
        data: any;
        uiProps: any;
        propDef: IUIPropertyDefinitionMap;
        defaultTitle?: string;
        elementId?: string;
        filterSection?: () => React.ReactElement;
        containerRef?: any;
    }
    export const WidgetWrapperWithTitleBar: React.FunctionComponent<IWidgetWrapperWithSidebarProps>


    export interface ISerializedUIField {
        id: string
        name: string
        type: string;
        props: any;
        isInputField?: boolean,
        metaType?: TCollectionAttributeMetaTypeName
    }

    export interface IUseDropArgs {
        /**
         * designer props
         */
        designer?: IWDDesignModeProps,
        /**
         * ui props from the widget
         */
        uiProps: any,
        /**
         * path for the dropable fields (in uiProps)
         */
        propPath?: PropertyPath,
        /**
         * callback on props change
         */
        onChangeFields?: (newFields: ISerializedUIField[]) => void,
        /**
         * all the data from data sources , form fields and filters and etc. 
         * sample structure 
         * {
         *      // if the widget has form fields 
         *      form: {
         *          input1: value1,
         *          input2: value2,
         *          input3: value3,
         *      },
         *      // if the widget has a filter panel 
         *      filters: {
         *          input1: value1,
         *          input2: value2,
         *      },
         *      // data from data sources 
         *      data: {
         *          source1: <data from the source>
         *      }
         * }
         */
        data?: { [key: string]: any }
        /**
         * key of the data
         * default is `form`
         * 
         * this will be used to get and set data 
         */
        dataKey?: string
        /**
         * call back when the data is changed
         */
        onChangeData?: (data: { [key: string]: any }) => void,
        /**
         * uxp context
         */
        uxpContext: IContextProvider,
        disabled?: boolean
    }

    export interface IFieldContainerProps extends IUseDropArgs { }
    export const FieldContainer: React.FunctionComponent<IFieldContainerProps>

    export interface IRedirectUrl {
        url: string,
        target?: string
    }

    interface IWidgetProps {
        id: string,
        key: string,
        isTemplate: boolean,
        sourceUrl: string
        templateType?: string,
        templateKey?: string
        templateId?: string,
    }
    export interface IRedirectWidget {
        widget: IWidgetProps,
        params?: { [key: string]: any }
    }

    export interface ILucyAction {
        modelName: string;
        action: string;
        disableParamters?: boolean,
        params: { [key: string]: any };
        dialogTitle?: string,
        executionMsg?: string,
        postExecution?: {
            success?: {
                msg?: string,
                action?: IAction,
                goToHome?: boolean,
                buttonTitle?: string,
                reloadWidget?: boolean
            },
            error?: {
                msg?: string,
                action?: IAction,
                goToHome?: boolean,
                buttonTitle?: string,
                reloadWidget?: boolean

            }
        }
    }

    export type IActionType = 'open-url' | 'open-widget' | 'execute-action'
    export interface IAction {
        type: IActionType,
        redirectUrl?: IRedirectUrl
        redirectWidget?: IRedirectWidget;
        lucyAction?: ILucyAction
    }
    export interface IActionButtonProps {
        designer?: any
        uxpContext: IContextProvider
        title: string,
        action: IAction,
        styles?: React.CSSProperties
        icon?: string,
        iconPosition?: 'left' | 'right'
        iconStyles?: React.CSSProperties,
        data?: any;
        customParams?: any;
        onReloadWidget: () => void;
    }
    export const ActionButton: React.FunctionComponent<IActionButtonProps>

    export interface IActionRenderComponentProps {
        designer: IWDDesignModeProps
        uxpContext: IContextProvider
        action: IAction
        data: any,
        onClose: () => void,
        onReloadWidget: () => void,
        customParams?: any,
    }

    export const ActionRenderComponent: React.FC<IActionRenderComponentProps>

    export function AutoCompleteTextProperty(title: string, props: string, options: () => string[]): IUIPropertyDefinition<string>
    export function ActionProperty(title: string, props: IAction): IUIPropertyDefinition<IAction>
    export type BoolObject = { [key: string]: boolean };
    export function BooleanGroupProperty(title: string, props: BoolObject, labels: any): IUIPropertyDefinition<BoolObject>
    export function BooleanProperty(title: string, props?: boolean, showCategoryTitle?: boolean): IUIPropertyDefinition<boolean>

    export interface IButtonPropertyProps extends IBaseProperty {
        label: string,
        onClick: IAction,
        color?: string,
        backgroundColor?: string,
        icon?: {
            icon: string
            position?: 'left' | 'right',
            color?: string,
            size?: string
        }
    }

    export interface IActionEditorLinkSettings {
        disableUrl?: boolean;
        disableWidget?: boolean;
        disableAction?: boolean;
        disableActionParameters?: boolean;
    }
    export function ButtonProperty(props: IButtonPropertyProps, title?: string, actionEditorSettings?: IActionEditorLinkSettings): IUIPropertyDefinition<IButtonPropertyProps>

    export interface IColorProperty extends IBaseProperty {
        color: string;
    }
    export function ColorProperty(title: string, props: IColorProperty): IUIPropertyDefinition<IColorProperty>
    export interface IBackgroundProps {
        image?: {
            image: string,
            position?: string,
            size?: string,
        },
        color?: string
    }

    export interface ITextProps {
        color?: string,
        fontSize?: string,
        align?: string,
    }
    export interface IContainerPropertyProps extends IBaseProperty {
        background?: IBackgroundProps
        text?: ITextProps
        onClick?: IAction
        removeShadow?: boolean
    }
    export function ContainerProperty(defaultProps: IContainerPropertyProps, title?: string): IUIPropertyDefinition<IContainerPropertyProps>

    export interface IDataSourceParameter {
        type: string;
        id: string;
        description: string;
        example: string;
        value: string;
    }

    export interface IDataSource {
        id: string;
        model: string;
        action: string;
        parameters: IDataSourceParameter[];
        description: string;
        icon?: string;
        schema?: any;
        type: 'model-action' | 'custom-json' | 'model-collection' | 'external-database',
        json?: any // custom json
        name?: string // source name - used for custom json and queries(in future) 
        grouping?: any[]
        filter?: any
        modelKey?: string,
        databaseId?: string
    }
    export interface IDataSourceBinding {
        source: string;
        path: string;
    }

    export function DataSourceProperty(title: string, source: IDataSourceBinding, sources: IDataSource[], context: IContextProvider, designer: IWDDesignModeProps, target: TargetDataStructure): IUIPropertyDefinition<IDataSourceBinding>

    export interface IOptions {
        showCategoryTitle?: boolean
        data: Array<{ id: string, name: string }>,
        selected?: string
    }
    export const DropdownProperty: (title: string, props: string, options: IOptions) => IUIPropertyDefinition<string>

    export function HTMLCodeProperty(title: string, defaultProps: string): IUIPropertyDefinition<string>

    export interface IIconProperty extends IBaseProperty {
        icon: string,
        color?: string
        size?: string,
    }
    export function IconProperty(props: IIconProperty, title?: string): IUIPropertyDefinition<IIconProperty>

    export function ModelProperty(title: string, source: string, sources: IDataSource[], context: IContextProvider, structure?: TargetDataStructure): IUIPropertyDefinition<string>

    export function MultipleImagesProperty(title: string, props: string[], showCategoryTitle?: boolean): IUIPropertyDefinition<string[]>
    export function RichTextProperty(title: string, props: string, showCategoryTitle?: boolean): IUIPropertyDefinition<string>
    export function SimpleDateProperty(title: string, props: Date, showCategoryTitle?: boolean): IUIPropertyDefinition<Date>
    export function SimpleNumberProperty(title: string, props: number): IUIPropertyDefinition<number>

    export interface ITextFieldProperty extends IBaseProperty {
        text: string;
        fontSize: string;
        textColor: string;
        backgroundColor: string;
    }

    export interface ITextFieldPropertySettings {
        isTextHidden?: boolean,
        isBackgroundColorHidden?: boolean,
        isFontSizeHidden?: boolean,
        isTextColorVisible?: boolean,
        useCustomColorPicker: boolean,
    }

    export function TextFieldProperty(title: string, props: ITextFieldProperty, settings?: ITextFieldPropertySettings): IUIPropertyDefinition<ITextFieldProperty>

    export interface ITextProperty extends IBaseProperty {
        text?: string,
        color?: string
        size?: string,
        align?: string
    }
    export function TextProperty(defaultProps: ITextProperty, title?: string): IUIPropertyDefinition<ITextProperty>

    export function VerticalAlignmentProperty(widgetProps: string): IUIPropertyDefinition<string>



    export function extractContainerProperties(props: IContainerPropertyProps): {
        styles: React.CSSProperties;
        onClick: IAction;
    }

    export function extractTextProperties(props: ITextProperty, defaultText?: string): {
        text: string;
        styles: React.CSSProperties;
    }

    export function hasValue(value: any, allowZero?: boolean, allowNegative?: boolean): boolean
    export function tryParseJSON(x: string, def?: any): any
    export function generateUUID(): string

    export type DebounceFunction = (...args: any[]) => void;
    export type DebounceOptions = {
        isImmediate: boolean,
    }
    export function debounce<F extends DebounceFunction>(func: F, waitMilliseconds?: number, options?: DebounceOptions): F
    export const getUrlFriendlyString: (string: string, removeSlashes?: boolean) => string
    export function loadInitialData(props: IWidgetTemplateProps): {
        isLoading: boolean;
        initialData: any;
    }
    export function extractContextData(props: IWidgetTemplateProps, initialData: any, currentContextData: any): {
        [key: string]: any;
    }
    export function formatNumber(n: number | string, decimals?: number): string

}