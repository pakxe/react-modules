import { useState } from 'react';
import {
  isNotNumber,
  isValidNumberLength,
  isValidNumberRange,
  validateExpiredDate,
} from '../utils/validation';
import type { EXPIRED_TYPE } from '../utils/validation.type';

const ERROR_MESSAGES = {
  NOT_NUMBER: '숫자를 입력해주세요.',
  INVALID_MONTH: '유효하지 않은 달입니다.',
  INVALID_YEAR: '유효하지 않은 년도입니다.',
  EXPIRED_DATE: '이미 만료된 카드입니다.',
};

type Date<T> = {
  month: T;
  year: T;
};

const VALID_DATE_LENGTH = 2;

const useCardExpirationDate = () => {
  const [date, setDate] = useState<Date<string>>({ month: '', year: '' });
  const [isValid, setIsValid] = useState<Date<boolean>>({ month: false, year: false });
  const [errorMessages, setErrorMessages] = useState<Date<string>>({ month: '', year: '' });

  const getMonthErrorMessage = (month: string, isExpiredDate: EXPIRED_TYPE) => {
    if (isNotNumber(month)) return ERROR_MESSAGES.NOT_NUMBER;

    if (isValidNumberLength(month, VALID_DATE_LENGTH)) return ERROR_MESSAGES.INVALID_MONTH;

    if (isValidNumberRange(Number(month), 1, 12)) return ERROR_MESSAGES.INVALID_MONTH;

    if (isExpiredDate === 'INVALID_MONTH') return ERROR_MESSAGES.EXPIRED_DATE;

    return '';
  };

  const getYearErrorMessage = (year: string, isExpiredDate: EXPIRED_TYPE) => {
    if (isNotNumber(year)) return ERROR_MESSAGES.NOT_NUMBER;

    if (isValidNumberLength(year, VALID_DATE_LENGTH)) return ERROR_MESSAGES.INVALID_YEAR;

    if (isExpiredDate === 'INVALID_YEAR') return ERROR_MESSAGES.EXPIRED_DATE;

    return '';
  };

  const checkValidDate = ({ month = date.month, year = date.year }) => {
    const isExpiredDate = validateExpiredDate(month, year);

    const monthErrorMessage = getMonthErrorMessage(month, isExpiredDate);
    const yearErrorMessage = getYearErrorMessage(year, isExpiredDate);

    setErrorMessages({ month: monthErrorMessage, year: yearErrorMessage });
    setIsValid({ month: !monthErrorMessage, year: !yearErrorMessage });
  };

  const formatMonth = (month: string) => {
    if (isValidNumberRange(Number(month), 2, 9)) return month.padStart(2, '0');

    return month;
  };

  const handleMonthChange = (month: string) => {
    if (!isNotNumber(month)) setDate({ ...date, month: formatMonth(month) });

    checkValidDate({ month });
  };

  const handleYearChange = (year: string) => {
    if (!isNotNumber(year)) setDate({ ...date, year });

    checkValidDate({ year });
  };

  return {
    month: date.month,
    year: date.year,
    handleMonthChange,
    handleYearChange,
    monthErrorMessages: errorMessages.month,
    yearErrorMessages: errorMessages.year,
    isValidMonth: isValid.month,
    isValidYear: isValid.year,
  };
};

export default useCardExpirationDate;
