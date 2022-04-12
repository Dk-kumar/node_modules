export interface TabsUnstyledClasses {
    root: string;
    horizontal: string;
    vertical: string;
}
export declare type TabsUnstyledClassKey = keyof TabsUnstyledClasses;
export declare function getTabsUnstyledUtilityClass(slot: string): string;
declare const tabsUnstyledClasses: TabsUnstyledClasses;
export default tabsUnstyledClasses;
