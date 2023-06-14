/// <reference types="react" />
import { CalendarProps } from '../calendar';
import { CalendarContextProps } from './Context';
export type WeekProps = CalendarProps & {
    context?: CalendarContextProps;
};
declare const Week: {
    (props: WeekProps): import("react").JSX.Element;
    displayName: string;
};
export default Week;
