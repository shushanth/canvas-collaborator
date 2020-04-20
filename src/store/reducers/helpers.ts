export const appendRemainingZeros = (valueToAppend: string, index: number) => {
  if (!Number(valueToAppend)) {
    return Array.from({ length: 16 }, () => 0).join('');
  }
  const valueLenToAppend = index - valueToAppend.length;
  return `${Array.from({ length: valueLenToAppend }, () => 0).join('')}${valueToAppend}`;
};
