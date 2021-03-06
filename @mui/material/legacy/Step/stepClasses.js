import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getStepUtilityClass(slot) {
  return generateUtilityClass('MuiStep', slot);
}
var stepClasses = generateUtilityClasses('MuiStep', ['root', 'horizontal', 'vertical', 'alternativeLabel', 'completed']);
export default stepClasses;