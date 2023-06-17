// import omit from 'lodash/omit';
// import isEqual from 'lodash/isEqual';
// import some from 'lodash/some';
import XDate from 'xdate';
import React from 'react';

import {
  formatNumbers,
  // isToday
} from '../../dateutils';
// import { getDefaultLocale } from '../../services';
// import { xdateToData } from '../../interface';
import { omit, some, isEqual } from '../../utils';
import { DateData } from '../../types';
import BasicDay, { BasicDayProps } from './basic';
// import PeriodDay from './period';

function areEqual(prevProps: DayProps, nextProps: DayProps) {
  const prevPropsWithoutMarkDates = omit(prevProps, 'marking');
  const nextPropsWithoutMarkDates = omit(nextProps, 'marking');
  const didPropsChange = some(prevPropsWithoutMarkDates, function (value: any, key: any) {
    // @ts-expect-error
    return value !== nextPropsWithoutMarkDates[key];
  });
  const isMarkingEqual = isEqual(prevProps.marking, nextProps.marking);
  return !didPropsChange && isMarkingEqual;
}

export interface DayProps extends BasicDayProps {
  /** Provide custom day rendering component */
  dayComponent?: React.ComponentType<DayProps & { date?: DateData }>; // TODO: change 'date' prop type to string by removing it from overriding BasicDay's 'date' prop (breaking change for V2)
}

const Day = React.memo((props: DayProps) => {
  const {
    date,
    // marking
  } = props;
  const _date = date ? new XDate(date) : undefined;
  // const _isToday = isToday(_date);

  // const markingAccessibilityLabel = useMemo(() => {
  //   let label = '';

  //   if (marking) {
  //     if (marking.accessibilityLabel) {
  //       return marking.accessibilityLabel;
  //     }
  //     if (marking.selected) {
  //       label += 'selected ';
  //       if (!marking.marked) {
  //         label += 'You have no entries for this day ';
  //       }
  //     }
  //     if (marking.marked) {
  //       label += 'You have entries for this day ';
  //     }
  //   }
  //   return label;
  // }, [marking]);

  // const getAccessibilityLabel = useMemo(() => {
  //   const today = getDefaultLocale().today || 'today';
  //   const formatAccessibilityLabel =
  //     getDefaultLocale().formatAccessibilityLabel || 'dddd d MMMM yyyy';

  //   return `${_isToday ? today : ''} ${_date?.toString(
  //     formatAccessibilityLabel
  //   )} ${markingAccessibilityLabel}`;
  // }, [_date, marking, _isToday]);

  return (
    <BasicDay
      {...props}
      // accessibilityLabel={getAccessibilityLabel}
    >
      {formatNumbers(_date?.getDate())}
    </BasicDay>
  );
  // @ts-expect-error
}, areEqual) as any;

export default Day;

Day.displayName = 'Day';
