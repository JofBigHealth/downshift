import * as React from 'react'

type Callback = () => void

export interface DownshiftState<Item> {
  highlightedIndex: number | null
  inputValue: string | null
  isOpen: boolean
  selectedItem: Item | null
}

export enum StateChangeTypes {
  unknown = '__autocomplete_unknown__',
  mouseUp = '__autocomplete_mouseup__',
  itemMouseEnter = '__autocomplete_item_mouseenter__',
  keyDownArrowUp = '__autocomplete_keydown_arrow_up__',
  keyDownArrowDown = '__autocomplete_keydown_arrow_down__',
  keyDownEscape = '__autocomplete_keydown_escape__',
  keyDownEnter = '__autocomplete_keydown_enter__',
  clickItem = '__autocomplete_click_item__',
  blurInput = '__autocomplete_blur_input__',
  changeInput = '__autocomplete_change_input__',
  keyDownSpaceButton = '__autocomplete_keydown_space_button__',
  clickButton = '__autocomplete_click_button__',
  blurButton = '__autocomplete_blur_button__',
  controlledPropUpdatedSelectedItem = '__autocomplete_controlled_prop_updated_selected_item__',
  touchEnd = '__autocomplete_touchend__',
}

export interface DownshiftProps<Item> {
  initialSelectedItem?: Item
  initialInputValue?: string
  initialHighlightedIndex?: number | null
  initialIsOpen?: boolean
  defaultHighlightedIndex?: number | null
  defaultIsOpen?: boolean
  itemToString?: (item: Item | null) => string
  selectedItemChanged?: (prevItem: Item, item: Item) => boolean
  getA11yStatusMessage?: (options: A11yStatusMessageOptions<Item>) => string
  onChange?: (
    selectedItem: Item | null,
    stateAndHelpers: ControllerStateAndHelpers<Item>,
  ) => void
  onSelect?: (
    selectedItem: Item | null,
    stateAndHelpers: ControllerStateAndHelpers<Item>,
  ) => void
  onStateChange?: (
    options: StateChangeOptions<Item>,
    stateAndHelpers: ControllerStateAndHelpers<Item>,
  ) => void
  onInputValueChange?: (
    inputValue: string,
    stateAndHelpers: ControllerStateAndHelpers<Item>,
  ) => void
  stateReducer?: (
    state: DownshiftState<Item>,
    changes: StateChangeOptions<Item>,
  ) => Partial<StateChangeOptions<Item>>
  itemCount?: number
  highlightedIndex?: number | null
  inputValue?: string | null
  isOpen?: boolean
  selectedItem?: Item | null
  children?: ChildrenFunction<Item>
  id?: string
  inputId?: string
  labelId?: string
  menuId?: string
  getItemId?: (index?: number) => string
  environment?: Environment
  onOuterClick?: (stateAndHelpers: ControllerStateAndHelpers<Item>) => void
  scrollIntoView?: (node: HTMLElement, menuNode: HTMLElement) => void
  onUserAction?: (
    options: StateChangeOptions<Item>,
    stateAndHelpers: ControllerStateAndHelpers<Item>,
  ) => void
  suppressRefError?: boolean
}

export interface Environment {
  addEventListener: typeof window.addEventListener
  removeEventListener: typeof window.removeEventListener
  document: Document
}

export interface A11yStatusMessageOptions<Item> {
  highlightedIndex: number | null
  inputValue: string
  isOpen: boolean
  itemToString: (item: Item) => string
  previousResultCount: number
  resultCount: number
  highlightedItem: Item
  selectedItem: Item
}

export interface StateChangeOptions<Item>
  extends Partial<DownshiftState<Item>> {
  type: StateChangeTypes
}

type StateChangeFunction<Item> = (
  state: DownshiftState<Item>,
) => Partial<StateChangeOptions<Item>>

export interface GetRootPropsOptions {
  refKey: string
}

export interface GetInputPropsOptions
  extends React.HTMLProps<HTMLInputElement> {
  disabled?: boolean
}

export interface GetLabelPropsOptions
  extends React.HTMLProps<HTMLLabelElement> {}

export interface GetToggleButtonPropsOptions
  extends React.HTMLProps<HTMLButtonElement> {
  disabled?: boolean
}

export interface GetMenuPropsOptions
  extends React.HTMLProps<HTMLElement>,
    GetPropsWithRefKey {
  ['aria-label']?: string
}

export interface GetPropsCommonOptions {
  suppressRefError?: boolean
}

export interface GetPropsWithRefKey {
  refKey?: string
}

export interface GetItemPropsOptions<Item>
  extends React.HTMLProps<HTMLElement> {
  index?: number
  item: Item
  isSelected?: boolean
  disabled?: boolean
}

export interface PropGetters<Item> {
  getRootProps: (
    options?: GetRootPropsOptions,
    otherOptions?: GetPropsCommonOptions,
  ) => any
  getToggleButtonProps: (options?: GetToggleButtonPropsOptions) => any
  getLabelProps: (options?: GetLabelPropsOptions) => any
  getMenuProps: (
    options?: GetMenuPropsOptions,
    otherOptions?: GetPropsCommonOptions,
  ) => any
  getInputProps: <T>(options?: T) => T & GetInputPropsOptions
  getItemProps: (options: GetItemPropsOptions<Item>) => any
}

export interface Actions<Item> {
  reset: (
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  openMenu: (cb?: Callback) => void
  closeMenu: (cb?: Callback) => void
  toggleMenu: (
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  selectItem: (
    item: Item,
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  selectItemAtIndex: (
    index: number,
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  selectHighlightedItem: (
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  setHighlightedIndex: (
    index: number,
    otherStateToSet?: Partial<StateChangeOptions<Item>>,
    cb?: Callback,
  ) => void
  clearSelection: (cb?: Callback) => void
  clearItems: () => void
  setItemCount: (count: number) => void
  unsetItemCount: () => void
  setState: (
    stateToSet: Partial<StateChangeOptions<Item>> | StateChangeFunction<Item>,
    cb?: Callback,
  ) => void
  // props
  itemToString: (item: Item) => string
}

export type ControllerStateAndHelpers<Item> = DownshiftState<Item> &
  PropGetters<Item> &
  Actions<Item>

export type ChildrenFunction<Item> = (
  options: ControllerStateAndHelpers<Item>,
) => React.ReactNode

export default class Downshift<Item = any> extends React.Component<
  DownshiftProps<Item>
> {
  static stateChangeTypes: {
    unknown: StateChangeTypes.unknown
    mouseUp: StateChangeTypes.mouseUp
    itemMouseEnter: StateChangeTypes.itemMouseEnter
    keyDownArrowUp: StateChangeTypes.keyDownArrowUp
    keyDownArrowDown: StateChangeTypes.keyDownArrowDown
    keyDownEscape: StateChangeTypes.keyDownEscape
    keyDownEnter: StateChangeTypes.keyDownEnter
    clickItem: StateChangeTypes.clickItem
    blurInput: StateChangeTypes.blurInput
    changeInput: StateChangeTypes.changeInput
    keyDownSpaceButton: StateChangeTypes.keyDownSpaceButton
    clickButton: StateChangeTypes.clickButton
    blurButton: StateChangeTypes.blurButton
    controlledPropUpdatedSelectedItem: StateChangeTypes.controlledPropUpdatedSelectedItem
    touchEnd: StateChangeTypes.touchEnd
  }
}

export function resetIdCounter(): void

/* useSelect Types */

export interface UseSelectState<Item> {
  highlightedIndex: number
  selectedItem: Item
  isOpen: boolean
  keySoFar: string
}

export enum UseSelectStateChangeTypes {
  MenuKeyDownArrowDown = '__menu_keydown_arrow_down__',
  MenuKeyDownArrowUp = '__menu_keydown_arrow_up__',
  MenuKeyDownEscape = '__menu_keydown_escape__',
  MenuKeyDownHome = '__menu_keydown_home__',
  MenuKeyDownEnd = '__menu_keydown_end__',
  MenuKeyDownEnter = '__menu_keydown_enter__',
  MenuKeyDownCharacter = '__menu_keydown_character__',
  MenuBlur = '__menu_blur__',
  MenuMouseLeave = '__menu_mouse_leave__',
  ItemMouseMove = '__item_mouse_move__',
  ItemClick = '__item_click__',
  ToggleButtonKeyDownCharacter = '__togglebutton_keydown_character__',
  ToggleButtonKeyDownArrowDown = '__togglebutton_keydown_arrow_down__',
  ToggleButtonKeyDownArrowUp = '__togglebutton_keydown_arrow_up__',
  ToggleButtonClick = '__togglebutton_click__',
  FunctionToggleMenu = '__function_toggle_menu__',
  FunctionOpenMenu = '__function_open_menu__',
  FunctionCloseMenu = '__function_close_menu__',
  FunctionSetHighlightedIndex = '__function_set_highlighted_index__',
  FunctionSelectItem = '__function_select_item__',
  FunctionClearKeysSoFar = '__function_clear_keys_so_far__',
  FunctionReset = '__function_reset__',
}

export interface UseSelectProps<Item> {
  items: Item[]
  itemToString?: (item: Item) => string
  getA11yStatusMessage?: (options: UseSelectA11yMessageOptions<Item>) => string
  getA11ySelectionMessage?: (
    options: UseSelectA11yMessageOptions<Item>,
  ) => string
  circularNavigation?: boolean
  highlightedIndex?: number
  initialHighlightedIndex?: number
  defaultHighlightedIndex?: number
  isOpen?: boolean
  initialIsOpen?: boolean
  defaultIsOpen?: boolean
  selectedItem?: Item
  initialSelectedItem?: Item
  defaultSelectedItem?: Item
  id?: string
  labelId?: string
  menuId?: string
  toggleButtonId?: string
  getItemId?: (index: number) => string
  stateReducer?: (
    state: UseSelectState<Item>,
    actionAndChanges: UseSelectStateChangeOptions<Item>,
  ) => UseSelectState<Item>
  onSelectedItemChange?: (changes: Partial<UseSelectState<Item>>) => void
  onIsOpenChange?: (changes: Partial<UseSelectState<Item>>) => void
  onHighlightedIndexChange?: (changes: Partial<UseSelectState<Item>>) => void
  onStateChange?: (changes: Partial<UseSelectState<Item>>) => void
  environment?: Environment
}

export interface UseSelectA11yMessageOptions<Item> {
  isOpen: boolean
  selectedItem: Item
  items: Item[]
  itemToString: (item: Item) => string
}

export interface UseSelectStateChangeOptions<Item> {
  type: UseSelectStateChangeTypes
  changes: UseSelectState<Item>
  props: UseSelectProps<Item>
}

export interface UseSelectGetMenuPropsOptions
  extends GetPropsWithRefKey,
    GetMenuPropsOptions {}

export interface UseSelectGetToggleButtonPropsOptions
  extends GetPropsWithRefKey,
    GetToggleButtonPropsOptions {}

export interface UseSelectGetLabelPropsOptions extends GetLabelPropsOptions {}

export interface UseSelectGetItemPropsOptions<Item>
  extends GetItemPropsOptions<Item>,
    GetPropsWithRefKey {}

export interface UseSelectPropGetters<Item> {
  getToggleButtonProps: (options?: UseSelectGetMenuPropsOptions) => any
  getLabelProps: (options?: UseSelectGetLabelPropsOptions) => any
  getMenuProps: (options?: UseSelectGetToggleButtonPropsOptions) => any
  getItemProps: (options: UseSelectGetItemPropsOptions<Item>) => any
}

export interface UseSelectActions<Item> {
  reset: () => void
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  selectItem: (item: Item) => void
  setHighlightedIndex: (index: number) => void
}

export type UseSelectReturnValue<Item> = UseSelectState<Item> &
  UseSelectPropGetters<Item> &
  UseSelectActions<Item>

export interface UseSelectInterface {
  <Item>(props: UseSelectProps<Item>): UseSelectReturnValue<Item>
  stateChangeTypes: {
    MenuKeyDownArrowDown: UseSelectStateChangeTypes.MenuKeyDownArrowDown
    MenuKeyDownArrowUp: UseSelectStateChangeTypes.MenuKeyDownArrowUp
    MenuKeyDownEscape: UseSelectStateChangeTypes.MenuKeyDownEscape
    MenuKeyDownHome: UseSelectStateChangeTypes.MenuKeyDownHome
    MenuKeyDownEnd: UseSelectStateChangeTypes.MenuKeyDownEnd
    MenuKeyDownEnter: UseSelectStateChangeTypes.MenuKeyDownEnter
    MenuKeyDownCharacter: UseSelectStateChangeTypes.MenuKeyDownCharacter
    MenuBlur: UseSelectStateChangeTypes.MenuBlur
    MenuMouseLeave: UseSelectStateChangeTypes.MenuMouseLeave
    ItemMouseMove: UseSelectStateChangeTypes.ItemMouseMove
    ItemClick: UseSelectStateChangeTypes.ItemClick
    ToggleButtonKeyDownCharacter: UseSelectStateChangeTypes.ToggleButtonKeyDownCharacter
    ToggleButtonKeyDownArrowDown: UseSelectStateChangeTypes.ToggleButtonKeyDownArrowDown
    ToggleButtonKeyDownArrowUp: UseSelectStateChangeTypes.ToggleButtonKeyDownArrowUp
    ToggleButtonClick: UseSelectStateChangeTypes.ToggleButtonClick
    FunctionToggleMenu: UseSelectStateChangeTypes.FunctionToggleMenu
    FunctionOpenMenu: UseSelectStateChangeTypes.FunctionOpenMenu
    FunctionCloseMenu: UseSelectStateChangeTypes.FunctionCloseMenu
    FunctionSetHighlightedIndex: UseSelectStateChangeTypes.FunctionSetHighlightedIndex
    FunctionSelectItem: UseSelectStateChangeTypes.FunctionSelectItem
    FunctionClearKeysSoFar: UseSelectStateChangeTypes.FunctionClearKeysSoFar
    FunctionReset: UseSelectStateChangeTypes.FunctionReset
  }
}

export const useSelect: UseSelectInterface

/* useCombobox Types */

export interface UseComboboxState<Item> {
  highlightedIndex: number
  selectedItem: Item
  isOpen: boolean
  inputValue: string
}

export enum UseComboboxStateChangeTypes {
  InputKeyDownArrowDown = '__input_keydown_arrow_down__',
  InputKeyDownArrowUp = '__input_keydown_arrow_up__',
  InputKeyDownEscape = '__input_keydown_escape__',
  InputKeyDownHome = '__input_keydown_home__',
  InputKeyDownEnd = '__input_keydown_end__',
  InputKeyDownEnter = '__input_keydown_enter__',
  InputChange = '__input_change__',
  InputBlur = '__input_blur__',
  MenuMouseLeave = '__menu_mouse_leave__',
  ItemMouseMove = '__item_mouse_move__',
  ItemClick = '__item_click__',
  ToggleButtonClick = '__togglebutton_click__',
  FunctionToggleMenu = '__function_toggle_menu__',
  FunctionOpenMenu = '__function_open_menu__',
  FunctionCloseMenu = '__function_close_menu__',
  FunctionSetHighlightedIndex = '__function_set_highlighted_index__',
  FunctionSelectItem = '__function_select_item__',
  FunctionSetInputValue = '__function_set_input_value__',
  FunctionReset = '__function_reset__',
}

export interface UseComboboxProps<Item> {
  items: Item[]
  itemToString?: (item: Item) => string
  getA11yStatusMessage?: (
    options: UseComboboxA11yMessageOptions<Item>,
  ) => string
  getA11ySelectionMessage?: (
    options: UseComboboxA11yMessageOptions<Item>,
  ) => string
  circularNavigation?: boolean
  highlightedIndex?: number
  initialHighlightedIndex?: number
  defaultHighlightedIndex?: number
  isOpen?: boolean
  initialIsOpen?: boolean
  defaultIsOpen?: boolean
  selectedItem?: Item
  initialSelectedItem?: Item
  defaultSelectedItem?: Item
  inputValue?: string
  initialInputValue?: string
  defaultInputValue?: string
  id?: string
  labelId?: string
  menuId?: string
  toggleButtonId?: string
  inputId?: string
  getItemId?: (index: number) => string
  stateReducer?: (
    state: UseComboboxState<Item>,
    actionAndChanges: UseComboboxStateChangeOptions<Item>,
  ) => UseComboboxState<Item>
  onSelectedItemChange?: (changes: Partial<UseComboboxState<Item>>) => void
  onIsOpenChange?: (changes: Partial<UseComboboxState<Item>>) => void
  onHighlightedIndexChange?: (changes: Partial<UseComboboxState<Item>>) => void
  onStateChange?: (changes: Partial<UseComboboxState<Item>>) => void
  onInputValueChange?: (changes: Partial<UseComboboxState<Item>>) => void
  environment?: Environment
}

export interface UseComboboxA11yMessageOptions<Item> {
  isOpen: boolean
  selectedItem: Item
  items: Item[]
  itemToString: (item: Item) => string
  inputValue: string
}

export interface UseComboboxStateChangeOptions<Item> {
  type: UseComboboxStateChangeTypes
  changes: UseComboboxState<Item>
  props: UseComboboxProps<Item>
}

export interface UseComboboxGetMenuPropsOptions
  extends GetPropsWithRefKey,
    GetMenuPropsOptions {}

export interface UseComboboxGetToggleButtonPropsOptions
  extends GetPropsWithRefKey,
    GetToggleButtonPropsOptions {}

export interface UseComboboxGetLabelPropsOptions extends GetLabelPropsOptions {}

export interface UseComboboxGetItemPropsOptions<Item>
  extends GetItemPropsOptions<Item>,
    GetPropsWithRefKey {}

export interface UseComboboxGetInputPropsOptions
  extends GetInputPropsOptions,
    GetPropsWithRefKey {}

export interface UseComboboxGetComboboxPropsOptions
  extends React.HTMLProps<HTMLLabelElement> {}

export interface UseComboboxPropGetters<Item> {
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions,
  ) => any
  getLabelProps: (options?: UseComboboxGetLabelPropsOptions) => any
  getMenuProps: (options?: UseComboboxGetMenuPropsOptions) => any
  getItemProps: (options: UseComboboxGetItemPropsOptions<Item>) => any
  getInputProps: (options: UseComboboxGetInputPropsOptions) => any
  getComboboxProps: (options: UseComboboxGetComboboxPropsOptions) => any
}

export interface UseComboboxActions<Item> {
  reset: () => void
  openMenu: () => void
  closeMenu: () => void
  toggleMenu: () => void
  selectItem: (item: Item) => void
  setHighlightedIndex: (index: number) => void
  setInputValue: (inputValue: string) => void
}

export type UseComboboxReturnValue<Item> = UseComboboxState<Item> &
  UseComboboxPropGetters<Item> &
  UseComboboxActions<Item>

export interface UseComboboxInterface {
  <Item>(props: UseComboboxProps<Item>): UseComboboxReturnValue<Item>
  stateChangeTypes: {
    InputKeyDownArrowDown: UseComboboxStateChangeTypes.InputKeyDownArrowDown
    InputKeyDownArrowUp: UseComboboxStateChangeTypes.InputKeyDownArrowUp
    InputKeyDownEscape: UseComboboxStateChangeTypes.InputKeyDownEscape
    InputKeyDownHome: UseComboboxStateChangeTypes.InputKeyDownHome
    InputKeyDownEnd: UseComboboxStateChangeTypes.InputKeyDownEnd
    InputKeyDownEnter: UseComboboxStateChangeTypes.InputKeyDownEnter
    InputChange: UseComboboxStateChangeTypes.InputChange
    InputBlur: UseComboboxStateChangeTypes.InputBlur
    MenuMouseLeave: UseComboboxStateChangeTypes.MenuMouseLeave
    ItemMouseMove: UseComboboxStateChangeTypes.ItemMouseMove
    ItemClick: UseComboboxStateChangeTypes.ItemClick
    ToggleButtonClick: UseComboboxStateChangeTypes.ToggleButtonClick
    FunctionToggleMenu: UseComboboxStateChangeTypes.FunctionToggleMenu
    FunctionOpenMenu: UseComboboxStateChangeTypes.FunctionOpenMenu
    FunctionCloseMenu: UseComboboxStateChangeTypes.FunctionCloseMenu
    FunctionSetHighlightedIndex: UseComboboxStateChangeTypes.FunctionSetHighlightedIndex
    FunctionSelectItem: UseComboboxStateChangeTypes.FunctionSelectItem
    FunctionSetInputValue: UseComboboxStateChangeTypes.FunctionSetInputValue
    FunctionReset: UseComboboxStateChangeTypes.FunctionReset
  }
}

export const useCombobox: UseComboboxInterface
