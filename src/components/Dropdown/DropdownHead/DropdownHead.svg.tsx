import React, {ReactElement} from "react";

export const chevron = (color: string = '#617E8D'): ReactElement => {
  return (
    <svg width="12px" height="8px" viewBox="0 0 12 8">
      <polygon fill={color} points="1.41 0 6 4.59 10.59 0 12 1.42 6 7.42 0 1.42"/>
    </svg>
  );
};
