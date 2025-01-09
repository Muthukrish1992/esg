declare module "uxp/components" {
    
    /**
     * @export
     * Options that can be passed to a portal container component
     */
    export interface IPortalContainerProps {
        /**
         * create a backdrop if true
         */
        hasBackdrop?: boolean,
    
        /**
         * callback function to click on backdrop
         */
        onClickBackdrop?: () => void,
    
        /**
         * additional styles to backdrop
         */
        backdropStyles?: any
        /**
         * disabled the scrolling of main content block if true
         * default value is true
         */
        disableScroll?: boolean,
        className?: string
    }
        
    /**
     * @export
     */
    export interface ISidebarProps {
        items: ISidebarLink[]
        onClick: (linkItem: ISidebarLink) => void,
        userGroup: string
        env: string,
        canInstallFromMarketplace?: boolean,
        expanded: boolean,
        onToggleSidebar: () => void,
        onHoverSidebar: (expanded: boolean) => void,
        className?: string
        logo?: string,
        collapsedLogo?: string,
        renderLogoWithNewStyles?: boolean,
        styles?: React.CSSProperties,
        loading?: boolean
    }
        
    /**
     * @export
     */
    export interface IProfileProps {
        hideDetails?: boolean // default false
        hideLogout?: boolean // default false
        className?: string
    }
        
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<IInputInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <Input
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.focus()
     * let element = inputRef.current?.getElement()
     *
     * ```
     */
    export interface IInputInstanceProps {
        /**
         * focus the input
         * @example
         * ```
         * inputRef.current?.focus()
         * ```
         */
        focus: () => void,
        /**
         * this will return the <Input /> element
         * @example
         * ```
         * let input = inputRef.current?.getElement()
         * ```
         */
        getElement: () => React.MutableRefObject<HTMLInputElement>
    }
        
    /**
     *
     * @export
     *
     * A checkbox component. This can render a true/value value in multiple ways. Set the type property to determine how it looks visually.
     * types : default, bordered, change-icon, switch-line, switch-box
     *
     * @example
     * ```
     *  <Checkbox
     *      checked={checked}
     *      onChange={(isChecked) => setChecked(isChecked)}
     *      label='Are you sure'
     *  />
     * ```
     *
     * @example
     * ```
     *  <Checkbox
     *      checked={checked}
     *      onChange={(isChecked) => setChecked(isChecked)}
     *      label='Are you sure'
     *      type="switch-box"
     *  />
     * ```
     *
     */
    export interface ICheckboxInstanceProps {
        focus: () => void
    }
        
    /**
     *
     * @export
     *
     * This component is used to render a search box.
     *
     * @example
     * ```
     *  <SearchBox
     *      value={inputValue}
     *      onChange={(newValue) => { setInputValue(newValue) }}
     *  />
     * ```
     *
     * @example
     *  <SearchBox
     *      value={inputValue}
     *      onChange={(newValue) => { setInputValue(newValue) }}
     *      collapsed
     *      position="right"
     *  />
     *
     */
    export interface ISearchBoxInstanceProps {
        focusInput: () => void,
        getInputElement: () => React.MutableRefObject<HTMLInputElement>
    }
        
    /**
     * The result of calling the useToast hook. This gives you methods to invoke notifications for success, errors, etc...
     * All notifications work the same way but have different styles.
     * @export
     */
    export interface IToastResult {
        success: IToast,
        error: IToast,
        warning: IToast,
        info: IToast,
        custom: IToast,
        remove: IRemove
    }
        
    /**
     * @export
     */
    export interface ISelectProps {
        /**
         * The  currently selected value
         */
        selected: string,
        /**
         * Option to pass a label for selected value,
         * This will be used in the case if unable to find the selected item
         */
        selectedLabel?: string
    
        /**
         * Gets called whenever the selection changes.
         * The value parameter has the newly selected value
         * option parameter has the complete option/ object that you passed
         */
        onChange: (value: string, option?: IOption | any) => void,
    
        /**
         * Option to unselect
         */
        onClear?: () => void
    
        /**
         * List of items to select from.
         * Each option has a label which is displayed and a value which is what we actually select.
         * also you can pass any object as options, then specify the labelField, valueField props
         */
        options: IOption[] | any[],
    
        /**
         * Option to load paginated data in to the dropdown
         * If this is given `options` passed above will be ignored
         */
        getPaginatedOptions?: (max: number, lastToken: string, query?: string) => Promise<{ items: any[], pageToken: string }>
    
        /**
         * number of options to load
         * this will be used to paginate data
         */
        pageSize?: number,
    
        /**
         * Name of the field you want to display as label
         * If not given default(label) will be used
         */
        labelField?: string,
        /**
         * Name of the field you want to return  as value
         * If not given default(value) will be used
         */
        valueField?: string,
        /**
         * Name if the field to use as icon
         * if a value is passed icon will be displayed.
         */
        iconField?: string
    
        /**
        * A function that will be responsible for rendering each individual option of the list.
        *
        * @example
        *
        * ```
        * renderItem={(option,key)=><div>{option.label}</div>}
        * ```
        *
        * @example
        * ```
        * renderItem={(option,key)=><ItemCard data={item} titleField='label' />}
        * ```
        */
        renderOption?: (item: any, key: number) => JSX.Element,
    
        /**
         * Text to show when no value is selected
         */
        placeholder?: string,
        /**
         * Any extra css classes to add to the component
         */
        className?: string,
        /**
         * Set this to false to indicate the field doesn't have a valid value
         */
        isValid?: boolean,
        // inputAttr?: any
        /**
         * show hide end of content message
         */
        showEndOfContent?: boolean,
        /**
         * Option to add a new value if not available.
         * You can enable this option and handle how you want to save the new item
         */
        addNewValues?: {
            enable: boolean,
            title: string,
            loadingTitle: string,
            onAddNewValue?: (value: string) => Promise<any>
        }
        /**
         * Option to add a classname for the dropdown
         */
        dropdownClassname?: string
        /**
         * Spacing mode
         */
        spacingMode?: SpacingMode,
    
        /**
         * This will replace the content in the dropdown.
         * If this is enabled, above options (value, onChange , etc) will not work. You have to handle everything
         * You will need to handle the value and onChange options.
         * and once you select an option, to close the dropdown, call the closeDropdown function
         */
        renderCustomDropdownContent?: (closeDropdown: () => void) => React.ReactNode
    
        /**
         * Option to custom render the placeholder
         */
        renderPlaceholder?: {
            /**
             * render input as a pill
             * work with default select dropdown
             */
            renderAsPill?: {
                minWidth?: number,
                maxWidth?: number
            },
            /**
             * for custom renders
             */
            renderCustomPill?: (onClear: () => void) => React.ReactNode
        }
    
        dropdownMinWidth?: number,
        dropdownMinHeight?: number
    }
        
    /**
     * @export
     */
    export interface ITooltipProps {
        /**
         * The content to show inside the tooltip
         * This can be either a string or a JSX element
         * @example
         *
         * ```
         * <Tooltip content="This is a tooltip" />
         * ```
         *
         * @example
         *
         * ```
         * <Tooltip content={() => <div>This is a tooltip</div>} />
         * ```
         */
        content: string | IContentFunction,
    
        /**
         * Where the tooltip should be placed relative to the element it is being displayed for
         * <Tooltip position="left" content="There are many like it but this one's mine" />
         */
        position?: ITooltipPosition
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         *  <Tooltip
         *      content="This is a tooltip"
         *  >
         *      <button className="btn showcase" >Hover to Show Tooltip</button>
         *  </Tooltip>
         * ```
         *
         * * @example
         *
         * ```
         *  <Tooltip
         *      content={() => <div>This is a tooltip</div>}
         *      position="left"
         *  >
         *      <button className="btn showcase" >Hover to Show Tooltip</button>
         *  </Tooltip>
         * ```
         *
         */
    }
        
    /**
     * @export
     *
     */
    export interface IDatePickerProps {
        /**
         * The title
         */
        title: string,
    
        /**
         * The currently selected date. Either a Date object or an ISO8601 string representation of a date
         */
        date: string | Date,
    
        /**
         * Callback that gets executed whenever a date is selected/changed in the date picker
         */
        onChange: (date: Date) => void,
    
        /**
         * Called when the calendar popup is closed
         */
        closeOnSelect?: boolean,
    
        /**
         * Additional options to control behavior
         */
        options?: IDatePickerOptions,
    
        /**
         * Set to true to prevent a user from typing in a date
         */
        disableInput?: boolean,
    
        /**
         * this will hide the labels in the placeholder (calendar icon)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean,
    
        spacingMode?: SpacingMode
    }
        
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<ITeaxtareaInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <TextArea
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.focus()
     * let element = inputRef.current?.getElement()
     *
     * ```
     */
    export interface ITextAreaInstanceProps {
        /**
         * focus the input
         * @example
         * ```
         * inputRef.current?.focus()
         * ```
         */
        focus: () => void,
        /**
         * this will return the <TextArea /> element
         * @example
         * ```
         * let input = inputRef.current?.getElement()
         * ```
         */
        getElement: () => React.MutableRefObject<HTMLTextAreaElement>
    }
        
    /**
     * @export
     */
    export interface IDateTimePickerProps {
        title: string,
        /**
        * The currently selected datetime. Either a Date object or an ISO8601 string representation of a date
        */
        datetime: string | Date,
        /**
         * Callback that gets executed whenever a datetime is selected/changed in the datetime picker
         */
        onChange: (date: Date) => void,
        /**
        * Set to true to prevent a user from typing in a datetime
        */
        disableInput?: boolean
    
        /**
        * Additional options to control behavior
        */
        options?: IDatePickerOptions,
    
        /**
         * this will hide the labels in the placeholder (icons and text)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideDateInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean,
    
        spacingMode?: SpacingMode
    }
        
    /**
     * @export
     */
    export interface TabComponentStyles {
        /**
         * alignment of the tabs
         * default -left
         */
        align?: 'center' | 'left' | 'right' | 'fill',
        /**
         * background color of the tab header
         * default - primaryBGColor
         */
        tabHeaderBackgroundColor?: string
        /**
         * height of the tab header
         * default - 40px
         */
        tabHeaderHeight?: string,
        /**
         * padding of the tab header
         * default - 0
         */
        tabHeaderPadding?: string
        /**
         * gap between tabs
         * defualt - 0
         */
        tabHeaderGap?: string
        /**
         * padding of the tab
         * default - 15px 20px
         */
        tabPadding?: string
        /**
         * border radius of the tab
         * defualt - 0
         */
        tabBorderRadius?: string
        /**
         * background color of the tab
         * defualt - primaryBGColor
         */
        tabBackgroundColor?: string,
        /**
         * text color of the tab
         * defualt - primaryTextColor
         */
        tabTextColor?: string,
        /**
         * font size of the tab label
         * default - 13px
         */
        tabContentFontSize?: string
        /**
         * icon size
         * default - 20px
         */
        tabContentIconSize?: string
        /**
         * selected tab background color
         * defualt - primaryTextColor
         */
        selectedTabBackgroundColor?: string,
        /**
         * selected tab text color
         * defualt - primaryBGColor
         */
        selectedTabTextColor?: string,
        /**
         * background color of the tab when hovering
         * defualt - secondaryBGColor
         */
        tabHoverBackgroundColor?: string
        /**
         * text color of the tab when hovering
         * defualt - secondaryTextColor
         */
        tabHoverTextColor?: string
        /**
         * aligment of the tab contnet
         * default - left
         */
        tabContentAlignment?: 'center' | 'left' | 'right'
        /**
         * background color of the contnet panel
         * default - primaryBGColor
         */
        contentBackgroundColor?: string,
        /**
         * text color of the content panel
         * default is primaryTextColor
         */
        contentTextColor?: string,
        /**
         * content area padding
         * default - 5px
         */
        contentPadding?: string,
        /**
         * option to hide the indicator at the bottom of the active tab
         * default - false
         */
        hideIndicator?: boolean
        /**
         * height of the indicator
         * default - 2px
         */
        indicatorHeight?: string,
        /**
         * width of the indicator
         * default - 50%
         */
        indicatorWidth?: string,
        /**
         * border radius of the indicator
         * default - 0
         */
        indicatorBorderRadius?: string,
    
        /**
         * colors to highlight tabs other than the selected tab
         */
        tabHighlightBackgroundColor?: string,
        /**
         * colors to highlight tabs other than the selected tab
         */
        tabHighlightTextColor?: string,
    
        /**
         * colors for disabled tabs
         */
        disabledTabBackgroundColor?: string,
        /**
         * colors for disabled tabs
         */
        disabledTabTextColor?: string,
    }
        
    /**
     * @export
     */
    export interface TabComponentProps {
        /**
         * tabs
         */
        tabs: Tab[]
        /**
         * selected tab id
         */
        selected: string,
        /**
         * on change tab
         */
        onChangeTab: (tab: string) => void,
    
        /**
         * direction of tabs
         */
        direction?: 'vertical' | 'horizontal',
    
        /**
         * position of tabs
         */
        position?: 'top' | 'bottom' | 'left' | 'right'
    
        /**
         * tab component styles
         */
        styles?: TabComponentStyles
    }
        
    /**
     * @export
     */
    export interface DynamicFormFieldProps {
        name: string,
        label: string,
        type: 'text' | 'password' | 'number' | 'email' | 'checkbox' | 'toggle' | 'select' | 'date' | 'time' | 'datetime' | 'hidden' | 'textarea' | 'json',
        value?: FormValue,
        placeholder?: string,
    
        renderField?: (data: IFormData, onValueChange: (value: any) => void) => React.ReactNode
    
        // show hide fields
        show?: (data: IFormData) => boolean
    
    
        // for select
        options?: Array<{ label: string | number, value: string | number }>,
        getOptions?: (data: IFormData) => Array<{ label: string | number, value: string | number }>
    
        // for numbers
        allowZero?: boolean
        allowNegative?: boolean,
    
        // a formatter function on value change
        formatter?: (value: any) => any
    
        validate?: {
            required?: boolean // default is false
            allowEmptyString?: boolean // trim value. only for string values
            minLength?: number
            maxLength?: number
            regExp?: RegExp
            allowZero?: boolean // only applicable to numbers
            allowNegative?: boolean,
            minVal?: number
            maxVal?: number
            customValidateFunction?: (value: any, data: IFormData) => { valid: boolean, error?: string }// this is to give a custom validate function, which takes the value and return a boolean indicating value is valid or not
        },
    }
        
    /**
     * @export
     *
     * Form section properties
     */
    export interface FormSectionProps {
        /**
         * form fields
         */
        fields: DynamicFormFieldProps[]
        /**
         * options to arrange form fields to columns
         */
        columns?: 1 | 2 | 3,
        /**
         * option to dynamically show/hide a section
         */
        show?: (data: IFormData) => boolean
        /**
         * title for the section
         */
        title?: string,
        /**
         * option to show a separator at the bottom of the section
         */
        seperator?: boolean
    }
        
    /**
     * @export
     */
    export interface DynamicFormProps {
        formStructure: FormSectionProps[],
        beforeSubmit?: (data: IFormData) => Promise<IFormData>
        onSubmit: (data: IFormData) => Promise<void>
        onCancel?: () => void,
        submitButtonLabel?: string,
        submitButtonLoadingLabel?: string,
        cancelButtonLabel?: string,
        hideCancelButton?: boolean,
        isLoading?: boolean,
        formContainerStyles?: React.CSSProperties,
        renderOptions?: {
            renderStyle: 'standard' | 'tabs' | 'wizard',
            direction?: 'vertical' | 'horizontal' // only applicable to tabs and wizard
            tabBackgroundColor?: string,
            tabTextColor?: string,
            activeTabBackgroundColor?: string,
            activeTabTextColor?: string,
            errorTabBackgroundColor?: string,
            errorTabTextColor?: string,
            disabledTabBackgroundColor?: string,
            disabledTabTextColor?: string,
            previousButtonLabel?: string,
            nextButtonLabel?: string
        }
    }
        
    /**
     * @export
     * Options that can be passed to Loaders
     */
    export interface IWidgetPreloaderLoaderProps {
    }
        
    /**
     * The result of calling the useAlert hook. This gives you methods to invoke a alert or a confirm alert
     * @export
     *
     */
    export interface IAlertResult {
        show: (content: string | IBaseAlertProps) => Promise<any>,
        confirm: (content: string | IConfirmAlertProps) => Promise<boolean>
        form: (content: IFormAlertProps) => Promise<any>
    }
        
    /**
     * @export
     * Dropdown button props
     */
    export interface IDropDownButtonProps {
        /**
         * The content to show inside the Dropdown
         * @example
         *
         * ```
         * content={() => <div>Dropdown Content</div>}
         * ```
         */
        content: () => JSX.Element,
    
        /**
         * Where the dropdown should be placed relative to the element it is being displayed for
         * default is right
         */
        position?: IDropDownButtonPosition,
        /**
         * If this is true dropdown will show on mouse over & hide n mouse out
         * If this is false dropdown ill show on click
         */
        showOnHover?: boolean
    
        /**
         * this will open the dropdown on hover and keep open even if user takes the mouse away
         * Click on outside to close the dropdown
         */
        keepShowingOnHover?: boolean,
    
        className?: string,
    
        /**
         * callback function when the popup is open
         */
        onOpen?: () => void
        /**
         * callback function when the popup is closed
         */
        onClose?: () => void
        /**
         * an option to force close a popup
         */
        forceClose?: boolean
    
        /**
         * disable scroll on open dropdown
         * true by default
         */
        disableScroll?: boolean,
    
        /**
         * if this is enabled drop down will be automatically positionsed within the view.
         * better to use this option- it has been improved
         * if enabled it will ignore the position param
         */
        autoPosition?: boolean
    }
        
    /**
     * @export
     *
     */
    export interface IColorPalletProps {
        color: string,
        onChange: (color: string) => void,
        onCancel: () => void
    }
        
    /**
     * @export
     *
     */
    export interface IColorPickerProps {
        /**
         *  default color
        */
        color: string,
        /**
         * callback on select a color
         */
        onChange: (color: string) => void,
        /**
         * picker position.  default is left
         */
        position?: IColorPickerPosition,
        /**
         * class name for additional styles
         */
        className?: string,
        /**
         * close the picker on select a color
         * default is true
         */
        closeOnSelect?: boolean,
        /**
         * change display format
         */
        displayFormat?: IColorTypes
        /**
         * change return format
         */
        returnFormat?: IColorTypes
    }
        
    /**
     * @export
     *
     */
    export interface IToggleOption {
        /**
         * The text shown to the user for this option
         */
        label: string,
    
        /**
         * The actual value stored when this option is selected
         */
        value: string
    }
        
    /**
     * @export
     */
    export interface IMultiSelectProps {
        /**
         * List of items to select from.
         * Each option has a label which is displayed and a value which is what we actually select.
         * also you can pass any object as options, then specify the labelField, valueField props
         */
        options: IOption[] | any[],
        /**
         * Name of the field you want to display as label
         * If not given default(label) will be used
         */
        labelField?: string,
        /**
         * Name of the field you want to return  as value
         * If not given default(value) will be used
         */
        valueField?: string,
        /**
         * Name if the field to use as icon
         * if a value is passed icon will be displayed.
         */
        iconField?: string
        /**
         * The  currently selected value
         *
         * ['option1', 'option2']
         */
        selected: string[],
    
        /**
         * Gets called whenever the selection changes.
         * The value parameter has the newly selected value
         * option parameter has the complete option/ object that you passed
         */
        onChange: (values: string[], options?: IOption[] | any[]) => void,
    
        /**
         * Text to show when no value is selected
         */
        placeholder?: string,
        /**
         * Any extra css classes to add to the component
         */
        className?: string,
    
        /**
         * Set this to false to indicate the field doesn't have a valid value
         */
        isValid?: boolean,
        // inputAttr?: any
        /**
         * show hide end of content message
         */
        showEndOfContent?: boolean
        /**
             * A function that will be responsible for rendering each individual option of the list.
             *
             * @example
             *
             * ```
             * renderItem={(option,key)=><div>{option.label}</div>}
             * ```
             *
             * @example
             * ```
             * renderItem={(option,key)=><ItemCard data={item} titleField='label' />}
             * ```
             */
        renderOption?: (item: any, key: number) => JSX.Element,
        wrapSelectedItemsToOneLine?: boolean,
        selectAllOnLoad?: boolean,
        hideClearButton?: boolean
        hideDoneButton?: boolean
    
        dropdownClassname?: string
    
        spacingMode?: SpacingMode
    }
        
    /**
     * @export
     *
     */
    export interface IThemeChangerProps {
        /**
         * option to pass current theme
         */
        themeName?: string,
        /**
         *
         * callback on theme change
         */
        onChangeTheme?: (themeName: string) => void
        /**
         * pass a element id to apply theme changes to that element and children
         *
         */
        rootElementId?: string
    }
        
    /**
     * @export
     */
    export interface IWidgetContainerBlockProps {
        widgets: IWidgetInstance[],
        editDashboard: boolean,
        onChangeDashboard: any,
        canEditDashboard: boolean,
        canManageWidgetsAndSettings: boolean,
        openMenu: () => void
        toolbarItems: IToolbarItem[];
        minWidth?: number,
        numberOfColumns?: number,
        onGridResize?: (width: number, height: number, cellWidth: number, margin: [number, number]) => void,
        margin?: number,
        padding?: number
        // to hide the default edit toolbar that comes in edit mode in the dashbaords
        hideDefaultEditToolbar?: boolean,
        onWidgetPropsChange?: (id: string, props: any) => void,
        onResizeStart?: () => void
        onResizeEnd?: () => void
    }
        
    /**
     * @export
     */
    export interface IPopoverProps {
        /**
         * title of the popup bubble
         *  This can be either a string or a JSX element
         * @example
         *
         * ```
         * title="Popover Title"
         * ```
         *
         * * @example
         *
         * ```
         * title={() => <div>Popover Title</div>
         * ```
         */
        title: string | IContentFunction,
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         * content="Popover Content"
         * ```
         *
         * * @example
         *
         * ```
         * content={() => <div>Popover content</div>
         * ```
         *
         */
        content: string | IContentFunction,
    
        /**
         * Where the bubble should be positioned relative to the element
         */
        position?: IPopoverPosition
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         *  <Popover
         *      title="Popover"
         *      content="This is a popover"
         *  >
         *      <button className="btn showcase" >Click to Show popover</button>
         *  </Popover>
         *
         * ```
         *
         * * @example
         *
         * ```
         *  <Popover
         *      title={() => <div>Popover</div>}
         *      content={() => <div>This is a popover</div>}
         *      position="left"
         *  >
         *      <button className="btn showcase" >Click to Show popover</button>
         *  </Popover>
         * ```
         *
         */
    }
        
    /**
     * @export
     */
    export interface IModalWizardProps {
    
        /**
         * Set this to true to show the dialog. False to hide it
         */
        show: boolean;
    
        /**
         * Call this to close the dialog
         */
        onClose:()=>void;
    
        /**
         * The title to show on the top
         */
        title: string;
    
        /**
         * An optional icon to show
         */
        icon?: string;
    
        /**
         * A method to render a subheader just below the title area.
         */
        onRenderHeader?:(currentStep:IModalWizardStepProps)=> JSX.Element;
    
        /**
         * The list of steps that this wizard consists of.
         */
        steps: IModalWizardStep[];
    
        /**
         * This action executes after they hit 'next' on the final page.
         */
        onComplete:()=>Promise<any>;
    
        /**
         * Text to show on the 'next' button in the final stage.
         */
        completionText?: string;
        className?:string;
    }
        
    /**
     * @export
     *
     * Props passed to the wizard step's render function
     */
    export interface IModalWizardStepProps {
        /**
         * Triggers the wizard to move to the next stage
         */
        next:()=>void;
    
        /**
         * Triggers the wizard to move the previous stage
         */
        prev:()=>void;
    
        /**
         * Information about the current stage
         */
        currentStep:IModalWizardStep;
        data?:any;
    }
        
    /**
     * @export
     * An individual step in a modal wizard
     */
    export interface IModalWizardStep {
        /**
         * This function returns the contents of the main area of the wizard
         */
        render:(props:IModalWizardStepProps) => JSX.Element;
    
        /**
         * This function renders the status section on the left sidebar. This will be rendered only if the `showStatus` property is not false.
         * You can return null from this function to prevent the side bar status from being rendered.
         */
        renderStatus:() => JSX.Element;
    
        /**
         * This is called just before the user tries to advance to the next stage. You can use this to validate the current stage.
         * You can return
         * a string - to indicate the id of the next step that should be taken.
         * a number - to indicate the index of the next step to be taken
         * undefined or null - to indicate it should stay on the current step
         */
        onValidateStep?:() =>string|number|undefined|null|boolean;
    
        /**
         * An optional id for this step. This is used by the onValidateStep function to address a specific step to jump to
         */
        id?:string;
    
        /**
         * The title of this step. Currently this is used only in the sidebar to show the status of that stage.
         */
        title?: string;
    
        /**
         * Set this to false to prevent the 'next' button from being shown. If this is false you will have to manually render the 'next' button yourself
         */
        showNext?: boolean;
    
    
        nextTitle?:string;
    
        /**
         * Set to false to prevent the status sidebar from being shown at this stage
         */
        showStatus?:boolean;
    
        /**
         * Render a sub-header below the main dialog header
         *
         */
        renderSubHeader?:()=>JSX.Element;
    }
        
    /**
     * @export
     * An individual pie chart slice
     */
    export interface IDataItem { name: string, value: number, color?: string }
        
    /**
     * @export
     */
    export interface IBuyOnSpaceworxButtonProps {
        /**
         * link to the marketplace product page
         * this will be deprecated. use product ids instead
         */
        link?: string
        /**
         * product ids from spaceworx
         */
        productIds?: string[]
        /**
         * class name for additional styling
         */
        className?: string
        /**
         * additional inline styles
         */
        styles?: React.CSSProperties
    }
        
    /**
     * @export
     */
    export interface ISpaceworxDescriptionTagProps {
        className?: string,
        styles?: React.CSSProperties
    }
        
    /**
     * @export
     */
    export interface IWidgetWrapperProps {
        /**
         * Any extra css class names to add to the widget wrapper
         */
        className?: string,
        cssBreakPoints?: {
            width?: {
                default: string,
                [key: number]: string
            },
            height?: {
                default: string,
                [key: number]: string
            }
        },
        /**
         * this will be used to get the widget props
         * this will be used to access the name and description of the widget
         */
        instanceId?: string
        /**
         * sample data label
         */
        sampleData?: {
            /**
             * toggle sample data label
             */
            showLabel?: boolean,
            /**
             * this will be shown in the popup
             */
            description?: string,
            /**
             * this is deprecated - use product ids instead
             * link to buy from spaceworx
             * if not provided button will not be shown
             */
            link?: string,
    
            /**
             * prouct ids to show on spaceworx
             */
            productIds?: string[]
        }
    }
        
    /**
     * @export
     *
     * Custom html marker
     * refer https://docs.eegeo.com/eegeo.js/v0.1.780/docs/leaflet/L.DivIcon/
     *
     * @example
     *  {
     *       className: 'custom-marker',
     *       html: '<div>Marker Content</div>
     *  }
     */
    export interface IDivIconInterface {
        /**
         * A custom class name to assign to the icon.
         */
        className: string,
        /**
         * A custom HTML code to put inside the div element.
         */
        html: string,
        /**
         * Size of the icon in pixels. Can be also set through CSS.
         */
        iconSize?: [number, number],
        /**
         * The coordinates of the "tip" of the icon (relative to its top left corner).
         * The icon will be aligned so that this point is at the marker's geographical location.
         * Centered by default if size is specified, also can be set in CSS with negative margins.
         */
        iconAnchor?: [number, number]
        /**
         * The coordinates of the point from which popups will "open", relative to the icon anchor.
         */
        popupAnchor?: [number, number]
    }
        
    /**
     * @export
     * Render tooltip for marker
     */
    export interface IRenderMarkerTooltip {
        /**
         * content to show in tooltip
         */
        content: () => JSX.Element,
        /**
         * direction
         * default is auto
         */
        direction?: 'top' | 'bottom' | 'left' | 'right' | 'center' | 'auto',
        /**
         * keep showing the tooltip
         * default is false
         */
        keepShowing?: boolean
    }
        
    /**
     * @export
     * Render a popup for marker
     */
    export interface IRenderMarkerPopup {
        /**
         * content to show in popup
         */
        content: () => JSX.Element,
        /**
         * open the popup on load
         */
        showOnLoad?: boolean
    }
        
    /**
     * Represents an individual marker
     * @example
     *  {
     *      latitude:0,
     *      longitude:23.2,
     *      data:{'name':'FooBar'}
     *  }
     *
     * @export
     */
    export interface IMarker extends MarkerEvents, LeafletMarkerOptions {
        /**
         * latitude
         */
        latitude: number,
        /**
         * longitude
         */
        longitude: number,
        /**
         * any data to return when click on the marker
         */
        data?: any,
        /**
         * custom HTML marker
         */
        customHTMLIcon?: IDivIconInterface,
        /**
         * content to display in pop-up
         */
        renderPopup?: IRenderMarkerPopup,
        /**
         * content to display in tooltip
         */
        renderTooltip?: IRenderMarkerTooltip,
    
        /**
         * use image coordinates to calculate bounds
         */
        imageCoordinates?: boolean,
    
    }
        
    /**
     * @export
     */
    export interface ICircleBound {
        /**
         * center of the circle
         */
        center: [number, number],
        /**
         * radius of the circle
         */
        radius: number
    }
        
    /**
     * @export
     */
    export interface IHeatmapPoint {
    
        /**
         * The latitude of the point
         */
        latitude: number;
    
        /**
         * The longitude of the point
         */
        longitude: number;
    
        /**
         * The intensity of the point
         */
        intensity: number;
    }
        
    /**
     * @export
     */
    export interface IHeatmapConfiguration {
        /**
         * The values to show on the heatmap. Each value has a coordinate and an intensity.
         * Intensities are relative the heatmap colors will be scaled based on the min/max intensities in the array
         *
         * @example
         * ```
         * heatmap={{values:[{latitude:2.3,longitude:-38.6,intensity:20},{latitude:2.4,longitude:-38.6,intensity:20},]}}
         * ```
         */
        values: IHeatmapPoint[];
    
        /**
         * Optionally - a gradient specified as an object of floating point values as keys from 0-1 and colors as the values
         *
         * @example
         * ```
         * heatmap={{values,gradient:{0.0:'blue',0.4:'yellow',0.7:'orange',0.9:'red'}}}
         * ```
         */
        gradient?: { [stop: number]: string };
    
    
        radius?: number;
    
        blue?: number;
    
        /**
         * The maximum possible intensity value.
         * If not specified, the intensities will be scaled based on the range of values provided.
         * Specify a max to set what the maximum possible value can be and the range will be scaled according to that max value
         */
        max?: number;
    
    
        /**
         * Set to true if the coordinates of the heatmap points are in the image coordinates system.
         */
        imageCoordinates?: boolean;
    }
        
    /**
     * @export
     * Region data for maps
     */
    export interface IRegion {
        /**
         * region type,
         * default is polygon
         */
        type?: regionType,
        /**
         * region bounds
         */
        bounds: IPolygonBound | ICircleBound,
        /**
         * show/hide outline of the region
         */
        hideStroke?: boolean,
        /**
         * outline color
         */
        color?: string,
        /**
         * fill color
         */
        fillColor?: string,
        /**
         * any data to return on click a region
         */
        data?: any,
        /**
         * use image coordinates to calculate bounds
         */
        imageCoordinates?: boolean,
        /**
         * A tooltip to be shown when you click on the region
         */
        tooltipContent?: (data: any) => JSX.Element;
    }
        
    /**
     * @export
     * A static image to load as the map.
     */
    export interface IStaticImage {
        /**
         * The url of the image
         */
        url: string;
        /**
         * The width of the image in pixels
         */
        width: number;
    
        /**
         * The height of the image in pixels
         */
        height: number;
        /**
         * static image bounds
         * if not provided these will be calculated based on image width and height (NOTE: this may not be accurate)
         *
         */
        bounds?: [[number, number], [number, number]]
    }
        
    /**
     * @export
     * These props are passed to the render method of each wizard step.
     *
     */
    export interface IWizardStepProps {
        /**
         * Triggers a request to go to the next step in the wizard. You can use this functional to programatically move to the next step (the user can also click the 'Next' action to do the same thing)
         */
        next: (id?: string) => void;
    
        /**
         * Similar to `next`, you can call this function to programatically go to the previous step in the wizard.
         */
        prev: () => void;
    }
        
    /**
     * Defines an individual step within a wizard.
     * Each step provides a render method to render the actual step.
     * You also need to specify a unique 'id' and title for the step.
     * You can optionally specify an `onNext` callback  to run whenever the user wants to go to the next step.
     * This can return either `null` - meaning we should not proceed to the next step, or the id of the next step to go to.
     * @export
     */
    export interface IWizardStep {
        onNext?: () => string | null;
        id: string;
        title: string;
        render: (props: IWizardStepProps) => React.ReactNode;
    }
        
    /**
     * @export
     */
    export interface IDateRangePickerProps {
        title?: string,
        /**
         * start date of the range. Either a Date object or an ISO8601 string representation of a date
         */
        startDate: string | Date,
        /**
         * end date of the range. Either a Date object or an ISO8601 string representation of a date
         */
        endDate: string | Date,
    
        /**
         * Option to pass selected preset
         */
        preset?: string
        /**
         * Callback that gets executed whenever a date range is selected/changed in the date picker
         */
        onChange: (newStartDate: string | Date, newEndDate: string | Date, preset?: string) => void,
        /**
         * Called when the calendar popup is closed
         */
        closeOnSelect?: boolean,
        /**
         * Set to true to prevent a user from typing in a date
         */
        disableInput?: boolean,
        /**
        * Additional options to control behavior
        */
        options?: IDatePickerOptions,
        /**
         * this will hide the labels in the placeholder (calendar icon and text)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean
    
        /**
         * this will set the max width and show a compact picker
         */
        compact?: boolean
    
        spacingMode?: SpacingMode,
    
        renderAsPill?: {
            minWidth?: number,
            maxWidth?: number
        },
    
        presets?: {
            enable: boolean
            customPresets?: DateRangePreset[],
            renderPreset?: (preset: DateRangePreset, index: number, onSelectPreset: (preset: string) => void) => React.ReactNode,
            parseRelativeDatesOnSelect?: boolean // if this is set to true, relative dates will be parsed to dates
        }
    }
        
    /**
     * @export
     * Options that can be passed to a date picker field
     */
    export interface IDataTableColumn {
        title: string | ITitleFunc,
        width: string,
        renderColumn: (item: any) => JSX.Element
    }
        
    /**
     * @export
     */
    export interface ICalendarComponentProps {
        /**
         * array of dates
         */
        dates: Date[]
        /**
         * callback to trigger on click date
         * ill return the clicked date
         */
        onSelectDate: (date: Date) => void
        /**
         * disable weekends
         */
        disableWeekEnds?: boolean,
        /**
         * list of dates to disable
         */
        disableDates?: Array<Date>
        /**
         * min date
         */
        minDate?: Date,
        /**
         * max date
         */
        maxDate?: Date,
        /**
         * class name to use custom styles
         */
        className?: string
    }
        
    /**
     * @export
     * Options that can be passed to a date picker field
     */
    export interface IGaugeProps {
        /**
         * min value of the gauge
         */
        min: number;
        /**
         * max value of the gauge
         */
        max: number;
        /**
         * value of the gauge
         */
        value: number;
    
        /**
         * colors array.
         * color: name of the color.
         * stopAt: length of color distribution.
         *
         * default is blue, green, yellow, red colors at equal length
         */
        colors?: Array<{ color: string, stopAt: number }>;
        /**
         * label
         * no default value
         */
        label?: () => JSX.Element,
        /**
         * if true show legend.
         * default is false
         */
        legend?: boolean,
        /**
         * color of the ticks.
         * default is white
         */
        tickColor?: string,
        /**
         * class name(s) for additional styling
         */
        className?: string,
        /**
         * additional inline styles
         */
        styles?: React.CSSProperties
    
        /**
         * if true show gradient colors
         * default is false
         */
        gradient?: boolean,
        /**
         * thickness of the gauge
         * This value is defend on the radius
         * default is radius * 0.11
         * max value is radius * 0.25
         *
         * if you pass a higher value than the max value, max value will be used
         */
        thickness?: number,
        /**
         * thickness of the large ticks
         * default is 4
         * min value is 1
         * max value is 6
         *
         * if the given value is higher than the max value, max values will be used
         */
        largeTick?: number,
        /**
         * thickness of the small ticks
         * default is 1
         * min values is 1
         * max values is 3
         *
         * if the given values is higher than the max value, max values will be used
         */
        smallTick?: number
        /**
         * backbround color of the gauge
         * default is white
         */
        backgroundColor?: string,
        /**
         * color of the labels
         * default is #424242
         */
        labelColor?: string,
        /**
         * color of the needle
         * default is gray
         */
        needleColor?: string
    }
        
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<IAutoCompleteInputInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <AutoCompleteInput
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.open()
     * inputRef.current?.close()
     * inputRef.current?.focus()
     * let input = inputRef.current?.getInputElement()
     * inputRef.current?.appendAtCursor('string to append')
     * ```
     */
    export interface IAutoCompleteInputInstanceProps {
        /**
         * this will open the picker
         *
         * @example
         * ```
         * inputRef.current?.open()
         * ```
         */
        open: () => void
        /**
         * this will close the picker
         *
         * @example
         * ```
         * inputRef.current?.close()
         * ```
         */
        close: () => void,
        /**
        * this will focus the input
        *
        * @example
        * ```
        * inputRef.current?.focus()
        * ```
        */
        focus: () => void,
        /**
         * This will return the input element
         * @example
         * ```
         * let input = inputRef.current?.getInputElement()
         * ```
         */
        getInputElement: () => React.MutableRefObject<HTMLInputElement>,
        /**
         * This will append the passed value at the cursor
         * if a selection has made it will be replaced by the passed value
         */
        appendAtCursor: (value: string) => void
    }
        
    /**
     * @export
     *
     *
     */
    export interface IFileInputProps {
        value: File | string
        onChange: (file: File, isValid: boolean) => void,
        allowedTypes?: string[]
        preview?: {
            showName?: boolean // default false,
            showPreview?: boolean // default true
        }
        className?: string,
        dropAreaIcon?: IconProp,
        dropAreaLabel?: string
    }
        
    /**
     * @export
     */
    export interface IFileInputInstanceProps {
    
    }
        
    /**
     * @export
     */
    export interface IPreviewDetails {
        isValid: boolean,
        type: 'image' | 'video' | 'other' | 'unknown'
        mime: string,
        dataUrl: string,
        name: string
    }
        
    /**
     * @export
     *
     */
    export interface ISampleDataLabelProps {
        show?: boolean;
        // info?: () => React.ReactElement;
    }
        
    /**
     * @export
     */
    export interface ILocalisationFormProps {
        code: string,
        useGoogleTranslate?: boolean,
        className?: string,
    }
        
    /**
     * @export
     */
    export interface ILanguage {
        name: string,
        code: string
    }
        
    /**
     * @export
     */
    export interface IMessage {
        key: string,
        languageCode: string,
        languageName: string,
        message: string,
        hasModified?: boolean
    }
        
    /**
     * @export
     */
    export interface ILocalisationFormModalProps {
        code: string,
        useGoogleTranslate?: boolean,
        beforeOpen?: () => boolean
        className?: string
    }
        
    /**
     * @export
     */
    export interface ILocalisationFormModalInstanceProps {
        open: () => void,
        close: () => void
    }
        
    /**
     * @export
     *
     * pagination component props
     */
    export interface PaginationProps {
        /**
         * Total nunmber of records
         */
        total: number;
        /**
         * Page size. Expected values are 10, 25, 50, 100
         */
        pageSize: number;
        /**
         * Current page
         */
        page: number;
        /**
         * Callback function when page size changes
         */
        onPageSizeChange: (pageSize: number) => void
        /**
         * Callback fucntion when page changes
         */
        onPageChange: (page: number) => void
    }
        
    /**
     * @export
     */
    export interface Column {
        id: string,
        label: string | React.ReactNode;
        renderColumn?: (item: any) => React.ReactNode,
        minWidth?: number,
        maxWidth?: number
    }
        
    /**
     * @export
     */
    export interface TableComponentProps {
        /**
         * data for the table
         * can pass a plat list of data or a function that will support pagination
         */
        data: any[] | ((page: number, pageSize: number) => Promise<{ items: any[] }>);
        /**
         * columns definitions
         */
        columns: Column[];
        /**
         * initial page size , can be change from the pagination component
         */
        pageSize: number,
        /**
         * total number of records
         */
        total: number | (() => Promise<number>)
        /**
         * loading state if require
         */
        loading?: boolean,
        /**
         * messge to show when no items found
         */
        noItemsMessage?: string | React.ReactNode,
        /**
         * this adds a edit column in to the table
         */
        editColumn?: {
            enable: boolean,
            label?: string,
            renderColumn?: (item: any) => React.ReactNode,
            onEdit?: (item: any) => void,
        },
        /**
         * this adds a edit column in to the table
         *
         */
        deleteColumn?: {
            enable: boolean,
            label?: string,
            renderColumn?: (item: any) => React.ReactNode,
            onDelete?: (item: any) => Promise<void>,
        }
        minCellWidth?: number,
        onClickRow?: (e: React.MouseEvent<HTMLDivElement>, item: any) => void
        onClickColumn?: (e: React.MouseEvent<HTMLDivElement>, item: any, column: Column) => void
    }
        
    /**
     * @export
     */
    export interface ActionResponse {
        status: 'done' | 'error',
        message?: string,
        data?: any
    }
        
    /**
     * @export
     */
    export interface ListProps {
        title: string | React.ReactNode,
        columns: Column[],
        defaultPageSize: number,
        data: {
            isPaginated?: boolean // getData function will return paginated data. Therefore that function will handle searching filtering and sorting etc.
            getData: any[] | ((page?: number, pageSize?: number, query?: string, filters?: any) => Promise<{ items: any[] }>)
            getTotal?: (query?: string, filters?: any) => Promise<number>
            isLoading?: boolean
        },
        search?: {
            enabled: boolean
            fields?: string[]
        },
        filters?: any
        renderFilters?: React.ReactNode,
        onChangeFilters?: (data: any[]) => any[] // this will only be applicable to when not using the isPaginated option
    
        noItemsMessage?: string | React.ReactNode,
        addButton?: {
            label: string,
            icon?: string,
            backgroundColor?: string,
            color?: string
        },
        onDeleteItem?: (item: any) => Promise<ActionResponse>,
        minCellWidth?: number,
        onClickRow?: (e: React.MouseEvent<HTMLDivElement>, item: any) => void
        onClickColumn?: (e: React.MouseEvent<HTMLDivElement>, item: any, column: Column) => void
    }
        
    /**
     * @export
     */
    export interface FormProps {
        /**
         * title of the form
         */
        title: string
        /**
         * form structure
         */
        formStructure: FormSectionProps[],
        /**
         * submit function
         */
        onSubmit: (data: IFormData) => Promise<ActionResponse>
        /**
         * cancel fucnton
         */
        onCancel?: () => void,
        /**
         * label for submit button
         */
        submitButtonLabel?: string,
        /**
         * loading label for submit button
         */
        submitButtonLoadingLabel?: string,
        /**
         * label for cancel button
         */
        cancelButtonLabel?: string,
        /**
         * option to hide cancel button
         */
        hideCancelButton?: boolean,
        /**
         * callback function after saving
         */
        afterSave?: (savedRecord?: any) => void,
        formContainerStyles?: React.CSSProperties
    }
        
    /**
     * @export
     */
    export interface ExtendedFormProps extends Omit<FormProps, 'onSubmit'> {
        /**
         * submit function for editing
         */
        onSubmit: (data: IFormData, editInstance: any) => Promise<ActionResponse>;
    }
        
    /**
     * @export
     *
     * CRUD component props
     */
    export interface CRUDComponentProps {
        /**
         * list view props
         */
        list: ListProps,
        /**
         * add view props
         */
        add?: FormProps,
        /**
         * option to render a custom add  view
         */
        renderCustomAddView?: RenderCustomFormView
        /**
         * edit view props
         */
        edit?: ExtendedFormProps,
        /**
         * option to render a custom edit view
         */
        renderCustomEditView?: RenderCustomFormView
        /**
         * option to disable views
         */
        disableViews?: {
            add?: boolean;
            edit?: boolean;
            delete?: boolean;
        },
        /**
         * name of the entit, this will be used in notifications
         */
        entityName?: string
    }
        
    /**
     * @export
     *
     * CRUD component instannce props
     */
    export interface CRUDComponentInstanceProps {
        /**
         * option to refresh the list
         */
        refreshList: () => void
    }
        
    /**
     * @export
     */
    export interface TreeViewSelectInputProps extends TreeViewProps {
        placeholder?: string,
        showSelectedNodePath?: boolean
    }
        
    /**
     * @export
     */
    export interface TreeViewSelectInputInstanceProps {
    
    }
        
    /**
     *
     * @export
     */
    export type IEventDispatcher = (instanceId: string, eventName: string, data?: { [key: string]: any }) => void
        
    /**
     *
     * @export
     */
    export type IEventSubscriber = (instanceId: string, eventName: string, callback: (data?: { [key: string]: any }) => void) => void
        
    /**
     * @export
     */
    export type IDataFunction = (max: number, lastPageToken: string, args?: any) => Promise<{ items: Array<any>, pageToken: string }>;
        
    /**
     * @export
     */
    export type IToast = (content: string | IPartialContent) => void;
        
    /**
     * The react hook for creating toasts
     * @export
     */
    export type ToastHook = () => IToastResult;
        
    /**
     * @export
     */
    export type IRemove = (id: string) => void;
        
    /**
     * @export
     */
    export type IContentFunction = () => JSX.Element;
        
    /**
     * @export
     */
    export type IUseUpdateWidgetProps = () => (id: string, props: any) => void
        
    /**
     * A simple callback function
     * @export
     */
    export type ICallback = () => void;
        
    /**
     * @export
     *
     * max: page size
     * last : last page token
     * args: any args to filter items
     * args has a default option 'query'. when you type in the search box, search text ill be set to this 'query'
     */
    export type IDynamicSelectDataFunction = (max: number, lastPageToken: string, args?: any) => Promise<{ items: Array<any>, pageToken: string }>
        
    /**
     * The react hook for resize effect
     * @export
     */
    export type ResizeEffectHook = (instanceId: string) => boolean
        
    /**
     * @export
     * Options that can be passed to a date picker field
     */
    export type ITitleFunc = () => JSX.Element
        
    /**
     * @export
     * React Hook for using the Message Bus
     *
     */
    export type MessageBusHook = (context:IContextProvider,channel:string,callback:(payload:string,channel:string)=>string) => void;
        
    /**
     * @export
     */
    export type FieldsHook = (fields:any) =>[any,{[field:string]:(s:any)=>void},any,(s:any)=>void] ;
        
    /**
     *
     * @export
     */
    export type IUseEffectWithPolling = (
        /**
         * UXP Context. You can get this from props (props.uxContext)
         */
        context: any,
        /**
         * message bus channel name
         */
        channel: string,
        /**
         * time interval in milliseconds
         */
        interval: number,
        /**
         * callback function to call when triggered
         */
        callback: () => Promise<void>,
        /**
         * list of dependencies
         */
        deps: any[]
    ) => void
        
    /**
     * @export
     */
    export type RenderCustomFormView = (show: boolean, onClose: () => void, editInstance?: any) => React.ReactNode
        
    /**
     * @export
     */
    export type IButtonType = "search" | "close" | "done" | "arrow-up" | "arrow-down" | "arrow-left" | "arrow-right" | "filter" | "edit" | "delete" | "pin" | "copy" | "plus";
        
    /**
     * @export
     */
    export type IButtonSize = "large" | "small";
        
    /**
     * @export
     */
    export type ISize = "small" | "large";
        
    /**
     * Determines the behaviour of the input field
     * @export
     */
    export type IInputType = "text" | "password" | "number" | "email";
        
    /**
     * @export
     * Determines how a checkbox field looks
     */
    export type ICheckboxType = "default" | "bordered" | "change-icon" | "switch-line" | "switch-box";
        
    /**
     * @export
     */
    export type IPosition = "left" | "right";
        
    /**
     * @export
     */
    export type ITooltipPosition = "top" | "bottom" | "left" | "right";
        
    /**
     * @export
     */
    export type FormValue = string | number | boolean | null
        
    /**
     * Um - animations. We need to work on this.
     * @export
     */
    export type IAnimation = 'm-slide-ftr' | 'm-slide-ftl' | 'm-slide-fbr' | 'm-slide-fbl' | 'm-zoom-fc';
        
    /**
     * @export
     * dropdown position
     */
    export type IDropDownButtonPosition = "right" | "left" | "top left" | "top right" | "top center" | "bottom left" | "bottom right" | "bottom center" | "left center" | "right center";
        
    /**
     * @export
     */
    export type IColorPickerPosition = 'left' | 'right'
        
    /**
     * @export
     */
    export type IColorTypes = "rgb" | "prgb" | "hex6" | "hex3" | "hex8" | "hsl" | "hsv"
        
    /**
     * @export
     *
     */
    export type IPopoverPosition = "top" | "bottom" | "left" | "right";
        
    /**
     * @export
     */
    export type regionType = "circle" | "rectangle" | "polygon"
        
    /**
     * @export
     */
    export type IPolygonBound = LatLngExpression[] | LatLngExpression[][];
        
    interface IIconButtonProps {
        /**
         * button type
         */
        type: IButtonType,
        /**
         * Set button to active state when true
         */
        active?: boolean,
        /**
         * Set button to disabled state when true
         */
        disabled?: boolean,
        /**
         * The callback that gets invoked when the button is clicked.
         */
        onClick?: () => void,
        /**
        * Any extra css classes to apply
        */
        className?: string,
        /**
        * button size. Can be either 'large' or 'small'
        */
        size?: IButtonSize
    
        /**
         * set to `true` to prevent a border from being shown for the button
         */
        borderless?: boolean;
    }
    /**
     *
     * @export
     *
     * Default set of buttons with icons
     *
     * @example
     * ```
     *  <IconButton
     *      type="search"
     *      onClick={()=> {alert("Clicked")}}
     *      className="custom-css-class"
     *  />
     * ```
     *
     */
    export const IconButton : React.FunctionComponent<IIconButtonProps>;
        /**
     * @export
     * Options that can be passed to a portal container component
     */
    interface IPortalContainerProps {
        /**
         * create a backdrop if true
         */
        hasBackdrop?: boolean,
    
        /**
         * callback function to click on backdrop
         */
        onClickBackdrop?: () => void,
    
        /**
         * additional styles to backdrop
         */
        backdropStyles?: any
        /**
         * disabled the scrolling of main content block if true
         * default value is true
         */
        disableScroll?: boolean,
        className?: string
    }
    /**
     *
     * @export
     *
     * This component is used to create a react portal.
     *
     *
     * @example
     * ```
     *  <PortalContainer >
     *      {your content}
     *  </PortalContainer>
     * ```
     *
     * @example
     *  <PortalContainer
     *      hasBackdrop
     *      onClickBackdrop={() => {setShow(false)}}
     *      backdropStyles={{backgroundColor: "white"}}
     *  >
     *      {your content}
     *  </PortalContainer>
     */
    export const PortalContainer : React.FunctionComponent<IPortalContainerProps>;
        /**
     * Show a simple loading animation indicator
     * @export
     */
    export const LoadingSpinner : React.FunctionComponent<{ message?: string, className?: string }>;
        /**
     * @export
     */
    interface ISidebarProps {
        items: ISidebarLink[]
        onClick: (linkItem: ISidebarLink) => void,
        userGroup: string
        env: string,
        canInstallFromMarketplace?: boolean,
        expanded: boolean,
        onToggleSidebar: () => void,
        onHoverSidebar: (expanded: boolean) => void,
        className?: string
        logo?: string,
        collapsedLogo?: string,
        renderLogoWithNewStyles?: boolean,
        styles?: React.CSSProperties,
        loading?: boolean
    }
    /**
     * @export
     *
     * Sidebar component
     */
    export const SideBar : React.FunctionComponent<ISidebarProps>;
        
    interface IProfileImageProps {
    
        /**
         * The url for the image to be shown
         */
        image?: string,
    
        /**
         * Any name to be dispayed. This is used only if the image is empty.
         * 2 letters will be derived from the name (typically the first letter of the first 2 words in the name)
         * and a background color will be chosen. Background colors are random but consistent. So a given `name` string will always have the same background
         */
        name?: string,
        bgColor?: string,
        textColor?: string,
        className?: string,
        size?: ISize
    }
    /**
     * Display a profile picture. Alternatively you can specify a name and it will be shown in a colored background as initials
     *
     * @export
     */
    export const ProfileImage : React.FunctionComponent<IProfileImageProps>;
        /**
     * Show a simple loading animation indicator
     * @export
     */
    export const Loading : React.FunctionComponent<{}>;
        
    interface IButtonProps {
        /**
         * The caption for the button
         */
        title: string,
    
        /**
         * Button icon.
         * you can either use a url or fontawesome icon
         *
         * Here is a example for using fontawesome icons
         * icon={'fas save'}
         */
        icon?: string,
    
        /**
         * position of the icon
         */
        iconPosition?: 'left' | 'right'
    
        /**
         * Any extra css classes to add to the button
         */
        className?: string,
    
        /**
         * The callback that gets invoked when the button is clicked
         */
        onClick: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    
        /**
         * Set this to `true` to show the button in its 'loading...' state.
         * In this state, an animation will be shown indicating that work is going on and the user will not be able to click the button
         */
        loading?: boolean,
    
        /**
         * The caption to show on the button when its in loading state
         */
        loadingTitle?: string,
    
        /**
         * to mark the button as active
         * this will highlight the button
         */
        active?: boolean,
        /**
         * to disable the button
         */
        disabled?: boolean,
        /**
         * any custom inline styles to the button
         */
        styles?: React.CSSProperties,
        /**
         * any custom inline styles for the icon container
         */
        iconStyles?: React.CSSProperties,
    
        /**
         * show loading spinners in place of icons (even if the icon is not there it will show the spinner on the left sides)  when the button is in loading state,
         */
        useLoadingSpinner?: boolean,
        type?: "button" | "submit" | "reset"
    }
    /**
     * This is a basic button component.
     * @export
     *
     * @example
     * ```
     *  <Button
     *      title="Click"
     *      onClick={() => {alert("Clicked")}}
     *  />
     * ```
     *
     * @example
     * ```
     *  <Button
     *      title="Click"
     *      onClick={() => {alert("Clicked")}}
     *      icon="https://static.iviva.com/images/lucy-logo.svg"
     *      loading={isLoading}
     *      loadingTitle="Loading..."
     *      className="custom-css-class"
     * />
     * ```
     *
     *
     * @example
     * ```
     *
     * <Button
     *      title='Save'
     *      loadingTitle='Saving...'
     *      useLoadingSpinner={true}
     * />
     * ```
     *
     *
     */
    export const Button : React.FunctionComponent<IButtonProps>;
        /**
     * @export
     */
    interface IProfileProps {
        hideDetails?: boolean // default false
        hideLogout?: boolean // default false
        className?: string
    }
    /**
     * @export
     *
     * User Profile component
     *
     * This component can be used when building UI without the default header
     *
     * @example
     *
     * ```
     *  basic usage
     *
     *  <UserProfile>
     *      <your content >
     *  </UserProfile>
     * ```
     *
     *
     * @example
     *
    
     *
     * ```
     *  hide default details and logout button
     *
     *  <UserProfile
     *      hideDetails={true}
     *      hideLogout={true}
     *  >
     *      <your content >
     *  </UserProfile>
     *
     * ```
     */
    export const UserProfile : React.FunctionComponent<IProfileProps>;
        
    interface IFormFieldProps {
        /**Set this to true to have multiple fields in a single horizontal line */
        inline?: boolean,
        /**
         * Any extra css classes to attach to the field
         */
        className?: string,
    
        /**
         * A background color to set for the field
         */
        backgroundColor?: string,
        spacingMode?: SpacingMode
    }
    /**
     *
     * This is a generic field used to layout forms. Typically used in conjunction with `<Label>` to show a field with a label
     * @export
     * @example
     * ```
     * <FormField inline>
     *       <Label>Button (active)</Label>
     *       <Button
     *           title="Sample Button"
     *           onClick={() => alert("clicked")}
     *           icon="https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg"
     *           active
     *       />
     *   </FormField>
     * ```
     *
     * @example
     * TODO: More Examples
     */
    export const FormField : React.FunctionComponent<IFormFieldProps>;
        
    interface ILabelProps {
        labelFor?: string,
        className?: string,
        inline?: boolean,
        styles?: React.CSSProperties,
        spacingMode?: SpacingMode,
        icon?:string,
    }
    /**
     * A simple label. Usually used in conjunction with a FormField
     * @export
     *
     * @example
     * ```
     * <Label>Name</Label>
     * ```
     */
    export const Label : React.FunctionComponent<ILabelProps>;
        
    interface IInputProps {
        /**
         * Determines if the input field accepts a password, email address, number or just text. Default is 'text'
         */
        type?: IInputType,
    
        /**
         * The actual text
         */
        value: string,
    
        /**
         * This function is called whenever the text changes. The new text value is passed as a parameter
         */
        onChange: (value: string) => void,
        /**
         * callback function on focus
         */
        onFocus?: () => void,
        /**
         * callback function on blur
         */
        onBlur?: (vale: string) => void
        /**
         * callback function on key down
         */
        onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, val: string) => void
    
        /**
         * Any additional class names to be included for the input field
         */
        className?: string,
    
        /**
         * Determines if an indicator should be shown at the end of the input.
         */
        hasIndicator?: boolean,
    
        /**
         * The color of the indicator icon (relevant only if hasIndicator is true)
         */
        indicatorColor?: string,
        /**
         * pass a boolean to indicate if the input is valid or not
         */
        isValid?: boolean,
        /**
         * additional attributes that can be passed to a <input> tag
         */
        inputAttr?: { [key: string]: string | boolean }
        /**
         * placeholder value
         */
        placeholder?: string,
        /**
         * render inline
         */
        inline?: boolean,
        /**
         * additional styles
         */
        styles?: React.CSSProperties,
        /**
         * mark input as read only
         */
        readOnly?: boolean
        /**
         * tab index. default is 0
         */
        tabIndex?: number,
    
        spacingMode?: SpacingMode
    }
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<IInputInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <Input
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.focus()
     * let element = inputRef.current?.getElement()
     *
     * ```
     */
    interface IInputInstanceProps {
        /**
         * focus the input
         * @example
         * ```
         * inputRef.current?.focus()
         * ```
         */
        focus: () => void,
        /**
         * this will return the <Input /> element
         * @example
         * ```
         * let input = inputRef.current?.getElement()
         * ```
         */
        getElement: () => React.MutableRefObject<HTMLInputElement>
    }
    /**
     *
     * A standard text box
     * @export
     */
    export const Input:React.ForwardRefExoticComponent<IInputProps & React.RefAttributes<IInputInstanceProps>>;
        
    interface ICheckboxProps {
        /**
         * Get or set the current state of the checkbox
         */
        checked: boolean,
    
        /**
         * Called when the checkbox is checked or unchecked by clicking on it
         */
        onChange: (checked: boolean) => void,
    
        /**
         * Any additional text to show next to the checkbox
         */
        label?: string,
    
        /**
         * If set to 'false' the checkbox will show in an 'invalid' state - neither true nor false
         */
        isValid?: boolean,
    
        /**
         * Any additional html attributes to pass to the underlying input field
         */
        inputAttr?: { [key: string]: string | boolean },
    
        /**
         * Determines how the checkbox looks, visually
         */
        type?: ICheckboxType
    
        /**
         * additional styles
         */
        className?: string,
        /**
         * additional styles to pass to the label
         */
        labelStyles?: React.CSSProperties,
        /**
         * tab index. default is 0
         */
        tabIndex?: number,
        /**
         * mark as readonly
         */
        readonly?: boolean,
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * A checkbox component. This can render a true/value value in multiple ways. Set the type property to determine how it looks visually.
     * types : default, bordered, change-icon, switch-line, switch-box
     *
     * @example
     * ```
     *  <Checkbox
     *      checked={checked}
     *      onChange={(isChecked) => setChecked(isChecked)}
     *      label='Are you sure'
     *  />
     * ```
     *
     * @example
     * ```
     *  <Checkbox
     *      checked={checked}
     *      onChange={(isChecked) => setChecked(isChecked)}
     *      label='Are you sure'
     *      type="switch-box"
     *  />
     * ```
     *
     */
    interface ICheckboxInstanceProps {
        focus: () => void
    }
    /**
     *
     * Checkbox component
     * @export
     */
    export const Checkbox:React.ForwardRefExoticComponent<ICheckboxProps & React.RefAttributes<ICheckboxInstanceProps>>;
        
    interface INotificationProps {
         /**
         *  Message to show when showing
         */
        message: string,
        /**
         * Any extra css classes to apply
         */
        class?: string,
        /**
         * any extra styles
         */
        styles?: any
    }
    /**
     * @example
     * ```
     *  <NotificationBlock message="-- End Of Content --" class="end-of-content" />
     * ```
     * @export
     *
     */
    export const NotificationBlock : React.FunctionComponent<INotificationProps>;
        
    interface IDataListProps {
        /**
         * List of items to render. This can either be an array of objects or a function that will generate the array of objects.
         * If you supply a function then pagination will be supported. The function expects 2 parameters - `max` and `last` and returns a promise that will resolve to the list of objects.
         * `max` specifies the maximum number of items to be returned.
         */
        data: Array<any> | IDataFunction,
    
        /**
         * A function that will be responsible for rendering each individual element of the list.
         * It is common to return  `ItemCard` component from here.
         *
         * @example
         *
         * ```
         * renderItem={(item,key)=><div>{'Item:' + JSON.stringify(item)}}</div>}
         * ```
         *
         * @example
         * ```
         * renderItem={(item,key)=><ItemCard data={item} titleField='Name' />}
         * ```
         */
        renderItem: (item: any, key: number) => JSX.Element,
    
        /**
         * The number of items to fetch in each page. This gets passed to the data function as the `max` parameter
         */
        pageSize: number,
    
        args?: any
    
    
        /**
         * This function renders a loading animation. If not specified, the default loading animation will be used.
         */
        renderLoading?: () => JSX.Element,
    
        /**
         * Any extra class names to be added to the component
         */
        className?: string
        /**
         * show/hide footer (scroll buttons)
         */
        showFooter?: boolean,
        /**
         * mun of rows to scroll
         */
        scrollStep?: number,
        /**
         * show/hide end of content message
         */
        showEndOfContent?: boolean,
    
        /**
         * this function will be called every time list get updated
         * this will return total number of items (function should return the total count) and loaded items count
         */
        onItemsLoad?: (total: number, loaded: number, items?: any[]) => void
    
        renderNoItems?: () => JSX.Element
    
    }
    
    interface IDataListInstanceProps {
        updateItem: (key: number, item: any) => void,
        removeItem: (key: number) => void
    }
    /**
     *
     * A infinite-scrollable list that supports paging in of items
     * @export
     *
     *
     *
     *
     * @example
     * ```
     *  Using array
     *
     *  let data:any[] = [
     *      {
     *          "id": 1,
     *          "name": "Name 01"
     *      },
     *      {
     *          "id": 2,
     *          "name": "Name 01"
     *      },
     *      {
     *          "id": 3,
     *          "name": "Name 01"
     *      }
     *  ]
     *
     *  function renderItem(item:any, key:number) {
     *      return <div>
     *          <div>{item.name} </div>
     *      </div>
     *  }
     *
     *  <DataList
     *      data={data}
     *      renderItem={(item, key) => renderItem(item, key)}
     *      pageSize={10}
     *  />
     * ```
     *
     * @example
     * ```
     *  Using IDataFunction
     *  async function getData(max:number, last: string, args: any) {
     *      if(!last) last = "0";
     *
     *      return new Promise<{items:any[], pageToken: string}>((done, nope) =>{
     *          executeAction("model", "action", {max: max, last: last, args: args})
     *          .then(res => {
     *              done({items: res.data, pageToken: res.lastPageToken })
     *          })
     *          .catch(e => {
     *              done({items: [], pageToken: last})
     *          })
     *      })
     *  }
     *
     *  function renderItem(item:any, key:number) {
     *      return <div>
     *          <div>{item.name} </div>
     *      </div>
     *  }
     *
     *  <DataList
     *      data={(max, last, args) => getData(max, last, args)}
     *      renderItem={(item, key) => renderItem(item, key)}
     *      pageSize={10}
     *  />
     *
     * ```
     *
     * @example
     * ```
     *  Using other props
     *
     *  <DataList
     *      data={data}
     *      renderItem={(item, key) => renderItem(item, key)}
     *      pageSize={10}
     *      className="custom-css-class"
     *      showFooter={false}
     *      showEndOfContent={false}
     *  />
     *
     * ```
     */
    export const DataList:React.ForwardRefExoticComponent<IDataListProps & React.RefAttributes<IDataListInstanceProps>>;
        
    interface ISearchBoxProps {
        /**
         * Default value
         */
        value: string,
        /**
        * This function is called whenever the text changes. The new text value is passed as a parameter
        */
        onChange: (newValue: string) => void,
        /**
         * Any additional class names to be included for the input field
         */
        className?: string,
        /**
         * show only a icon button when true. When click on the button it will show the actual search box
         */
        collapsed?: boolean,
        /**
         * position of search box
         */
        position?: IPosition,
        /**
         * placeholder value
         */
        placeholder?: string
        /**
         * input will be auto focused if true
         */
        autoFocus?: boolean
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * This component is used to render a search box.
     *
     * @example
     * ```
     *  <SearchBox
     *      value={inputValue}
     *      onChange={(newValue) => { setInputValue(newValue) }}
     *  />
     * ```
     *
     * @example
     *  <SearchBox
     *      value={inputValue}
     *      onChange={(newValue) => { setInputValue(newValue) }}
     *      collapsed
     *      position="right"
     *  />
     *
     */
    interface ISearchBoxInstanceProps {
        focusInput: () => void,
        getInputElement: () => React.MutableRefObject<HTMLInputElement>
    }
    /**
     * A searchbox component
     * @export
     */
    export const SearchBox:React.ForwardRefExoticComponent<ISearchBoxProps & React.RefAttributes<ISearchBoxInstanceProps>>;
        /**
     * @export
     */
    interface ISelectProps {
        /**
         * The  currently selected value
         */
        selected: string,
        /**
         * Option to pass a label for selected value,
         * This will be used in the case if unable to find the selected item
         */
        selectedLabel?: string
    
        /**
         * Gets called whenever the selection changes.
         * The value parameter has the newly selected value
         * option parameter has the complete option/ object that you passed
         */
        onChange: (value: string, option?: IOption | any) => void,
    
        /**
         * Option to unselect
         */
        onClear?: () => void
    
        /**
         * List of items to select from.
         * Each option has a label which is displayed and a value which is what we actually select.
         * also you can pass any object as options, then specify the labelField, valueField props
         */
        options: IOption[] | any[],
    
        /**
         * Option to load paginated data in to the dropdown
         * If this is given `options` passed above will be ignored
         */
        getPaginatedOptions?: (max: number, lastToken: string, query?: string) => Promise<{ items: any[], pageToken: string }>
    
        /**
         * number of options to load
         * this will be used to paginate data
         */
        pageSize?: number,
    
        /**
         * Name of the field you want to display as label
         * If not given default(label) will be used
         */
        labelField?: string,
        /**
         * Name of the field you want to return  as value
         * If not given default(value) will be used
         */
        valueField?: string,
        /**
         * Name if the field to use as icon
         * if a value is passed icon will be displayed.
         */
        iconField?: string
    
        /**
        * A function that will be responsible for rendering each individual option of the list.
        *
        * @example
        *
        * ```
        * renderItem={(option,key)=><div>{option.label}</div>}
        * ```
        *
        * @example
        * ```
        * renderItem={(option,key)=><ItemCard data={item} titleField='label' />}
        * ```
        */
        renderOption?: (item: any, key: number) => JSX.Element,
    
        /**
         * Text to show when no value is selected
         */
        placeholder?: string,
        /**
         * Any extra css classes to add to the component
         */
        className?: string,
        /**
         * Set this to false to indicate the field doesn't have a valid value
         */
        isValid?: boolean,
        // inputAttr?: any
        /**
         * show hide end of content message
         */
        showEndOfContent?: boolean,
        /**
         * Option to add a new value if not available.
         * You can enable this option and handle how you want to save the new item
         */
        addNewValues?: {
            enable: boolean,
            title: string,
            loadingTitle: string,
            onAddNewValue?: (value: string) => Promise<any>
        }
        /**
         * Option to add a classname for the dropdown
         */
        dropdownClassname?: string
        /**
         * Spacing mode
         */
        spacingMode?: SpacingMode,
    
        /**
         * This will replace the content in the dropdown.
         * If this is enabled, above options (value, onChange , etc) will not work. You have to handle everything
         * You will need to handle the value and onChange options.
         * and once you select an option, to close the dropdown, call the closeDropdown function
         */
        renderCustomDropdownContent?: (closeDropdown: () => void) => React.ReactNode
    
        /**
         * Option to custom render the placeholder
         */
        renderPlaceholder?: {
            /**
             * render input as a pill
             * work with default select dropdown
             */
            renderAsPill?: {
                minWidth?: number,
                maxWidth?: number
            },
            /**
             * for custom renders
             */
            renderCustomPill?: (onClear: () => void) => React.ReactNode
        }
    
        dropdownMinWidth?: number,
        dropdownMinHeight?: number
    }
    /**
     *
     * A select control to select one item from a list of multiple items
     * @export
     *
     *  @example
     * ```
     *  // options
     *  let [selectedOption, setSelectedOption] = React.useState<string>(null)
     *  let options = [
     *      {label: "Sri Lanka", value: "SL"},
     *      {label: "India", value: "IN"},
     *      {label: "United State", value: "US"},
     *  ]
     *
     *  <Select
     *      options={options}
     *      selected={selectedOption}
     *      onChange={(newValue, option) => {
     *          setSelectedOption(value)
     *      }}
     *  />
     * ```
     *
     * @example
     * ```
     *  // options
     *  let [selectedOption, setSelectedOption] = React.useState<string>(null)
     *  let options = [
     *      {name: "Sri Lanka", code: "SL"},
     *      {name: "India", code: "IN"},
     *      {name: "United State", code: "US"},
     *  ]
     *
     *  <Select
     *      options={options}
     *      labelField="name"
     *      valueField="code"
     *      selected={selectedOption}
     *      onChange={(newValue, option) => {
     *          setSelectedOption(value)
     *      }}
     *  />
     * ```
     *
     */
    export const Select : React.FunctionComponent<ISelectProps>;
        /**
     * @export
     */
    interface ITooltipProps {
        /**
         * The content to show inside the tooltip
         * This can be either a string or a JSX element
         * @example
         *
         * ```
         * <Tooltip content="This is a tooltip" />
         * ```
         *
         * @example
         *
         * ```
         * <Tooltip content={() => <div>This is a tooltip</div>} />
         * ```
         */
        content: string | IContentFunction,
    
        /**
         * Where the tooltip should be placed relative to the element it is being displayed for
         * <Tooltip position="left" content="There are many like it but this one's mine" />
         */
        position?: ITooltipPosition
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         *  <Tooltip
         *      content="This is a tooltip"
         *  >
         *      <button className="btn showcase" >Hover to Show Tooltip</button>
         *  </Tooltip>
         * ```
         *
         * * @example
         *
         * ```
         *  <Tooltip
         *      content={() => <div>This is a tooltip</div>}
         *      position="left"
         *  >
         *      <button className="btn showcase" >Hover to Show Tooltip</button>
         *  </Tooltip>
         * ```
         *
         */
    }
    /**
     * This component wraps another component and shows a tooltip for the component it is wrapping, whenever the user moves the mouse over it.
     * @export
     */
    export const Tooltip : React.FunctionComponent<ITooltipProps>;
        /**
     * @export
     *
     */
    interface IDatePickerProps {
        /**
         * The title
         */
        title: string,
    
        /**
         * The currently selected date. Either a Date object or an ISO8601 string representation of a date
         */
        date: string | Date,
    
        /**
         * Callback that gets executed whenever a date is selected/changed in the date picker
         */
        onChange: (date: Date) => void,
    
        /**
         * Called when the calendar popup is closed
         */
        closeOnSelect?: boolean,
    
        /**
         * Additional options to control behavior
         */
        options?: IDatePickerOptions,
    
        /**
         * Set to true to prevent a user from typing in a date
         */
        disableInput?: boolean,
    
        /**
         * this will hide the labels in the placeholder (calendar icon)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean,
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * This component is used to select a date.
     *
     * @example
     * ```
     *  <DatePicker
     *    title="Date"
     *    date={date}
     *    onChange={(date) => setDate(date)}
     * />
     * ```
     *
     * @example
     * <DatePicker
     *     title="Date"
     *     date={date}
     *     onChange={(date) => setDate(date)}
     *     options={{
     *         disableWeekEnds: true
     *     }}
     * />
     */
    export const DatePicker : React.FunctionComponent<IDatePickerProps>;
        
    interface ITimePickerProps {
        /**
        * The title
        */
        title: string
        /**
         * The currently selected time. Either a Date object or an time string (Ex: 01:10:00 pm)
         */
        time: string | Date,
        /**
        * Callback that gets executed whenever a time is selected/changed in the time picker
        */
        onChange: (date: Date) => void,
        /**
        * Set to true to prevent a user from typing in a date
        */
        disableInput?: boolean,
        /**
         * hide the clock icon
         */
        hideLabels?: boolean,
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * This component is used to select a time.
     *
     * @example
     * ```
     *  <TimePicker
     *      title="Time"
     *      time={date}
     *      onChange={(date) => setDate(date)}
     *  />
     * ```
     */
    export const TimePicker : React.FunctionComponent<ITimePickerProps>;
        
    interface ITextAreaProps {
        /**
        * The actual text
        */
        value: string,
        /**
         * This function is called whenever the text changes. The new text value is passed as a parameter
         */
        onChange: (value: string) => void,
        /**
         * callback function on focus
         */
        onFocus?: () => void,
        /**
         * callback function on blur
         */
        onBlur?: (vale: string) => void
        /**
         * callback function on key down
         */
        onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>, val: string) => void
    
        /**
         * Any additional class names to be included for the input field
         */
        className?: string,
        /**
          * additional styles
          */
        styles?: React.CSSProperties,
        /**
         * mark input as read only
         */
        readOnly?: boolean
        /**
         * tab index. default is 0
         */
        tabIndex?: number
        /**
         * number of rows
         */
        rows?: number,
        /**
         * number of cols
         */
        cols?: number,
        spacingMode?: SpacingMode
    }
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<ITeaxtareaInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <TextArea
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.focus()
     * let element = inputRef.current?.getElement()
     *
     * ```
     */
    interface ITextAreaInstanceProps {
        /**
         * focus the input
         * @example
         * ```
         * inputRef.current?.focus()
         * ```
         */
        focus: () => void,
        /**
         * this will return the <TextArea /> element
         * @example
         * ```
         * let input = inputRef.current?.getElement()
         * ```
         */
        getElement: () => React.MutableRefObject<HTMLTextAreaElement>
    }
    /**
     *
     * A standard textarea (multi line text box)
     * @export
     */
    export const TextArea:React.ForwardRefExoticComponent<ITextAreaProps & React.RefAttributes<ITextAreaInstanceProps>>;
        /**
     * @export
     */
    interface IDateTimePickerProps {
        title: string,
        /**
        * The currently selected datetime. Either a Date object or an ISO8601 string representation of a date
        */
        datetime: string | Date,
        /**
         * Callback that gets executed whenever a datetime is selected/changed in the datetime picker
         */
        onChange: (date: Date) => void,
        /**
        * Set to true to prevent a user from typing in a datetime
        */
        disableInput?: boolean
    
        /**
        * Additional options to control behavior
        */
        options?: IDatePickerOptions,
    
        /**
         * this will hide the labels in the placeholder (icons and text)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideDateInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean,
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * This component is used to select a datetime.
     *
     * @example
     * ```
     *  <DateTimePicker
     *      datetime={date}
     *      onChange={(date) => { setDate(date); }}
     *  />
     * ```
     */
    export const DateTimePicker : React.FunctionComponent<IDateTimePickerProps>;
        /**
     * @export
     */
    interface TabComponentProps {
        /**
         * tabs
         */
        tabs: Tab[]
        /**
         * selected tab id
         */
        selected: string,
        /**
         * on change tab
         */
        onChangeTab: (tab: string) => void,
    
        /**
         * direction of tabs
         */
        direction?: 'vertical' | 'horizontal',
    
        /**
         * position of tabs
         */
        position?: 'top' | 'bottom' | 'left' | 'right'
    
        /**
         * tab component styles
         */
        styles?: TabComponentStyles
    }
    /**
     *
     * @export
     *
     * Tab layout component
     *
     * @example
     *
     * ```
     * <TabComponent
     *   tabs={[
     *      {id: 'general' , label:'General', content: <div> General Tab </div>},
     *      {id: 'advanced' , label:'Advanced', content: <div> Advanced Tab </div>},
     *   ]}
     *   selected={selectedTab}
     *   onChangeTab={setSelectedTab}
     * />
     * ```
     *
     */
    export const TabComponent : React.FunctionComponent<TabComponentProps>;
        /**
     * @export
     */
    interface DynamicFormProps {
        formStructure: FormSectionProps[],
        beforeSubmit?: (data: IFormData) => Promise<IFormData>
        onSubmit: (data: IFormData) => Promise<void>
        onCancel?: () => void,
        submitButtonLabel?: string,
        submitButtonLoadingLabel?: string,
        cancelButtonLabel?: string,
        hideCancelButton?: boolean,
        isLoading?: boolean,
        formContainerStyles?: React.CSSProperties,
        renderOptions?: {
            renderStyle: 'standard' | 'tabs' | 'wizard',
            direction?: 'vertical' | 'horizontal' // only applicable to tabs and wizard
            tabBackgroundColor?: string,
            tabTextColor?: string,
            activeTabBackgroundColor?: string,
            activeTabTextColor?: string,
            errorTabBackgroundColor?: string,
            errorTabTextColor?: string,
            disabledTabBackgroundColor?: string,
            disabledTabTextColor?: string,
            previousButtonLabel?: string,
            nextButtonLabel?: string
        }
    }
    /**
     * @export
     * This component provides a dynamic form component
     * Developer can pass a json structure and it will create a form component
     */
    export const DynamicForm : React.FunctionComponent<DynamicFormProps>;
        
    interface IModalProps {
        /**
         * Set this to true to make the modal visible
         */
        show: boolean,
        /**
         * Called whenever the modal is opened
         */
        onOpen?: () => void,
    
        /**
         * Called when the modal gets closed
         */
        onClose?: () => void,
    
        /**
         * The title set in the title bar of the modal
         * If the `headerContent` attribute is set, then this value will not be used.
         */
        title?: string,
    
        /**
         * any custom component to use to render the dialog close button.
         * If a value is not provided and `showCloseButton` is set to true, the default close button UI will be rendered
         */
        closeButton?: JSX.Element,
    
        /**
         * Any extra css styles to apply
         */
        styles?: any,
    
        /**
         * Any extra css classes to apply
         */
        className?: string,
    
        /**
         * Any custom content to include in the modal header.
         * If this is set, then the `title` property will not be used.
         */
        headerContent?: JSX.Element
    
        /**
         * Set to true to allow the dialog to be closed by clicking outside of it
         */
        backgroundDismiss?: boolean,
    
        /**
         * Set this to 'true' to show the close button in the dialog
         */
        showCloseButton?: boolean,
    
        /**
         * Animation to use when opening/closing a modal
         */
        animation?: IAnimation,
        /**
         * additional styles for backdrop
         */
        backdropStyles?: any,
        /**
         * additional content to render
         */
        renderAdditionalContent?: () => JSX.Element,
        autoSize?: boolean
    }
    /**
     * Display a modal dialog. The dialog will be placed in front of a invisible sheet above the main UI.
     * @example
     * ```
     *  <button
     *      className="btn showcase"
     *      onClick={() => setShowModal(true)}
     *  >
     *      Click to Show Modal
     *  </button>
     *
     *  <Modal
     *      show={showModal}
     *      onOpen={() => { }}
     *      onClose={() => setShowModal(false)}
     *  >
     *      This is a sample modal
     *  </Modal>
     * ```
     * @export
     *
     */
    export const Modal : React.FunctionComponent<IModalProps>;
        /**
     * @export
     * Options that can be passed to Loaders
     */
    interface IWidgetPreloaderLoaderProps {
    }
    /**
     *
     * @export
     * This is the default pre loader for widgets
     */
    export const DefaultLoader : React.FunctionComponent<IWidgetPreloaderLoaderProps>;
        /**
     * @export
     * Options that can be passed to Loaders
     */
    interface IWidgetPreloaderLoaderProps {
    }
    /**
     *
     * @export
     * Bar chart loader
     */
    export const BarChartLoader : React.FunctionComponent<IWidgetPreloaderLoaderProps>;
        /**
     * @export
     * Options that can be passed to Loaders
     */
    interface IWidgetPreloaderLoaderProps {
    }
    /**
     *
     * @export
     * Donut chart loader
     */
    export const DonutChartLoader : React.FunctionComponent<IWidgetPreloaderLoaderProps>;
        /**
     * @export
     * Options that can be passed to Loaders
     */
    interface IWidgetPreloaderLoaderProps {
    }
    /**
     *
     * @export
     * gauge loader
     */
    export const GaugeLoader : React.FunctionComponent<IWidgetPreloaderLoaderProps>;
        /**
     * @export
     * Options that can be passed to Loaders
     */
    interface IWidgetPreloaderLoaderProps {
    }
    /**
     *
     * @export
     * heatmap chart loader
     */
    export const HeatmapChartLoader : React.FunctionComponent<IWidgetPreloaderLoaderProps>;
        /**
     * @export
     * Dropdown button props
     */
    interface IDropDownButtonProps {
        /**
         * The content to show inside the Dropdown
         * @example
         *
         * ```
         * content={() => <div>Dropdown Content</div>}
         * ```
         */
        content: () => JSX.Element,
    
        /**
         * Where the dropdown should be placed relative to the element it is being displayed for
         * default is right
         */
        position?: IDropDownButtonPosition,
        /**
         * If this is true dropdown will show on mouse over & hide n mouse out
         * If this is false dropdown ill show on click
         */
        showOnHover?: boolean
    
        /**
         * this will open the dropdown on hover and keep open even if user takes the mouse away
         * Click on outside to close the dropdown
         */
        keepShowingOnHover?: boolean,
    
        className?: string,
    
        /**
         * callback function when the popup is open
         */
        onOpen?: () => void
        /**
         * callback function when the popup is closed
         */
        onClose?: () => void
        /**
         * an option to force close a popup
         */
        forceClose?: boolean
    
        /**
         * disable scroll on open dropdown
         * true by default
         */
        disableScroll?: boolean,
    
        /**
         * if this is enabled drop down will be automatically positionsed within the view.
         * better to use this option- it has been improved
         * if enabled it will ignore the position param
         */
        autoPosition?: boolean
    }
    /**
     * This component wraps another component and shows a tooltip for the component it is wrapping, whenever the user moves the mouse over it.
     * @export
     *
     *
     * @example
     * ```
     *  Dropdown button basic example
     *
     *  <DropDownButton
     *      content={() => <div>This is dropdown content</div>}
     *  >
     *      <button className="btn showcase" >Click to Show the dropdown</button>
     *  </DropDownButton>
     * ```
     *
     *
     * @example
     * ```
     *  Dropdown button example with options
     *
     *  <DropDownButton
     *      content={() => <div>This is dropdown content</div>}
     *      position="left"
     *      showOnHover
     *  >
     *      <button className="btn showcase" >Click to Show the dropdown</button>
     *  </DropDownButton>
     * ```
     *
     *
     * @example
     * ```
     *  Dropdown button example with forceClose
     *
     *  // Be carefull when handeling the state. `closePopup` state must reset to default (false) when the popup closes
     *  //state
     *  let [closePopup, setClosePopup] = React.useState(false)
     *
     *  <DropDownButton
     *      content={() => <>
     *                  <h1>Click to close</h1>
     *                  <Button title="Click" onClick={() => { setClosePopup(true) }} />
     *              </>}
     *      onOpen={() => { }}
     *      onClose={() => { setClosePopup(false) }}
     *      forceClose={closePopup}
     *  >
     *      <button className="btn showcase" >Click to Show the dropdown</button>
     *  </DropDownButton>
     *
     * ```
     *
     */
    export const DropDownButton : React.FunctionComponent<IDropDownButtonProps>;
        
    interface IAsyncButtonProps {
    
        /**
         * The caption for the button
         */
        title: string,
    
        /**
        * Button icon.
        * you can either use a url or fontawesome icon
        *
        * Here is a example for using fontawesome icons
        * icon={'fas save'}
        */
        icon?: string,
    
        /**
         * icon position
         */
        iconPosition?: 'left' | 'right'
    
        /**
         * Any extra css classes to add to the button
         */
        className?: string,
    
        /**
         * The callback that gets invoked when the button is clicked.
         * It must return a Promise
         */
        onClick: () => Promise<any>,
    
        /**
         * Set button to active state when true
         */
        active?: boolean,
        /**
        * Set button to disabled state when true
        */
        disabled?: boolean,
        /**
         * Text to show when in loading state
         */
        loadingTitle?: string,
        /**
         * a callback function to call on error
         */
        onError?: (e: any) => void
    
        /**
         * any custom inline styles to the button
         */
        styles?: React.CSSProperties,
        /**
         * any custom inline styles for the icon container
         */
        iconStyles?: React.CSSProperties,
    
        /**
         * show loading spinners in place of icons (even if the icon is not there it will show the spinner on the left sides)  when the button is in loading state,
         */
        useLoadingSpinner?: boolean,
        type?: "button" | "submit" | "reset"
    }
    /**
     * This is a button that is meant to be used to execute a async action.
     * The onClick handler should return a promise. The button's behavior is to set the status as 'loading...' until the promise that was returned evluates and returns a result or throws an exception.
     * @export
     *
     * @example
     * ```
     *  <AsyncButton
     *      title="Submit"
     *      onClick={async() => {return executeAction("model", "action", {})}}
     *      icon="https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg"
     *      loadingTitle="Submitting..."
     *      className="custom-css-class"
     *  />
     * ```
     *
     */
    export const AsyncButton : React.FunctionComponent<IAsyncButtonProps>;
        /**
     * @export
     *
     */
    interface IColorPalletProps {
        color: string,
        onChange: (color: string) => void,
        onCancel: () => void
    }
    /**
     *
     * @export
     * Color pallet
     */
    export const ColorPallet : React.FunctionComponent<IColorPalletProps>;
        /**
     * @export
     *
     */
    interface IColorPickerProps {
        /**
         *  default color
        */
        color: string,
        /**
         * callback on select a color
         */
        onChange: (color: string) => void,
        /**
         * picker position.  default is left
         */
        position?: IColorPickerPosition,
        /**
         * class name for additional styles
         */
        className?: string,
        /**
         * close the picker on select a color
         * default is true
         */
        closeOnSelect?: boolean,
        /**
         * change display format
         */
        displayFormat?: IColorTypes
        /**
         * change return format
         */
        returnFormat?: IColorTypes
    }
    /**
     *
     * @export
     * Color picker input field
     */
    export const ColorPicker : React.FunctionComponent<IColorPickerProps>;
        
    interface IToggleFilterProps {
        /**
         * The list of possible options to choose from
         */
        options: IToggleOption[],
    
        /**
         * The current value (selected item)
         */
        value: string,
    
        /**
         * Called whenever an option is selected
         */
        onChange: (newValue: string) => void,
    
        /**
         * Any additional css classes to include
         */
        className?: string,
    
        /**
         * background color of the fill/tab
         * default is white
         */
        backgroundColor?: string,
        /**
         * text color of the tab/fill
         * default is #424242
         */
        textColor?: string,
        /**
         * background color for the selected tab
         * default is white with box shadow
         */
        selectedBackgroundColor?: string,
        /**
         * text color for the selected tab/fill
         * default is #424242
         */
        selectedTextColor?: string,
        /**
         * this will disable the box shadow from the selected tab/fill
         */
        disableShadow?: boolean,
    
        /**
         * Spacing mode
         */
        spacingMode?: SpacingMode
    
        /**
         * This will render the dropdown if the width is less than the min width
         */
        renderAsDropdown?: {
            minWidth: number,
            renderAsPill?: {
                minWidth?: number,
                maxWidth?: number
            }
        }
    
    }
    /**
     * This component presents a group of options from which one can be selected.
     * Suitable to select a single item from a list where the list is very small. Most often used for filters.
     * @export
     */
    export const ToggleFilter : React.FunctionComponent<IToggleFilterProps>;
        /**
     * @export
     */
    interface IMultiSelectProps {
        /**
         * List of items to select from.
         * Each option has a label which is displayed and a value which is what we actually select.
         * also you can pass any object as options, then specify the labelField, valueField props
         */
        options: IOption[] | any[],
        /**
         * Name of the field you want to display as label
         * If not given default(label) will be used
         */
        labelField?: string,
        /**
         * Name of the field you want to return  as value
         * If not given default(value) will be used
         */
        valueField?: string,
        /**
         * Name if the field to use as icon
         * if a value is passed icon will be displayed.
         */
        iconField?: string
        /**
         * The  currently selected value
         *
         * ['option1', 'option2']
         */
        selected: string[],
    
        /**
         * Gets called whenever the selection changes.
         * The value parameter has the newly selected value
         * option parameter has the complete option/ object that you passed
         */
        onChange: (values: string[], options?: IOption[] | any[]) => void,
    
        /**
         * Text to show when no value is selected
         */
        placeholder?: string,
        /**
         * Any extra css classes to add to the component
         */
        className?: string,
    
        /**
         * Set this to false to indicate the field doesn't have a valid value
         */
        isValid?: boolean,
        // inputAttr?: any
        /**
         * show hide end of content message
         */
        showEndOfContent?: boolean
        /**
             * A function that will be responsible for rendering each individual option of the list.
             *
             * @example
             *
             * ```
             * renderItem={(option,key)=><div>{option.label}</div>}
             * ```
             *
             * @example
             * ```
             * renderItem={(option,key)=><ItemCard data={item} titleField='label' />}
             * ```
             */
        renderOption?: (item: any, key: number) => JSX.Element,
        wrapSelectedItemsToOneLine?: boolean,
        selectAllOnLoad?: boolean,
        hideClearButton?: boolean
        hideDoneButton?: boolean
    
        dropdownClassname?: string
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * A select control to select multiple items from a list of items
     * @export
     *
     *  @example
     * ```
     *  // options
     *  let [selectedOptions, setSelectedOptions] = React.useState<string[]>([])
     *  let options = [
     *      {label: "Sri Lanka", value: "SL"},
     *      {label: "India", value: "IN"},
     *      {label: "United State", value: "US"},
     *  ]
     *
     *  <MultiSelect
     *      options={options}
     *      selected={selectedOptions}
     *      onChange={(newValues, options) => {
     *          setSelectedOptions(values)
     *      }}
     *  />
     * ```
     *
     * @example
     * ```
     *  // options
     *  let [selectedOptions, setSelectedOptions] = React.useState<string[]>([])
     *  let options = [
     *      {name: "Sri Lanka", code: "SL"},
     *      {name: "India", code: "IN"},
     *      {name: "United State", code: "US"},
     *  ]
     *
     *  <MultiSelect
     *      options={options}
     *      labelField="name"
     *      valueField="code"
     *      selected={selectedOptions}
     *      onChange={(newValues, options) => {
     *          setSelectedOptions(values)
     *      }}
     *  />
     * ```
     *
     */
    export const MultiSelect : React.FunctionComponent<IMultiSelectProps>;
        /**
     * @export
     *
     */
    interface IThemeChangerProps {
        /**
         * option to pass current theme
         */
        themeName?: string,
        /**
         *
         * callback on theme change
         */
        onChangeTheme?: (themeName: string) => void
        /**
         * pass a element id to apply theme changes to that element and children
         *
         */
        rootElementId?: string
    }
    /**
     * @export
     *
     * This component allows us to switch themes in uxp
     *
     *
     *
     * @example
     *
     * ```
     *  <ThemeChanger />
     * ```
     */
    export const ThemeChanger : React.FunctionComponent<IThemeChangerProps>;
        /**
     * @export
     */
    interface IWidgetContainerBlockProps {
        widgets: IWidgetInstance[],
        editDashboard: boolean,
        onChangeDashboard: any,
        canEditDashboard: boolean,
        canManageWidgetsAndSettings: boolean,
        openMenu: () => void
        toolbarItems: IToolbarItem[];
        minWidth?: number,
        numberOfColumns?: number,
        onGridResize?: (width: number, height: number, cellWidth: number, margin: [number, number]) => void,
        margin?: number,
        padding?: number
        // to hide the default edit toolbar that comes in edit mode in the dashbaords
        hideDefaultEditToolbar?: boolean,
        onWidgetPropsChange?: (id: string, props: any) => void,
        onResizeStart?: () => void
        onResizeEnd?: () => void
    }
    /**
     * @export
     *
     * Widget container block
     */
    export const WidgetContainerBlock : React.FunctionComponent<IWidgetContainerBlockProps>;
        /**
     * @export
     */
    interface IPopoverProps {
        /**
         * title of the popup bubble
         *  This can be either a string or a JSX element
         * @example
         *
         * ```
         * title="Popover Title"
         * ```
         *
         * * @example
         *
         * ```
         * title={() => <div>Popover Title</div>
         * ```
         */
        title: string | IContentFunction,
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         * content="Popover Content"
         * ```
         *
         * * @example
         *
         * ```
         * content={() => <div>Popover content</div>
         * ```
         *
         */
        content: string | IContentFunction,
    
        /**
         * Where the bubble should be positioned relative to the element
         */
        position?: IPopoverPosition
    
        /**
         * the content to show within the bubble
         *  This can be either a string or a JSX element
         *
         * * @example
         *
         * ```
         *  <Popover
         *      title="Popover"
         *      content="This is a popover"
         *  >
         *      <button className="btn showcase" >Click to Show popover</button>
         *  </Popover>
         *
         * ```
         *
         * * @example
         *
         * ```
         *  <Popover
         *      title={() => <div>Popover</div>}
         *      content={() => <div>This is a popover</div>}
         *      position="left"
         *  >
         *      <button className="btn showcase" >Click to Show popover</button>
         *  </Popover>
         * ```
         *
         */
    }
    /**
     *
     * Show a popup bubble when clicking on an element.
     * Wrap the element you want to target in the popup bubble.
     *
     * @example
     * ```
     * <Popover title='Details' content={'Name:' + props.name}>
     *      <span>Click to see name</span>
     * </Popover>
     * ```
     * @export
     */
    export const Popover : React.FunctionComponent<IPopoverProps>;
        /**
     * @export
     */
    interface IModalWizardProps {
    
        /**
         * Set this to true to show the dialog. False to hide it
         */
        show: boolean;
    
        /**
         * Call this to close the dialog
         */
        onClose:()=>void;
    
        /**
         * The title to show on the top
         */
        title: string;
    
        /**
         * An optional icon to show
         */
        icon?: string;
    
        /**
         * A method to render a subheader just below the title area.
         */
        onRenderHeader?:(currentStep:IModalWizardStepProps)=> JSX.Element;
    
        /**
         * The list of steps that this wizard consists of.
         */
        steps: IModalWizardStep[];
    
        /**
         * This action executes after they hit 'next' on the final page.
         */
        onComplete:()=>Promise<any>;
    
        /**
         * Text to show on the 'next' button in the final stage.
         */
        completionText?: string;
        className?:string;
    }
    /**
     * This component is used to show a modal dialog that takes the user through as sequence of steps.
     * You define how each step should render.
     * @export
     *
     * @example
     * ```
     *  <ModalWizard
     *      show={show}
     *      title="Sample modal wizard"
     *      steps={[
     *      {
     *          id: "step-1",
     *          render: (props) => <div>
     *              <FormField>
     *                  <Label>Name</Label>
     *                  <Input value={name} onChange={setName} />
     *              </FormField>
     *              <FormField>
     *                  <Label>Email</Label>
     *                  <Input value={email} onChange={setEmail} />
     *              </FormField>
     *          </div>,
     *          renderStatus: () => <div>Personal Details</div>,
     *          onValidateStep: () => "step-2",
     *          showStatus: true
     *      },
     *      {
     *          id: "step-2",
     *          render: (props) => <div>
     *              <FormField>
     *                  <Label>University</Label>
     *                  <Input value={school} onChange={setSchool} />
     *              </FormField>
     *          </div>,
     *          renderStatus: () => <div>Educational Details</div>
     *      }
     *  ]}
     *  onClose={() => { setShow(false) }}
     *  onComplete={async () => { return executeAction("model", "action", {data: data}) }}
     * />
     * ```
     *
     */
    export const ModalWizard : React.FunctionComponent<IModalWizardProps>;
        
    interface IFilterPanelProps {
        /**
         * Called whenever the panel is opened
         */
        onOpen?: ICallback,
    
        /**
         * Called whenever the panel gets dismissed
         */
        onClose?: ICallback,
    
        /**
         * Called whenever the clear button on the panel is pressed. This button is available only when `enableClear` is set to `true1`
         */
        onClear?: ICallback,
        fillContainer?: React.RefObject<HTMLElement>,
    
        /**
         * Any extra css classes to add to the filter panel
         */
        className?: string,
    
        /**
         * Enabled the clear button on the panel
         */
        enableClear?: boolean
    }
    /**
     * Displays a filter button which, when clicked, opens a popup panel.
     * Suitable for hiding filters for widgets or searches
     * @export
     *
     * @example
     * ```
     * <FilterPanel
     *                                enableClear={inputValue?.length > 0 || selected != null}
     *                                onClear={() => { setInputValue(""); setSelected(null) }} >
     *                                <FormField className="no-padding mb-only">
     *                                    <Label>Sort By</Label>
     *                                    <Select
     *                                        selected={selected}
     *                                        options={[
     *                                            { label: "Name", value: "op-1" },
     *                                            { label: "Date", value: "op-2" },
     *                                        ]}
     *                                        onChange={(value) => { setSelected(value) }}
     *                                        placeholder=" -- select --"
     *                                        isValid={selected ? selected?.length > 0 : null}
     *                                    />
     *                                </FormField>
     * </FilterPanel>
     * ```
     *
     */
    export const FilterPanel : React.FunctionComponent<IFilterPanelProps>;
        
    interface IWidgetTitleBarProps {
        /**
         * The title to show for the widget
         */
        title:string;
    
        /**
         * The url for an icon to be shown next to the title on the top left corner.
         */
        icon?:string;
        className?: string
    }
    /**
     * Use this to show a title area on widgets. You can set a title on the left side
     * and any arbitrary content on the right side - typically you would use a {@component FilterPanel} there.
     * The content that appears on the right side go as children of this component.
     * @export
     *
     * @example
     *
     * ```
     * <TitleBar title='My Test Widget'>
     *      <div>Active</div>
     * </TitleBar>
     * ```
     *
     */
    export const TitleBar : React.FunctionComponent<IWidgetTitleBarProps>;
        
    interface ILinkWidgetContainerProps {
        /**
         *  Set this to true to make the container visible
         */
        show: boolean,
        /**
         * Called whenever the container is opened
         */
        onOpen?: any,
         /**
         * Called when the container gets closed
         */
        onClose?: any,
        /**
         * The title set in the title bar of the container
         */
        title?: any,
        /**
         * Any extra css classes to apply
         */
        className?: string,
         /**
         * Any custom content to include in the container toolbar.
         */
        toolbarContent?: any
    }
    /**
     * This is a extended version of modal. this covers the full UI.
     * main purpose is to create a container for sidebar link widgets
     * @example
     * ```
     *  <button className="btn showcase" onClick={() => setShowLinkWidget(true)}>Click to Show Link Widget Container</button>
     *
     *  <LinkWidgetContainer
     *      show={showLinkWidget}
     *      onClose={() => setShowLinkWidget(false)}
     *      title="Link Widget Container"
     *  >
     *      content
     * </LinkWidgetContainer>
     * ```
     * @export
     *
     */
    export const LinkWidgetContainer : React.FunctionComponent<ILinkWidgetContainerProps>;
        
    interface IPieChartProps {
        /**
         * A list of items that the pie chart is comprised of
         */
        data: IDataItem[],
    
        /**
         * TODO
         */
        fillColor: string,
    
        /**
         * Set to `true` to show the chart legend
         */
        showLegend?: boolean
    }
    /**
     *
     * Display a pie chart visualization
     * @export
     */
    export const PieChartComponent : React.FunctionComponent<IPieChartProps>;
        
    interface IFormFeedbackProps {
        validInput?: boolean,
        className?: string
        spacingMode?: SpacingMode
    }
    /**
     * This is used to provide a success or error summary message for forms
     * @export
     * @example
     * ```
     * FormFeedback validInput>Form feedback ( valid )</FormFeedback>
     * ```
     *
     * @example
     * ```
     * <FormFeedback validInput={false}>Form feedback ( invalid )</FormFeedback>
     * ```
     *
     */
    export const FormFeedback : React.FunctionComponent<IFormFeedbackProps>;
        
    interface IDataGridProps {
        /**
         * The items to render into a grid. This will be an array of any data.
         * The data is passed into the render function and can be used there to render the actual grid cell.
         *
         */
        data: Array<any>,
    
        /**
         * A function which can be used to return the contents of each cell. The function will be passed 2 parameters:
         *
         * `item`: The individual item from the list of items passed as the `data` prop
         * `key`: The index of the item in the list
         *
         * This function should return a react element
         *
         * @example
         *
         * ```
         * renderItem={(item:any,key:number)=> <div>{'Key Is ' + key}}</div>}
         * ```
         */
        renderItem: (item: any, key: number) => JSX.Element,
    
        /**
         * The number of columns to display. Items will be layed out row by row and the number of columns in each row is specified here
         */
        columns: number,
    
        /**
         * Any additional css class names to include in the component
         */
        className?: string
    }
    /**
     * @export
     *
     * Used to show data in a matrix or grid. You can give it a list of items and a function to render those items.
     * Items get layed out in a grid and displayed.
     *
     * @example
     * ```
     *  let GridData = [
     *      {
     *          icon: "https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg",
     *          title: "Item Card",
     *          subTitle: "Item card with image/icon Item card with image/icon"
     *      },
     *      {
     *          icon: "",
     *          name: "Dinesh Gamage",
     *          title: "Item Card",
     *          subTitle: "Item card with name"
     *      },
     *      {
     *          icon: "https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg",
     *          title: "Item Card Title & Icon",
     *          subTitle: ""
     *      },
     *      {
     *          icon: "https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg",
     *          title: "",
     *          subTitle: "Item Card sub Title & Icon"
     *      },
     *      {
     *          title: "Item Card",
     *          subTitle: "Item card without image/icon"
     *      },
     *      {
     *          title: "Item Card Title only",
     *      },
     *      {
     *          subTitle: "Item card sub title only"
     *      },
     *      {
     *          icon: "https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg",
     *          title: "QR Code",
     *          subTitle: "scan your code"
     *      },
     *      {
     *          icon: "https://static.iviva.com/images/Adani_UXP/QR_badge_icon.svg",
     *      },
     *      null
     *  ]
     *
     *
     *  function renderGridItem(item: any, key: number){
     *      return (<ItemCard
     *          item={item}
     *          imageField="icon"
     *          titleField="title"
     *          subTitleField="subTitle"
     *          nameField="name"
     *      />)
     *  }
     *
     *  <DataGrid
     *      data={GridData}
     *      renderItem={renderGridItem}
     *      columns={2}
     *  />
     * ```
     *
     */
    export const DataGrid : React.FunctionComponent<IDataGridProps>;
        
    interface IItemCardProps {
        /**
         * A reference to the data to be rendered as a card.
         */
        item?: any,
    
        /**
         * The name of the field within the `item` that has the url of an image to be shown
         */
        imageField?: string,
    
        /**
         * The name of the field within `item` that has the title of the object
         */
        titleField?: string,
    
        /**
         * The name of the field within 'item' that holds the subtitle of the object
         */
        subTitleField?: string,
    
        /**
         * This name of the field within `item` that contains any 'name' associated with the object.
         * This property is used only if the imageField value is not set. The name is abbreviated and set as the profile image.
         */
        nameField?: string,
    
        /**
         * Any extra css classes to biind to the card.
         */
        className?: string,
    
        /**
         * These parameres will enable option to pass a value for each fields inseat of the field name.
         * Using these, users/developers will be able to provide static values
         */
        image?: string,
        name?: string,
        title?: string,
        subTitle?: string
    }
    /**
     * This component is used to render some item in a standard card form.
     * This includes a profile pic, a title, a subtitle and a list of fields and values.
     * @export
     *
     * @example
     * ```
     *  <ItemCard
     *      item={{
     *          request: "AC Extension request #36",
     *          user: "Johnson & Johnson",
     *          section: "Parking 1",
     *          status: "approved",
     *          date: "23/0702020"
     *      }}
     *      titleField="request"
     *      subTitleField="date"
     *      className="data-table-item"
     *  />
     * ```
     *
     * @example
     * ```
     *  <ItemCard
     *      item={{
     *          id: "1",
     *          image: "https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
     *          name: "John Doe",
     *      }}
     *      imageField="image"
     *      titleField="name"
     *      className="data-table-item"
     *  />
     * ```
     *
     * * @example
     * ```
     *  <ItemCard
     *      image="https://avatars.dicebear.com/api/male/john.svg?background=%230000ff"
     *      title="John Doe"
     *      className="data-table-item"
     *  />
     * ```
     *
     */
    export const ItemCard : React.FunctionComponent<IItemCardProps>;
        
    interface IItemListCardProps {
        /** The title to show on the card */
        title: string,
    
        /**
         * Any optional subtitle content to render. This should be a function that returns a react node
         */
        renderSubTitle?: () => JSX.Element,
    
        /**
         * The object to render in the card
         */
        item: any,
    
        /**
         * The list of fields from within the object that should be shown.
         * For each field in this list - one line gets rendered on the card
         */
        fields: string[],
    
        /** An optional function to control rendering of each field. It takes the item as a parameter along with the name of the field being rendered.
         * You can choose to render whatever you want here
         */
        renderField?: (object: any, field: string, key: number) => JSX.Element,
    
        /**
         * Any background tint to apply to the card. This must be in #RRGGBB hexadecimal format.
         */
        backgroundColor?: string
    
        /**
         * Any additional css classes to apply to the component
         */
        className?: string
    }
    /**
     * Show a card with a list of fields in it. You need to provide an object as the `item` prop and then a list of fields from within the object to be rendered.
     * You can also provide an optional `renderField` function to customize how fields are rendered.
     * @export
     *
     * @example
     * ```
     *  <ItemListCard
     *      title="System"
     *      item={{
     *          "hvac": {
     *              "value": 250,
     *              "percentage": 15
     *          },
     *          "lighting": {
     *              "value": 250,
     *              "percentage": 15
     *          },
     *          "elevators": {
     *              "value": 250,
     *              "percentage": 15
     *          },
     *          "fire alarm": {
     *              "value": 250,
     *              "percentage": 15
     *          }
     *      }}
     *      renderSubTitle={() => {
     *          return (<div className="sample-subtitle">Savings (AED)</div>)
     *      }}
     *      fields={["hvac", "lighting", "elevators", "fire alarm"]}
     *      renderField={(item, field, key) => {
     *          return (<div className="sample-item-field" key={key}>
     *              <div className="label">{field.toUpperCase()}</div>
     *              <div className="value">
     *                  <div className="amount">{item[field].value}</div>
     *                  <div className="percentage">{item[field].percentage}%</div>
     *              </div>
     *          </div>)
     *      }}
     *      backgroundColor="rgb(209 148 250)"
     *  />
     * ```
     *
     */
    export const ItemListCard : React.FunctionComponent<IItemListCardProps>;
        /**
     * @export
     */
    interface ISpaceworxDescriptionTagProps {
        className?: string,
        styles?: React.CSSProperties
    }
    /**
     * This gives a pre defined component to used in configuration panels where we need to explain what is spaceworx is
     *
     * @export
     *
     *
     * @example
     * ```
     * <SpaceworxDescriptionTag />
     * ```
     *
     */
    export const SpaceworxDescriptionTag : React.FunctionComponent<ISpaceworxDescriptionTagProps>;
        /**
     * @export
     */
    interface IWidgetWrapperProps {
        /**
         * Any extra css class names to add to the widget wrapper
         */
        className?: string,
        cssBreakPoints?: {
            width?: {
                default: string,
                [key: number]: string
            },
            height?: {
                default: string,
                [key: number]: string
            }
        },
        /**
         * this will be used to get the widget props
         * this will be used to access the name and description of the widget
         */
        instanceId?: string
        /**
         * sample data label
         */
        sampleData?: {
            /**
             * toggle sample data label
             */
            showLabel?: boolean,
            /**
             * this will be shown in the popup
             */
            description?: string,
            /**
             * this is deprecated - use product ids instead
             * link to buy from spaceworx
             * if not provided button will not be shown
             */
            link?: string,
    
            /**
             * prouct ids to show on spaceworx
             */
            productIds?: string[]
        }
    }
    /**
     *
     * @export
     *
     * This is a standard wrapper for widgets.
     * It provides basic visual styling for common widgets. You should generally wrap all your widgets in this.
     *
     * @example
     * ```
     * <WidgetWrapper>
     *  <Label>My custom widget</Label>
     * </WidgetWrapper>
     * ```
     *
     * @example
     *
     * ```
     * You can define custom break points for the widget and use css to make the widget responsive
     * Uxp will automatically apply the relevant class based on the width or height of the widget wrapper.
     * these class names will be prefixed with either `w-` (for width) or `h-` (for height)
     * then you can write css to make the widgets resposive
     * <WidgetWrapper
     *      cssBreakPoints={{
     *          width: {
     *              default: 'larger',
     *              100: 'smaller',
     *              200: 'small',
     *              300: 'medium'
     *          },
     *          height: {
     *              default: 'larger',
     * 				100: 'smaller',
     *  			200: 'small',
     *  			300: 'medium'
     * 			}
     *  	}}
     * 	>
     *
     *
     * ```
     *
     */
    export const WidgetWrapper : React.FunctionComponent<IWidgetWrapperProps>;
        
    interface IMapComponentProps {
        /**
         * The url of the tile server that will serve up map tiles.
         * This url should have the following placeholders in them:
         * `{x}`, `{y}` and `{z}`
         *
         * `{z}` represents the current zoom level
         *
         * @example
         * ```
         * mapUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
         * ```
         */
        mapUrl: string,
    
        /**
         * A static image to use instead of a map layout.
         * If you are using a static image, specify `mapUrl` as an empty string.
         *
         * The static image consists of a url for the image and a width and height of the image.
         * Note that the width and height values  be relative - just that the ratio should be accurate.
         *
         * @example
         * ```
         * staticImage={{url:'https://myserver/floor-plan.png',width:200,height:400}}
         * ```
         */
        staticImage?: IStaticImage,
    
        /**
         * Where the map is centered.
         */
        center?: { position: IMarker, renderMarker?: boolean },
    
        /**
         * A list of markers to render.
         * Each marker has a `latitude` `longitude` and `data` field.
         * The `data` field can store arbitrary data.
         */
        markers?: IMarker[],
    
        /**
         * This handler gets called whenever a marker is clicked on.
         * The first parameter represents the marker element that was clicked on.
         * The second parameter represents the data associated with the marker
         */
        onMarkerClick?: (el: any, data: any) => void
    
        /**
         * regions to show on map
         */
        regions?: IRegion[],
        /**
         * this handler will get called when a region is clicked
         *
         */
        onRegionClick?: (event: any, data: any) => void,
    
    
    
        /**
         * If you want to overlay a heatmap -  assign this object with some valid value
         */
        heatmap?: IHeatmapConfiguration
    
        /**
         * The default zoom level to show on the map
         */
        zoom?: number,
        /**
         * max zoom level.
         * optional. default is 19
         */
        maxZoom?: number,
        /**
         * min zoom level.
         * optional. default is -19
         */
        minZoom?: number,
        /**
         * zoom on scroll
         * default is false
         */
        zoomOnScroll?: boolean
        /**
         * this handler will get called when the map is clicked
         */
        onClick?: (event: LeafletMouseEvent) => void,
    
        onZoomEnd?: (event: LeafletEvent) => void
        onDragEnd?: (event: DragEndEvent) => void
    }
    /**
     * A map widget that can show a pannable/zoomable map with markers
     * @export
     *
     */
    export const MapComponent : React.FunctionComponent<IMapComponentProps>;
        
    interface IWizardProps {
        /**
         * A list of steps within the wizard.
         */
        steps: IWizardStep[];
    
        /**
         * What title should be shown on the 'next' button when we reach the last screen
         */
        completionTitle?: string;
    
        /**
         * This callback is run whenever they hit the final 'completion' action on the last step. It should be async so we can show a loading animation on the button
         */
        onComplete?: () => Promise<void>;
    }
    /**
     * A wizard-style interface to guide users through a journey.
     * You can conditionally skip steps and validate steps before proceeding.
     * @export
     */
    export const Wizard : React.FunctionComponent<IWizardProps>;
        /**
     * @export
     */
    interface IDateRangePickerProps {
        title?: string,
        /**
         * start date of the range. Either a Date object or an ISO8601 string representation of a date
         */
        startDate: string | Date,
        /**
         * end date of the range. Either a Date object or an ISO8601 string representation of a date
         */
        endDate: string | Date,
    
        /**
         * Option to pass selected preset
         */
        preset?: string
        /**
         * Callback that gets executed whenever a date range is selected/changed in the date picker
         */
        onChange: (newStartDate: string | Date, newEndDate: string | Date, preset?: string) => void,
        /**
         * Called when the calendar popup is closed
         */
        closeOnSelect?: boolean,
        /**
         * Set to true to prevent a user from typing in a date
         */
        disableInput?: boolean,
        /**
        * Additional options to control behavior
        */
        options?: IDatePickerOptions,
        /**
         * this will hide the labels in the placeholder (calendar icon and text)
         */
        hideLabels?: boolean
        /**
         * hide the input box
         */
        hideInput?: boolean,
    
        /**
         * show the full month name in the month selector dropdown
         * default is true
         *
         * if value is false it will show the short name "Jan" ,"Feb" and ect
         */
        showFullMonthName?: boolean
    
        /**
         * this will set the max width and show a compact picker
         */
        compact?: boolean
    
        spacingMode?: SpacingMode,
    
        renderAsPill?: {
            minWidth?: number,
            maxWidth?: number
        },
    
        presets?: {
            enable: boolean
            customPresets?: DateRangePreset[],
            renderPreset?: (preset: DateRangePreset, index: number, onSelectPreset: (preset: string) => void) => React.ReactNode,
            parseRelativeDatesOnSelect?: boolean // if this is set to true, relative dates will be parsed to dates
        }
    }
    /**
     *
     * @export
     *
     * This component is used to select a date range.
     *
     * @example
     * ```
     *  <DateRangePicker
     *      startDate={startDate}
     *      endDate={endDate}
     *      closeOnSelect
     *      onChange={(newStart, newEnd) => { setStartDate(newStart); setEndDate(newEnd) }}
     *  />
     * ```
     *
     */
    export const DateRangePicker : React.FunctionComponent<IDateRangePickerProps>;
        
    interface ITimeRangePickerProps {
        title: string
        /**
         * Start time . Either a Date object or an time string (Ex: 01:10:00 pm)
         */
        startTime: string | Date,
        /**
        * End time . Either a Date object or an time string (Ex: 01:10:00 pm)
        */
        endTime: string | Date,
        /**
        * Callback that gets executed whenever a time range is selected/changed in the time picker
        */
        onChange: (start: Date, end: Date) => void,
        /**
       * Set to true to prevent a user from typing in a time
       */
        disableInput?: boolean,
    
        spacingMode?: SpacingMode
    }
    /**
     *
     * @export
     *
     * This component is used to select a time range.
     *
     * @example
     * ```
     *  <TimeRangePicker
     *      startTime={startDate}
     *      endTime={endDate}
     *      onChange={(s, e) => { setStartDate(s); setEndDate(e) }}
     *  />
     * ```
     */
    export const TimeRangePicker : React.FunctionComponent<ITimeRangePickerProps>;
        
    interface ITrendChartProps {
        /**
         * The series to plot. More than one can be visualized.
         */
        data: ITrendSeries[],
    
        /**
         * Use this to render a custom tooltip that will appear when the user hovers over a data point.
         * The data being hovered over is passed as a parameter.
         *
         * @example
         * onShowTooltip={(data)=><div>{`Temperature: ${data.temp}`}</div>}
         */
        onShowTooltip?: (data: any) => JSX.Element
    
        /**
         * Called whenever a data point is clicked on. The data point being clicked on is passed as a parameter to the function
         */
        onClick?: (data: any) => JSX.Element
    }
    /**
     * A component to show time series based trend or line visualizations
     * @export
     *
     *
     * @example
     * ```
     *  const TrendData: ITrendSeries[] = [
     *      {
     *          unit: "A",
     *          lineColor: "#ff7300",
                data: [
                    { time: "2020/07/20", value: 200 },
                    { time: "2020/08/20", value: 100 },
                    { time: "2020/09/20", value: 50 },
                    { time: "2020/10/20", value: 300 },
                    { time: "2020/11/20", value: 700 },
                    { time: "2020/12/20", value: 90 }
                ],
                type: "line"
            },
            {
                unit: "B",
                lineColor: "#413ea0",
                fillColor: "#8884d8",
                data: [
                    { time: "2014/06/21", value: 50 },
                    { time: "2020/07/20", value: 50 },
                    { time: "2020/08/20", value: 30 },
                    { time: "2020/09/20", value: 90 },
                    { time: "2020/10/20", value: 300 },
                    { time: "2020/11/20", value: 100 },
                    { time: "2020/12/20", value: 90 }
                ],
                type: "area"
            }
        ]
     *
     *  <TrendChartComponent
     *      data={TrendData}
     *  />
     * ```
     */
    export const TrendChartComponent : React.FunctionComponent<ITrendChartProps>;
        
    interface IConfirmButtonProps {
        /**
         * The caption for the button
         */
        title: string,
    
        /**
         * The url of an icon to show on the button
         */
        icon?: string,
    
        /**
         * Any extra css classes to add to the button
         */
        className?: string,
    
        /**
         * The callback that gets invoked when the confirm button is clicked
         */
        onConfirm: () => Promise<any>,
        /**
         * The callback that gets invoked when the cancel button is clicked
         */
        onCancel: () => void,
    
        /**
         * Set this to `true` to show the button in its 'loading...' state.
         * In this state, an animation will be shown indicating that work is going on and the user will not be able to click the button
         */
        loading?: boolean,
    
        /**
         * The caption to show on the button when its in loading state
         */
        loadingTitle?: string,
        active?: boolean,
        disabled?: boolean
    }
    /**
     * This is a confirm button component.
     * @export
     *
     * @example
     * ```
     *  <ConfirmButton
     *      title="Delete Item"
     *      loading={buttonLoading}
     *      onConfirm={async () => {return executeAction("model", "action", {})}}
     *      onCancel={() => {alert("Canceled")}}
     *  />
     * ```
     */
    export const ConfirmButton : React.FunctionComponent<IConfirmButtonProps>;
        
    interface IDynamicSelectProps {
        /**
         * List of options to render.
         * This a function that will generate the array of objects.
         * pagination will be supported.
         * The function expects 2 parameters - max and last and returns a promise that will resolve to the list of objects. max specifies the maximum number of items to be returned.
         */
        options: IDynamicSelectDataFunction,
        /**
         * selected option label
         */
        selected: string,
        /**
         * Callback that gets executed whenever a option is selected/changed
         */
        onChange: (value: any) => void,
        /**
         * placeholder text
         */
        placeholder?: string,
        /**
         * Any extra css classes to add to the button
         */
        className?: string,
        /**
         * set to valid state if true
         */
        isValid?: boolean,
        /**
         * page size for pagination
         */
        pageSize?: number,
        /**
         * A function that will be responsible for rendering each individual option of the list.
         *
         * @example
         *
         * ```
         * renderItem={(option,key)=><div>{option.label}</div>}
         * ```
         *
         * @example
         * ```
         * renderItem={(option,key)=><ItemCard data={item} titleField='label' />}
         * ```
         */
        renderOption?: (item: any, key: number) => JSX.Element,
        /**
         * name of the field to display
         */
        labelField: string,
        /**
         * Name if the field to use as icon
         * if a value is passed icon will be displayed.
         */
        iconField?: string
        /**
         * number of milliseconds to delay send the request on change query
         * default is 500
         *
         */
        timeout?: number,
        type?: "search-box" | "select-box",
        /**
         * show hide end of content message
         */
        showEndOfContent?: boolean
    }
    /**
     *
     * @export
     *
     * This component is used to create a select box with pagination (infinite scrolling) & search/filter options.
     * Support keyboard interactions
     *  - Arrow Keys (up & down) - navigate through options list
     *  - Enter Key - Select current highlighted option
     *  - Escape Key - Exit select mode & discard changes
     * @example
     * ```
     *  <DynamicSelect
     *      selected={selected}
     *      options={(max: number, pageToken: string, args?: any) => getOptions(max, pageToken, args)}
     *      onChange={(value) => { setSelected(value)}}
     *      placeholder=" -- select --"
     *      labelField="label"
     *      timeout={500}
     *  />
     * ```
     *
     */
    export const DynamicSelect : React.FunctionComponent<IDynamicSelectProps>;
        
    interface IDataTableProps {
        /**
         * List of items to render. This can either be an array of objects or a function that will generate the array of objects.
         * If you supply a function then pagination will be supported. The function expects 2 parameters - `max` and `last` and returns a promise that will resolve to the list of objects.
         * `max` specifies the maximum number of items to be returned.
         */
        data: Array<any> | IDataFunction,
    
        /**
         * List of columns to render
         * column contains three(3) params
         *  - title : column title. this can be either a string or a function that returns a jsx element
         *  - width : width of the column. this can a percentage (20%), fixed with (100px) or null
         *  - renderColumn : content of the column. this is a function that returns a jsx element. this function will take a single argument item type of any
         *  @example
         *
         * ```
         *  renderColumn={(item,key)=><div>{'Item:' + JSON.stringify(item)}}</div>}
         * ```
         * @example
         *
         * ```
         * columns= {[
         *  {
         *      title: "Request Id",
         *      width: "20%",
         *      render: (item) => <div>{item.requestId} </div>
         *  },
         *  {
         *      title: "User",
         *      width: "10%",
         *      render: (item) => <div>{item.user} </div>
         *  }
         * ]}
         * ```
         */
        columns: IDataTableColumn[],
    
        /**
         * The number of items to fetch in each page. This gets passed to the data function as the `max` parameter
         */
        pageSize: number,
    
        args?: any
    
        /**
         * This function renders a loading animation. If not specified, the default loading animation will be used.
         */
        renderLoading?: () => JSX.Element,
    
        /**
         * Any extra class names to be added to the component
         */
        className?: string
        /**
         * show/hide footer (scroll buttons)
         */
        showFooter?: boolean,
        /**
         * mun of rows to scroll
         */
        scrollStep?: number,
        /**
         * show/hide end of content message
         */
        showEndOfContent?: boolean
    
        /**
       * this function will be called every time list get updated
       * this will return total number of items (function should return the total count) and loaded items count
       */
        onItemsLoad?: (total: number, loaded: number) => void
    
        /**
         * this will toggle the headers
         * default is true
         */
        renderHeaders?: boolean,
    
        /**
         * callback function to trigger on click a table row
         */
        onClickRow?: (item: any) => void,
    
        /**
         * active table row styles
         * default is 'active' an has some styles
         * if you give a class here it will be applied
         */
        activeClass?: string
    }
    /**
     *
     * A infinite-scrollable list that supports paging in of items
     * @export
     *
     * @example
     * ```
     *  <DataTable
     *      data={(max, last) => getDataItems(max, last)}
     *      pageSize={10}
     *      columns={[
     *          {
     *              title: "Request",
     *              width: "30%",
     *              renderColumn: (item) => <ItemCard
     *                  item={item}
     *                  subTitleField="request"
     *                  className="data-table-item"
     *              />
     *          },
     *          {
     *              title: "User",
     *              width: "25%",
     *              renderColumn: (item) => <ItemCard
     *                  item={item}
     *                  subTitleField="user"
     *                  className="data-table-item"
     *              />
     *          },
     *          {
     *              title: "Zone",
     *              width: "15%",
     *              renderColumn: (item) => <ItemCard
     *                  item={item}
     *                  subTitleField="section"
     *                  className="data-table-item"
     *              />
     *          },
     *          {
     *              title: "Status",
     *              width: "15%",
     *              renderColumn: (item) => <ItemCard
     *                  item={item}
     *                  subTitleField="status"
     *                  className="data-table-item"
     *              />
     *          },
     *          {
     *              title: "Date",
     *              width: "15%",
     *              renderColumn: (item) => <ItemCard
     *                  item={item}
     *                  subTitleField="date"
     *                  className="data-table-item"
     *              />
     *          }
     *      ]}
     *  />
     * ```
     */
    export const DataTable : React.FunctionComponent<IDataTableProps>;
        
    interface IHSListProps {
        /**
         * Array of items
         */
        items: any[],
        /**
         * render method for an item given above
         */
        renderItem: (item: any, key: number) => JSX.Element
        /**
         * number of items to scroll when click on controller buttons
         */
        scrollStep?: number
        /**
         * additional css class names
         */
        className?: string,
        infinite?: boolean,
        autoScroll?: {
            enable: boolean,
            interval?: number // default 5000 (equals to 5s/5000ms)
        }
    }
    /**
     * This widget will create a horizontal scroll-able list
     *
     * @example
     * ```
     *  <HorizontalScrollList
     *      items={[...Array(15).keys()]}
     *      renderItem={(item, key) => {
     *      return (<div className="item-thumbnail">
     *              {key}
     *          </div>)
     *      }}
     *  />
     * ```
     * @export
     */
    export const HorizontalScrollList : React.FunctionComponent<IHSListProps>;
        
    interface ILinkButtonWidgetProps {
        /**
         * link url
         */
        link: string,
        /**
         * target for link
         * default is _self
         */
        target?: "_self" | "_blank" | "_parent"
        /**
         * icon to show
         */
        icon: string,
        /**
         * label for link
         */
        label: string
    }
    /**
     * This widget will give a simple widget with configurable option to create a link button
     *
     * @example
     * ```
     *  <LinkButtonWidget
     *      link="https://google.com"
     *      target="_blank"
     *      icon="path to your icon"
     *      label="Go to Google"
     *  />
     * ```
     * @export
     */
    export const LinkButtonWidget : React.FunctionComponent<ILinkButtonWidgetProps>;
        /**
     * @export
     */
    interface ICalendarComponentProps {
        /**
         * array of dates
         */
        dates: Date[]
        /**
         * callback to trigger on click date
         * ill return the clicked date
         */
        onSelectDate: (date: Date) => void
        /**
         * disable weekends
         */
        disableWeekEnds?: boolean,
        /**
         * list of dates to disable
         */
        disableDates?: Array<Date>
        /**
         * min date
         */
        minDate?: Date,
        /**
         * max date
         */
        maxDate?: Date,
        /**
         * class name to use custom styles
         */
        className?: string
    }
    /**
     * @export
     * Calendar component so display range of dates
     */
    export const CalendarComponent : React.FunctionComponent<ICalendarComponentProps>;
        /**
     * @export
     * Options that can be passed to a date picker field
     */
    interface IGaugeProps {
        /**
         * min value of the gauge
         */
        min: number;
        /**
         * max value of the gauge
         */
        max: number;
        /**
         * value of the gauge
         */
        value: number;
    
        /**
         * colors array.
         * color: name of the color.
         * stopAt: length of color distribution.
         *
         * default is blue, green, yellow, red colors at equal length
         */
        colors?: Array<{ color: string, stopAt: number }>;
        /**
         * label
         * no default value
         */
        label?: () => JSX.Element,
        /**
         * if true show legend.
         * default is false
         */
        legend?: boolean,
        /**
         * color of the ticks.
         * default is white
         */
        tickColor?: string,
        /**
         * class name(s) for additional styling
         */
        className?: string,
        /**
         * additional inline styles
         */
        styles?: React.CSSProperties
    
        /**
         * if true show gradient colors
         * default is false
         */
        gradient?: boolean,
        /**
         * thickness of the gauge
         * This value is defend on the radius
         * default is radius * 0.11
         * max value is radius * 0.25
         *
         * if you pass a higher value than the max value, max value will be used
         */
        thickness?: number,
        /**
         * thickness of the large ticks
         * default is 4
         * min value is 1
         * max value is 6
         *
         * if the given value is higher than the max value, max values will be used
         */
        largeTick?: number,
        /**
         * thickness of the small ticks
         * default is 1
         * min values is 1
         * max values is 3
         *
         * if the given values is higher than the max value, max values will be used
         */
        smallTick?: number
        /**
         * backbround color of the gauge
         * default is white
         */
        backgroundColor?: string,
        /**
         * color of the labels
         * default is #424242
         */
        labelColor?: string,
        /**
         * color of the needle
         * default is gray
         */
        needleColor?: string
    }
    /**
     *
     * @export
     *
     * This component is used to create a radial gauge.
     *
     * ## Demo
     * Find a [Demo](https://lucy-uxp.github.io/dev/showcase.html#radial-gauge) here
     *
     *
     * @example
     * ```
     *  <RadialGauge
     *      value={10}
     *      min={0}
     *      max={100}
     *  />
     * ```
     *
     * @example
     * ```
     *  <RadialGauge
     *      value={10}
     *      min={0}
     *      max={100}
     *      label={() => <>Equipment Heat</>}
     *      legend={true}
     *      gradient={true}
     *      thickness={20}
     *      largeTick={5}
     *      smallTick={2}
     *      colors={[
     *          {color: 'cyan', stopAt: 12.5},
     *          {color: 'green', stopAt: 70},
     *          {color: 'orange', stopAt: 87.5},
     *          {color: 'red', stopAt: 100},
     *      ]}
     *
     *  />
     * ```
     */
    export const RadialGauge : React.FunctionComponent<IGaugeProps>;
        
    interface IAutoCompleteInputProps {
        /**
         * value for the
         */
        value: string
        /**
         * callback on value change
         */
        onChange: (val: string) => void
        /**
         * options to auto generate the dropdown list
         */
        options?: string[],
        /**
         * render auto complete dropdown
         */
        autoFill?: () => JSX.Element,
        /**
         * additional class name
         */
        className?: string,
        /**
         * indicate the if the value is valid or not
         */
        isValid?: boolean,
        /**
         * placeholder
         */
        placeholder?: string
        /**
         * this will be used to bind the keybaord inputs.
         * once you add the class you will be able to navigate trhough the options using arrow keys (up and down)
         * you need to add the same classname to the options
         *
         * default is 'uxp-select-option-container'
         * you can use the default class in the drop down option and you will get the default styles
         * <div classname="uxp-select-option-container" ...> a</div>
         *
         * if you pass a custom class name you need write some styles to indicate the selected items
         *
         * in styles (.scss file)
         * --------------------
         * .<custom-class-name> {
         *   &.highlighted {
         *          background-color: #52c4c94a;
         *          color: #424242;
         *  }
         * }
         *
         * @example
         * ```
         * function renderAutoFill() {
         * return <div>
         *      <div classname="custom-class-name" ...> a</div>
         *      <div classname="custom-class-name" ...> b</div>
         *      <div classname="custom-class-name" ...> c</div>
         * </div>
         * }
         * <AtutoCompleteInput
         * ...
         * optionClassName={'custom-class-name'}
         * autoFill={renderAutoFill()}
         * />
         * ```
         */
        optionClassName?: string
        /**
         * tab index. default is 0
         */
        tabIndex?: number
    }
    /**
     * @export
     * Events/Callbacks to controll the behaviour of the component
     *
     * @example
     * ```
     * // create a ref
     * let inputRef: React.MutableRefObject<IAutoCompleteInputInstanceProps> = React.useRef(null)
     *
     * // add the ref to input
     * <AutoCompleteInput
     *  ...
     *  ref ={inputRef}
     * />
     *
     *
     * // use
     * inputRef.current?.open()
     * inputRef.current?.close()
     * inputRef.current?.focus()
     * let input = inputRef.current?.getInputElement()
     * inputRef.current?.appendAtCursor('string to append')
     * ```
     */
    interface IAutoCompleteInputInstanceProps {
        /**
         * this will open the picker
         *
         * @example
         * ```
         * inputRef.current?.open()
         * ```
         */
        open: () => void
        /**
         * this will close the picker
         *
         * @example
         * ```
         * inputRef.current?.close()
         * ```
         */
        close: () => void,
        /**
        * this will focus the input
        *
        * @example
        * ```
        * inputRef.current?.focus()
        * ```
        */
        focus: () => void,
        /**
         * This will return the input element
         * @example
         * ```
         * let input = inputRef.current?.getInputElement()
         * ```
         */
        getInputElement: () => React.MutableRefObject<HTMLInputElement>,
        /**
         * This will append the passed value at the cursor
         * if a selection has made it will be replaced by the passed value
         */
        appendAtCursor: (value: string) => void
    }
    /**
     * This component allows you to create a custom autocomplete component.
     *
     * @example
     * ```
     *  let [val, setVal] = useState('')
     *  let inputRef = useRef(null)
     *
     *  let data = [
     *      {name: 'India'},
     *      {name: 'Japan'},
     *      {name: 'China'},
     *      {name: 'Singapore'},
     *      {name: 'Italy'},
     *  ]
     *
     *  function renderAutoComplete() {
     *
     *      let options = data.filter(d => d.name.includes(val))
     *
     *      return <>
     *          {options.map((o, i) => {
     *              return <div onClick={() => {
     *                      // to replace the value
     *                      setVal(o.name);
     *
     *                      // if you want to apped at the cursor
     *                      inputRef.current?.appendAtCursor(o.name)
     *
     *                      // close picker when select an item
     *                      inputRef.current?.close()
     *                  }>
     *                          {o.name}
     *                  </div>
     *          })}
     *      </>
     *  }
     *
     *  return <div>
     *
     *      <AutoCompleteInput
     *          value={val}
     *          onChange={setVal}
     *          autoFill={<div >
     *              {renderAutoComplete()}
     *          </div>}
     *          ref={inputRef}
     *      />
     *
     *  </div>
     *
     * ```
     *
     *
     * @example
     * ```
     *  Also you can pass a set of items instead of custom auto fill.
     *  Component will create a the auto fill
     *
    *      <AutoCompleteInput
     *          value={val}
     *          onChange={setVal}
     *          options={['India', 'Japan', 'China', 'Singapore']}
     *          ref={inputRef}
     *      />
     * ```
     *
     * @export
     */
    export const AutoCompleteInput:React.ForwardRefExoticComponent<IAutoCompleteInputProps & React.RefAttributes<IAutoCompleteInputInstanceProps>>;
        /**
     * @export
     *
     *
     */
    interface IFileInputProps {
        value: File | string
        onChange: (file: File, isValid: boolean) => void,
        allowedTypes?: string[]
        preview?: {
            showName?: boolean // default false,
            showPreview?: boolean // default true
        }
        className?: string,
        dropAreaIcon?: IconProp,
        dropAreaLabel?: string
    }
    /**
     * @export
     */
    interface IFileInputInstanceProps {
    
    }
    /**
     * @export
     * This component gives you a file input component.
     *
     *
     */
    export const FileInput:React.ForwardRefExoticComponent<IFileInputProps & React.RefAttributes<IFileInputInstanceProps>>;
        /**
     * @export
     *
     */
    interface ISampleDataLabelProps {
        show?: boolean;
        // info?: () => React.ReactElement;
    }
    /**
     * @export
     *
     * This component will be used to add a label to a widget to show that it's being rendered using sample data
     *
     * @example
     *
     * ```
     * <SampleDataLabel
     *  show={true}
     * />
     * ```
     */
    export const SampleDataLabel : React.FunctionComponent<ISampleDataLabelProps>;
        /**
     * @export
     */
    interface ILocalisationFormProps {
        code: string,
        useGoogleTranslate?: boolean,
        className?: string,
    }
    /**
     * @export
     * This component let's you to configure localisation messages for the enabled languages in iviva
     *
     * @example
     *
     * <LocalizationForm
     * code: 'uxp-core.text.save'
     * />
     */
    export const LocalizationForm : React.FunctionComponent<ILocalisationFormProps>;
        /**
     * @export
     */
    interface ILocalisationFormModalProps {
        code: string,
        useGoogleTranslate?: boolean,
        beforeOpen?: () => boolean
        className?: string
    }
    /**
     * @export
     */
    interface ILocalisationFormModalInstanceProps {
        open: () => void,
        close: () => void
    }
    /**
     * @export
     *
     * This component let's you to configure localisation messages for the enabled languages in iviva and it opens in a modal
     *
     *
     * @example
     *
     * <LocalizationFormModal
     * code: 'uxp-core.text.save'
     * />
     */
    export const LocalizationFormModal:React.ForwardRefExoticComponent<ILocalisationFormModalProps & React.RefAttributes<ILocalisationFormModalInstanceProps>>;
        /**
     * @export
     */
    interface TableComponentProps {
        /**
         * data for the table
         * can pass a plat list of data or a function that will support pagination
         */
        data: any[] | ((page: number, pageSize: number) => Promise<{ items: any[] }>);
        /**
         * columns definitions
         */
        columns: Column[];
        /**
         * initial page size , can be change from the pagination component
         */
        pageSize: number,
        /**
         * total number of records
         */
        total: number | (() => Promise<number>)
        /**
         * loading state if require
         */
        loading?: boolean,
        /**
         * messge to show when no items found
         */
        noItemsMessage?: string | React.ReactNode,
        /**
         * this adds a edit column in to the table
         */
        editColumn?: {
            enable: boolean,
            label?: string,
            renderColumn?: (item: any) => React.ReactNode,
            onEdit?: (item: any) => void,
        },
        /**
         * this adds a edit column in to the table
         *
         */
        deleteColumn?: {
            enable: boolean,
            label?: string,
            renderColumn?: (item: any) => React.ReactNode,
            onDelete?: (item: any) => Promise<void>,
        }
        minCellWidth?: number,
        onClickRow?: (e: React.MouseEvent<HTMLDivElement>, item: any) => void
        onClickColumn?: (e: React.MouseEvent<HTMLDivElement>, item: any, column: Column) => void
    }
    /**
     * @export
     *
     * Table component with pagination
     *
     * @example
     *
     * ```
     *  const data = [
     *   {RegNo: 1, Name: 'Jane',...}
     *   {RegNo: 2, Name: 'John',...}
     *   {RegNo: 3, Name: 'Andy',...}
     * ]
     *
     *  <TableComponent
     *   data={data}
     *   columns={[ {id: 'RegNo', label: 'Registration Number' }, {id: 'Name', label: 'User Name'}  ]}
     *   pageSize={10}
     *   total={25}
     *  />
     * ```
     *
     */
    export const TableComponent : React.FunctionComponent<TableComponentProps>;
        /**
     * @export
     *
     * CRUD component props
     */
    interface CRUDComponentProps {
        /**
         * list view props
         */
        list: ListProps,
        /**
         * add view props
         */
        add?: FormProps,
        /**
         * option to render a custom add  view
         */
        renderCustomAddView?: RenderCustomFormView
        /**
         * edit view props
         */
        edit?: ExtendedFormProps,
        /**
         * option to render a custom edit view
         */
        renderCustomEditView?: RenderCustomFormView
        /**
         * option to disable views
         */
        disableViews?: {
            add?: boolean;
            edit?: boolean;
            delete?: boolean;
        },
        /**
         * name of the entit, this will be used in notifications
         */
        entityName?: string
    }
    /**
     * @export
     *
     * CRUD component instannce props
     */
    interface CRUDComponentInstanceProps {
        /**
         * option to refresh the list
         */
        refreshList: () => void
    }
    /**
     * @export
     *
     * CRUD component
     */
    export const CRUDComponent:React.ForwardRefExoticComponent<CRUDComponentProps & React.RefAttributes<CRUDComponentInstanceProps>>;
        /**
     * @export
     */
    interface TreeViewSelectInputProps extends TreeViewProps {
        placeholder?: string,
        showSelectedNodePath?: boolean
    }
    /**
     * @export
     */
    interface TreeViewSelectInputInstanceProps {
    
    }
    /**
     * @export
     *
     * Select component with treeview
     */
    export const TreeViewSelectInput:React.ForwardRefExoticComponent<TreeViewSelectInputProps & React.RefAttributes<TreeViewSelectInputInstanceProps>>;
        export const useEventSubscriber:IEventSubscriber;    export const useToast:ToastHook;    export const useAlert:AlertHook;    export const useUpdateWidgetProps:IUseUpdateWidgetProps;    export const useDebounce:DebounceHook;    export const useResizeEffect:ResizeEffectHook;    export const useMessageBus:MessageBusHook;    export const useFields:FieldsHook;    export const useEffectWithPolling:IUseEffectWithPolling;
}
