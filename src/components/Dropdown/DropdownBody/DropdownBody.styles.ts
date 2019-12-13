import {createUseStyles} from "react-jss";
import {IDropdownBodyProps} from "./DropdownBody";

const dropdownBodyStyles = createUseStyles({
    wrapper: {
      backgroundColor: '#ECF0F2',
      borderRadius: 4,
      boxShadow: '0 2px 5px 0 rgba(146,166,176,0.50)',
    },

    contentWrapper: {
      overflowX: 'hidden',
      overflowY: 'scroll',
      maxHeight: 'calc(100vh - 300px)',
      position: 'relative',
      height: (props: IDropdownBodyProps) => {
        const rows = props.rows && props.rows > 5 ? props.rows : 5;
        return rows * 36 + 30;
      },
    },
});

export default dropdownBodyStyles;
