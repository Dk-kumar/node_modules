import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["autoFocus", "children", "className", "component", "components", "componentsProps", "defaultValue", "defaultListboxOpen", "disabled", "listboxOpen", "onChange", "onListboxOpenChange", "renderValue", "value"];
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useForkRef as useForkRef, unstable_useControlled as useControlled } from '@mui/utils';
import { flattenOptionGroups, getOptionsFromChildren } from './utils';
import useSelect from './useSelect';
import { appendOwnerState } from '../utils';
import PopperUnstyled from '../PopperUnstyled';
import { SelectUnstyledContext } from './SelectUnstyledContext';
import composeClasses from '../composeClasses';
import { getSelectUnstyledUtilityClass } from './selectUnstyledClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

function defaultRenderSingleValue(selectedOption) {
  var _selectedOption$label;

  return (_selectedOption$label = selectedOption == null ? void 0 : selectedOption.label) != null ? _selectedOption$label : '';
}

function useUtilityClasses(ownerState) {
  const {
    active,
    disabled,
    open,
    focusVisible
  } = ownerState;
  const slots = {
    root: ['root', disabled && 'disabled', focusVisible && 'focusVisible', active && 'active', open && 'expanded'],
    listbox: ['listbox', disabled && 'disabled'],
    popper: ['popper']
  };
  return composeClasses(slots, getSelectUnstyledUtilityClass, {});
}
/**
 * The foundation for building custom-styled select components.
 */


const SelectUnstyled = /*#__PURE__*/React.forwardRef(function SelectUnstyled(props, ref) {
  var _ref, _components$Listbox, _components$Popper, _componentsProps$list, _componentsProps$list2, _componentsProps$root, _componentsProps$list3, _componentsProps$popp;

  const {
    autoFocus,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    defaultListboxOpen = false,
    disabled: disabledProp,
    listboxOpen: listboxOpenProp,
    onChange,
    onListboxOpenChange,
    renderValue: renderValueProp,
    value: valueProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, _excluded);

  const renderValue = renderValueProp != null ? renderValueProp : defaultRenderSingleValue;
  const [groupedOptions, setGroupedOptions] = React.useState([]);
  const options = React.useMemo(() => flattenOptionGroups(groupedOptions), [groupedOptions]);
  const [listboxOpen, setListboxOpen] = useControlled({
    controlled: listboxOpenProp,
    default: defaultListboxOpen,
    name: 'SelectUnstyled',
    state: 'listboxOpen'
  });
  React.useEffect(() => {
    setGroupedOptions(getOptionsFromChildren(children));
  }, [children]);
  const [buttonDefined, setButtonDefined] = React.useState(false);
  const buttonRef = React.useRef(null);
  const listboxRef = React.useRef(null);
  const Button = (_ref = component != null ? component : components.Root) != null ? _ref : 'button';
  const ListboxRoot = (_components$Listbox = components.Listbox) != null ? _components$Listbox : 'ul';
  const Popper = (_components$Popper = components.Popper) != null ? _components$Popper : PopperUnstyled;

  const handleButtonRefChange = element => {
    buttonRef.current = element;

    if (element != null) {
      setButtonDefined(true);
    }
  };

  const handleButtonRef = useForkRef(ref, handleButtonRefChange);
  const handleListboxRef = useForkRef(listboxRef, (_componentsProps$list = componentsProps.listbox) == null ? void 0 : _componentsProps$list.ref);
  React.useEffect(() => {
    if (autoFocus) {
      buttonRef.current.focus();
    }
  }, [autoFocus]);

  const handleOpenChange = isOpen => {
    setListboxOpen(isOpen);
    onListboxOpenChange == null ? void 0 : onListboxOpenChange(isOpen);
  };

  const {
    buttonActive,
    buttonFocusVisible,
    disabled,
    getButtonProps,
    getListboxProps,
    getOptionProps,
    getOptionState,
    value
  } = useSelect({
    buttonComponent: Button,
    buttonRef: handleButtonRef,
    defaultValue,
    disabled: disabledProp,
    listboxId: (_componentsProps$list2 = componentsProps.listbox) == null ? void 0 : _componentsProps$list2.id,
    listboxRef: handleListboxRef,
    multiple: false,
    onChange,
    onOpenChange: handleOpenChange,
    open: listboxOpen,
    options,
    value: valueProp
  });

  const ownerState = _extends({}, props, {
    active: buttonActive,
    defaultListboxOpen,
    disabled,
    focusVisible: buttonFocusVisible,
    open: listboxOpen,
    renderValue,
    value
  });

  const classes = useUtilityClasses(ownerState);
  const selectedOptions = React.useMemo(() => {
    return options.find(o => value === o.value);
  }, [options, value]);
  const buttonProps = appendOwnerState(Button, _extends({}, getButtonProps(), other, componentsProps.root, {
    className: clsx(className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className, classes.root)
  }), ownerState);
  const listboxProps = appendOwnerState(ListboxRoot, _extends({}, getListboxProps(), componentsProps.listbox, {
    className: clsx((_componentsProps$list3 = componentsProps.listbox) == null ? void 0 : _componentsProps$list3.className, classes.listbox)
  }), ownerState); // Popper must be a (non-host) component, therefore ownerState will be present within the props

  const popperProps = appendOwnerState(Popper, _extends({
    open: listboxOpen,
    anchorEl: buttonRef.current,
    placement: 'bottom-start',
    disablePortal: true,
    role: undefined
  }, componentsProps.popper, {
    className: clsx((_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className, classes.popper)
  }), ownerState);
  const context = {
    getOptionProps,
    getOptionState,
    listboxRef
  };
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx(Button, _extends({}, buttonProps, {
      children: renderValue(selectedOptions)
    })), buttonDefined && /*#__PURE__*/_jsx(Popper, _extends({}, popperProps, {
      children: /*#__PURE__*/_jsx(ListboxRoot, _extends({}, listboxProps, {
        children: /*#__PURE__*/_jsx(SelectUnstyledContext.Provider, {
          value: context,
          children: children
        })
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" ? SelectUnstyled.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the select element is focused during the first mount
   * @default false
   */
  autoFocus: PropTypes.bool,

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   */
  component: PropTypes.elementType,

  /**
   * The components used for each slot inside the Select.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: PropTypes
  /* @typescript-to-proptypes-ignore */
  .shape({
    Listbox: PropTypes.elementType,
    Popper: PropTypes.elementType,
    Root: PropTypes.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: PropTypes.shape({
    listbox: PropTypes.object,
    popper: PropTypes.object,
    root: PropTypes.object
  }),

  /**
   * If `true`, the select will be initially open.
   * @default false
   */
  defaultListboxOpen: PropTypes.bool,

  /**
   * The default selected value. Use when the component is not controlled.
   */
  defaultValue: PropTypes
  /* @typescript-to-proptypes-ignore */
  .any,

  /**
   * If `true`, the select is disabled.
   * @default false
   */
  disabled: PropTypes.bool,

  /**
   * Controls the open state of the select's listbox.
   * @default undefined
   */
  listboxOpen: PropTypes.bool,

  /**
   * Callback fired when an option is selected.
   */
  onChange: PropTypes.func,

  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see listboxOpen).
   */
  onListboxOpenChange: PropTypes.func,

  /**
   * Function that customizes the rendering of the selected value.
   */
  renderValue: PropTypes.func,

  /**
   * The selected value.
   * Set to `null` to deselect all options.
   */
  value: PropTypes
  /* @typescript-to-proptypes-ignore */
  .any
} : void 0;
/**
 * The foundation for building custom-styled select components.
 *
 * Demos:
 *
 * - [Select](https://mui.com/base/react-select/)
 *
 * API:
 *
 * - [SelectUnstyled API](https://mui.com/base/api/select-unstyled/)
 */

export default SelectUnstyled;