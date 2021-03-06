import { generateUtilityClass, generateUtilityClasses } from '@mui/base';
export function getAvatarGroupUtilityClass(slot) {
  return generateUtilityClass('MuiAvatarGroup', slot);
}
const avatarGroupClasses = generateUtilityClasses('MuiAvatarGroup', ['root', 'avatar']);
export default avatarGroupClasses;