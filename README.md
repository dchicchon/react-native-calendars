[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-direct.svg)](https://stand-with-ukraine.pp.ua)

# React Native Calendars 🗓️ 📆

This is a forked dependency of [react-native-calendars](https://github.com/wix/react-native-calendars). The purpose of this project is to significantly reduce the size of the dependency in hopes that it will run faster.

Changes
- replaced lodash with vanilla javascript
- removed Expandable Calendar, AgendaList, and Timeline components
- Added WeekCalendar view that is the equivalent of the previous ExpandableCalendars WeekCalendar. I removed the context calls in the WeekCalendar in favor of providing my own context values and listeners through the `current` and `updateSource` props.
