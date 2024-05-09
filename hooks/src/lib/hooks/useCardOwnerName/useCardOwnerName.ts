import { useState } from 'react';
import { unifySpaces, filterEnglishAndSpaces } from '../../utils/stringHelpers';

export const OWNER_NAME_ERROR_MESSAGES = {
  EXCESSIVE_WHITE_SPACE: '공백을 연속으로 입력할 수 없습니다.',
  NOT_ENG: '영어만 입력 가능합니다.',
  NAME_LENGTH: (maxLength: number) => `이름은 최대 ${maxLength}자까지 가능합니다.`,
};

const MAX_NAME_LENGTH = 21;

type useCardOwnerNameProps = {
  maxLength?: number;
  initialName?: string;
  needKeyTrigger?: boolean;
};

const useCardOwnerName = ({
  maxLength = MAX_NAME_LENGTH,
  initialName = '',
  needKeyTrigger = false,
}: useCardOwnerNameProps) => {
  const [ownerName, setOwnerName] = useState(initialName);
  const [isTriggered, setIsTriggered] = useState(false);
  const [isValidOwnerName, setIsValidOwnerName] = useState(false);
  const [ownerNameErrorMessage, setOwnerNameErrorMessage] = useState('');

  const makeValidOwnerName = (name: string) => {
    const engName = filterEnglishAndSpaces(name.toUpperCase());
    return unifySpaces(engName);
  };

  const getErrorMessage = (name: string) => {
    const engName = filterEnglishAndSpaces(name.toUpperCase());
    const unifiedSpaceName = unifySpaces(engName);
    const isExcessiveWhiteSpace = engName.length > unifiedSpaceName.length;

    if (isExcessiveWhiteSpace && unifiedSpaceName.length !== 0) return OWNER_NAME_ERROR_MESSAGES.EXCESSIVE_WHITE_SPACE;

    if (engName.length < name.length) return OWNER_NAME_ERROR_MESSAGES.NOT_ENG;

    if (unifiedSpaceName.length > maxLength) return OWNER_NAME_ERROR_MESSAGES.NAME_LENGTH(maxLength);

    return '';
  };

  const handleOwnerNameChange = (name: string) => {
    const validOwnerName = makeValidOwnerName(name);

    const errorMessage = getErrorMessage(name);
    setOwnerNameErrorMessage(errorMessage);

    if (validOwnerName.length > maxLength) return;

    setOwnerName(validOwnerName);

    if (needKeyTrigger) setIsValidOwnerName(validOwnerName.length <= maxLength && errorMessage === '' && isTriggered);
    else setIsValidOwnerName(validOwnerName.length <= maxLength && errorMessage === '');
  };

  return {
    ownerName,
    isValidOwnerName,
    ownerNameErrorMessage,
    handleOwnerNameChange,
    setIsTriggered,
  };
};

export default useCardOwnerName;
