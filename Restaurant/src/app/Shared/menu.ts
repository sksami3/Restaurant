import { NbIconConfig } from '@nebular/theme/components/icon/icon.component';
import { Params } from '@angular/router';

// export class Menu {
//     id: string;
//     title: string;
//     icon: string;
//     link: string;
//     parent: boolean;
// }
export declare class NbMenuItem {
    /**
     * Item Title
     * @type {string}
     */
    title: string;
    /**
     * Item relative link (for routerLink)
     * @type {string}
     */
    link?: string;
    /**
     * Item URL (absolute)
     * @type {string}
     */
    url?: string;
    /**
     * Icon class name or icon config object
     * @type {string | NbIconConfig}
     */
    icon?: string | NbIconConfig;
    /**
     * Expanded by default
     * @type {boolean}
     */
    expanded?: boolean;
    /**
     * Children items
     * @type {List<NbMenuItem>}
     */
    children?: NbMenuItem[];
    /**
     * HTML Link target
     * @type {string}
     */
    target?: string;
    /**
     * Hidden Item
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * Item is selected when partly or fully equal to the current url
     * @type {string}
     */
    pathMatch?: 'full' | 'prefix';
    /**
     * Where this is a home item
     * @type {boolean}
     */
    home?: boolean;
    /**
     * Whether the item is just a group (non-clickable)
     * @type {boolean}
     */
    group?: boolean;
    /** Whether the item skipLocationChange is true or false
     *@type {boolean}
     */
    skipLocationChange?: boolean;
    /** Map of query parameters
     *@type {Params}
     */
    queryParams?: Params;
    parent?: NbMenuItem;
    selected?: boolean;
    data?: any;
    fragment?: string;
    /**
     * @returns item parents in top-down order
     */
    static getParents(item: NbMenuItem): NbMenuItem[];
    static isParent(item: NbMenuItem, possibleChild: NbMenuItem): boolean;
}