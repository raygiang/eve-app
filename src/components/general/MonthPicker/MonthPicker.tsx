import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SelectedMonth, FilterFunction } from '../../models/models';
import { debounce } from 'lodash';
import Picker from 'react-month-picker';
import 'react-month-picker/css/month-picker.css';
import './MonthPicker.scss';

interface MonthPickerProps {
  filterFunction: FilterFunction,
}

const MonthPicker = ({ filterFunction }: MonthPickerProps): JSX.Element => {
  const today = new Date();
  const monthPickerLang = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  }
  const [selectedMonth, setSelectedMonth] = useState<SelectedMonth>({ year: today.getFullYear(), month: today.getMonth() + 1 });
  const monthPicker = useRef<any>();

  const getDisplayValue = (): string => {
    return `${monthPickerLang.months[selectedMonth.month - 1]}, ${selectedMonth.year}`;
  }

  const debounceFilter = useRef(
    debounce((startDate: Date, endDate: Date): void => {
      filterFunction({ startDate, endDate });
    }, 500, { leading: true })
  );

  const filterResults = useCallback((): void => {
    const startDate = new Date(selectedMonth.year, selectedMonth.month - 1, 1);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 1);
    debounceFilter.current(startDate, endDate);
  }, [selectedMonth.year, selectedMonth.month]);

  useEffect(() => {
    filterResults();
  }, [filterResults]);

  return (
    <div className="month-selector">
      <Picker
        className="month-selector__input-container"
        ref={monthPicker}
        value={selectedMonth}
        years={10}
        lang={monthPickerLang}
        onDismiss={(value: SelectedMonth) => setSelectedMonth(value)}
      >
        <input readOnly type="text" value={getDisplayValue()} onClick={() => monthPicker.current.show()} />
      </Picker>
      <button className="month-selector__select-button" onClick={() => monthPicker.current.show()}>
        Select Month
      </button>
    </div>
  )
}

export default MonthPicker;
