import generateUtilityClasses from '../generateUtilityClasses';
import generateUtilityClass from '../generateUtilityClass';
export function getBadgeUtilityClass(slot) {
  return generateUtilityClass('BaseBadge', slot);
}
var badgeUnstyledClasses = generateUtilityClasses('BaseBadge', ['root', 'badge', 'invisible']);
export default badgeUnstyledClasses;