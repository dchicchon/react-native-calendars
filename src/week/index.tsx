// import XDate from 'xdate';

// import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
// import { FlatList, View, ViewToken } from 'react-native';

// import { sameWeek, onSameDateRange, getWeekDates } from '../dateutils';
// import { toMarkingFormat } from '../interface';
// import { DateData, MarkedDates } from '../types';
// import styleConstructor from './style';
import { CalendarListProps } from '../calendar-list';
// import WeekDaysNames from '../commons/WeekDaysNames';
export interface WeekCalendarProps extends CalendarListProps {
  /** whether to have shadow/elevation for the calendar */
  allowShadow?: boolean;
}