import XDate from 'xdate';
import React, { useRef, useMemo, useCallback } from 'react';
import { View } from 'react-native';
// import isEqual from 'lodash/isEqual';

import { getPartialWeekDates, getWeekDates, sameMonth } from '../dateutils';
import { parseDate, toMarkingFormat } from '../interface';
import { getState } from '../day-state-manager';
import { extractDayProps } from '../componentUpdater';
import styleConstructor from './style';
import { CalendarProps } from '../calendar';
import Day from '../calendar/day/index';
// import {CalendarContextProps} from './Context';

export type WeekProps = CalendarProps & {
  // context?: CalendarContextProps;
};

const Week = (props: WeekProps) => {
  const {
    theme,
    current,
    firstDay,
    hideExtraDays,
    markedDates,
    onDayPress,
    style: propsStyle,
    numberOfDays = 1,
    testID,
  } = props;
  const style = useRef(styleConstructor(theme));

  const getWeek = useCallback(
    (date?: string) => {
      if (date) {
        return getWeekDates(date, firstDay);
      }
    },
    [firstDay]
  );

  const dayProps = extractDayProps(props);
  const currXdate = useMemo(() => parseDate(current), [current]);

  const renderDay = (day: XDate, id: number) => {
    // hide extra days
    if (current && hideExtraDays) {
      if (!sameMonth(day, currXdate)) {
        return <View key={id} style={style.current.emptyDayContainer} />;
      }
    }
    const dayString = toMarkingFormat(day);
    return (
      <View style={style.current.dayContainer} key={id}>
        <Day
          {...dayProps}
          date={dayString}
          state={getState(day, currXdate, props)}
          marking={markedDates?.[dayString]}
          onPress={onDayPress}
        />
      </View>
    );
  };

  const renderWeek = () => {
    const dates =
      numberOfDays > 1 ? getPartialWeekDates(current, numberOfDays) : getWeek(current);
    const week: JSX.Element[] = [];

    if (dates) {
      const todayIndex = dates?.indexOf(parseDate(new Date())) || -1;
      const sliced = dates.slice(todayIndex, numberOfDays);
      const datesToRender = numberOfDays > 1 && todayIndex > -1 ? sliced : dates;
      datesToRender.forEach((day: XDate | string, id: number) => {
        const d = day instanceof XDate ? day : new XDate(day);
        week.push(renderDay(d, id));
      }, this);
    }

    return week;
  };

  return (
    <View style={style.current.container} testID={`${testID}.week_${current}`}>
      <View style={[style.current.week, undefined, propsStyle]}>{renderWeek()}</View>
    </View>
  );
};

export default Week;

Week.displayName = 'Week';
