import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import XDate from 'xdate';
import InfiniteList from '../infinite-list';
import Week from './week';
import WeekDaysNames from '../commons/WeekDaysNames';
import { CalendarListProps } from '../calendar-list';
// import CalendarContext from './Context';
import styleConstructor from './style';
import { toMarkingFormat } from '../interface';
import { extractCalendarProps } from '../componentUpdater';
import constants from '../commons/constants';
import { UpdateSources } from './commons';
import { sameWeek } from '../dateutils';
import { DateData } from '../types';

export interface WeekCalendarProps extends CalendarListProps {
  /** whether to have shadow/elevation for the calendar */
  allowShadow?: boolean;
  onPageChange: Function;
  updateSource: string;
}

const NUMBER_OF_PAGES = 25;
const DEFAULT_PAGE_HEIGHT = 48;

const WeekCalendar = (props: WeekCalendarProps) => {
  const {
    current,
    firstDay = 0,
    markedDates,
    allowShadow = true,
    // hideDayNames,
    theme,
    // calendarWidth,
    calendarHeight = DEFAULT_PAGE_HEIGHT,
    // testID,
    updateSource,
  } = props;
  // const context = useContext(CalendarContext);
  // const { updateSource } = context;
  const style = useRef(styleConstructor(theme));
  const list = useRef();
  const [items, setItems] = useState(getDatesArray(current, firstDay, NUMBER_OF_PAGES));

  const extraData = {
    current,
    date: current,
    firstDay,
  };

  const containerWidth = constants.screenWidth;
  const weekStyle = useMemo(() => {
    return [{ width: containerWidth }, props.style];
  }, [containerWidth, props.style]);

  useEffect(() => {
    // maybe we can change this specifically? Any other alternative?
    // i just dont wanna deal with context sortof
    if (updateSource !== UpdateSources.WEEK_SCROLL) {
      const pageIndex = items.findIndex((item) => sameWeek(item, current, firstDay));
      // @ts-expect-error
      list.current?.scrollToOffset?.(pageIndex * containerWidth, 0, false);
    }
  }, [current]);

  const onDayPress = useCallback(
    (dateData: DateData) => {
      props.onDayPress?.(dateData);
    },
    [props.onDayPress]
  );

  const onPageChange = useCallback(
    (pageIndex: number, _prevPage, { scrolledByUser }) => {
      if (scrolledByUser) {
        props.onPageChange?.(items[pageIndex]);
        // we should set date here?
      }
    },
    [items]
  );

  const reloadPages = useCallback(
    (pageIndex) => {
      const date = items[pageIndex];
      setItems(getDatesArray(date, firstDay, NUMBER_OF_PAGES));
    },
    [items]
  );

  const renderItem = useCallback(
    (_type: any, item: string) => {
      const { allowShadow, ...calendarListProps } = props;
      const { /* style,  */ ...others } = extractCalendarProps(calendarListProps);

      const isSameWeek = sameWeek(item, current, firstDay);

      return (
        <Week
          {...others}
          key={item}
          current={isSameWeek ? current : item}
          firstDay={firstDay}
          style={weekStyle}
          markedDates={markedDates}
          onDayPress={onDayPress}
        />
      );
    },
    [current, markedDates]
  );

  return (
    <View
      // testID={testID}
      style={[
        allowShadow && style.current.containerShadow,
        style.current.containerWrapper,
      ]}
    >
      {
        <View style={[style.current.week, style.current.weekCalendar]}>
          <WeekDaysNames firstDay={firstDay} style={style.current.dayHeader} />
        </View>
      }
      <View>
        <InfiniteList
          key="week-list"
          isHorizontal
          ref={list}
          data={items}
          renderItem={renderItem}
          reloadPages={reloadPages}
          onReachNearEdgeThreshold={Math.round(NUMBER_OF_PAGES * 0.4)}
          extendedState={extraData}
          style={style.current.container}
          initialPageIndex={NUMBER_OF_PAGES}
          pageHeight={calendarHeight}
          pageWidth={containerWidth}
          onPageChange={onPageChange}
          scrollViewProps={{
            showsHorizontalScrollIndicator: false,
          }}
        />
      </View>
    </View>
  );
};

export default WeekCalendar;

// function getDate({current, context, firstDay = 0}: WeekCalendarProps, weekIndex: number) {
function getDate(date: string, firstDay: number, weekIndex: number) {
  // const d = new XDate(current || context.date);
  const d = new XDate(date);
  // get the first day of the week as date (for the on scroll mark)
  let dayOfTheWeek = d.getDay();
  if (dayOfTheWeek < firstDay && firstDay > 0) {
    dayOfTheWeek = 7 + dayOfTheWeek;
  }

  // leave the current date in the visible week as is
  const dd = weekIndex === 0 ? d : d.addDays(firstDay - dayOfTheWeek);
  const newDate = dd.addWeeks(weekIndex);
  return toMarkingFormat(newDate);
}

// function getDatesArray(args: WeekCalendarProps, numberOfPages = NUMBER_OF_PAGES) => {
function getDatesArray(date: any, firstDay: number, numberOfPages = NUMBER_OF_PAGES) {
  const array = [];
  for (let index = -numberOfPages; index <= numberOfPages; index++) {
    const d = getDate(date, firstDay, index);
    array.push(d);
  }
  return array;
}
