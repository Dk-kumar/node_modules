import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getCircularProgressUtilityClass(slot) {
  return generateUtilityClass('MuiCircularProgress', slot);
}
var circularProgressClasses = generateUtilityClasses('MuiCircularProgress', ['root', 'determinate', 'indeterminate', 'colorPrimary', 'colorSecondary', 'svg', 'circle', 'circleDeterminate', 'circleIndeterminate', 'circleDisableShrink']);
export default circularProgressClasses;