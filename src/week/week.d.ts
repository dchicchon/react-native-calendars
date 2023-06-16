import React from 'react';
import { CalendarProps } from '../calendar';
export type WeekProps = CalendarProps & {};
declare const Week: {
    (props: WeekProps): React.JSX.Element;
    displayName: string;
};
export default Week;
