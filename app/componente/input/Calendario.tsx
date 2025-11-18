//hace parte del listing page
'use client'

import { useState, useEffect } from 'react';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { es } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarioProps {
  value?: Range;
  disabledDates?: Date[];
  onChange: (value: Range) => void; // ✅ Cambiado a recibir Range directamente
}

export default function Calendario({
  value,
  disabledDates = [],
  onChange
}: CalendarioProps) {
  
  const defaultDate: Range = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  };

  const [date, setDate] = useState<Range>(value || defaultDate);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const handleChange = (value: RangeKeyDict) => {
    if (value.selection) {
      const newDate = value.selection;
      setDate(newDate);
      onChange(newDate); // ✅ Pasa el Range directamente
    }
  };

  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[date]}
      date={new Date()}
      onChange={handleChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={disabledDates}
      locale={es}
      fixedHeight={true}
      className="w-full border-none"
    />
  );
}