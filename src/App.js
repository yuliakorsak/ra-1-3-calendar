import './App.css';
import { Component } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class Day extends Component {
  /* 
    Props: 
      day - число, Number
      otherMonth - день другого месяца, Boolean
      today - сегодняшний день, Boolean
  */
  render() {
    if (this.props.otherMonth) {
      return (
        <td className="ui-datepicker-other-month">{this.props.day}</td >
      );
    }
    if (this.props.today) {
      return (
        <td className="ui-datepicker-today">{this.props.day}</td>
      );
    }
    return (
      <td>{this.props.day}</td >
    );
  }
}

class Week extends Component {
  /* 
    Props: 
      from - первое число недели, Moment
      to - последнее число недели, Moment
      today - сегодняшний день, Moment
  */
  render() {
    const components = [];
    const today = this.props.today.date();
    const from = this.props.from;
    const to = this.props.to;
    const startOfMonth = moment(this.props.today).startOf('month');
    const endOfMonth = moment(this.props.today).endOf('month');

    const dayToAdd = moment(from);
    while (dayToAdd.isBefore(to)) {
      if (dayToAdd.isBetween(startOfMonth, endOfMonth, undefined, '[]')) {
        if (today === dayToAdd.date()) {
          components.push(<Day day={dayToAdd.date().toString()} today />);
        }
        else {
          components.push(<Day day={dayToAdd.date().toString()} />);
        }
      }
      else {
        components.push(<Day day={dayToAdd.date().toString()} otherMonth />);
      }
      dayToAdd.add(1, 'day');
    }

    return (
      <tr>
        {components}
      </tr>
    );
  }
}

class Month extends Component {
  /*
    Props:
      mDate - сегодняшнее число, Moment
  */
  render() {
    const { mDate } = this.props;
    const first = moment(mDate).startOf('month').startOf('week');
    const last = moment(first).endOf('week');
    const endOfMonth = moment(mDate).endOf('month');
    const weeks = [];

    while (first.isBefore(endOfMonth)) {
      weeks.push(<Week from={moment(first)} to={moment(last)} today={mDate} />);
      first.add(1, 'week');
      last.add(1, 'week');
    }

    return (
      <tbody>
        {weeks}
      </tbody>
    );
  }
}

class Calendar extends Component {
  /*
    Props:
      date - сегодняшнее число, Date
  */
  render() {
    const { date } = this.props;
    const mDate = moment(date);
    const weekday = capitalize(mDate.format('dddd'));
    const day = mDate.date();
    const ofMonth = mDate.format('D MMMM').split(' ')[1];
    const month = capitalize(mDate.format('MMMM'));
    const year = mDate.year();

    return (
      <div className="ui-datepicker">
        <div className="ui-datepicker-material-header">
          <div className="ui-datepicker-material-day">{weekday}</div>
          <div className="ui-datepicker-material-date">
            <div className="ui-datepicker-material-day-num">{day}</div>
            <div className="ui-datepicker-material-month">{ofMonth}</div>
            <div className="ui-datepicker-material-year">{year}</div>
          </div>
        </div>
        <div className="ui-datepicker-header">
          <div className="ui-datepicker-title">
            <span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
          </div>
        </div>
        <table className="ui-datepicker-calendar">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
            <col className="ui-datepicker-week-end" />
            <col className="ui-datepicker-week-end" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" title="Понедельник">Пн</th>
              <th scope="col" title="Вторник">Вт</th>
              <th scope="col" title="Среда">Ср</th>
              <th scope="col" title="Четверг">Чт</th>
              <th scope="col" title="Пятница">Пт</th>
              <th scope="col" title="Суббота">Сб</th>
              <th scope="col" title="Воскресенье">Вс</th>
            </tr>
          </thead>
          <Month mDate={mDate} />
        </table>
      </div>
    );
  }
}

const now = new Date();

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
