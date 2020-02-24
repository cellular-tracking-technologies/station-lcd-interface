// Import Statements
import {Scroller, findById as findMenuItem} from './menu';
import {display} from "./display";

class Manager {
    constructor(menu) {
        this.menu = menu;
        this.focus = menu;
        this.scroller = new Scroller();
    }
    init() {
        this.scroller.init(this.focus.childrenNames());
        this.update_();
    }
    up() {
        this.scroller.up();
        this.update_();
    }
    down() {
        this.scroller.down();
        this.update_();
    }
    select() {
        /*
        User enters custom view from custom view.
        Potential Behaviors:
            A) Nothing Happens
            B) Update Values in Custom View
            C) Perform some task for each push of select
        */
        if (this.focus.childCount() == 0) {
            if (typeof this.focus.view === "function") {
                this.focus.view();
                return;
            }
        }

        // Launch a custom view by way of submenu transition.
        let row = this.focus.getChild(this.scroller.getSelectedRow())
        if (typeof row.view === "function") {
            this.focus = row;
            row.view();
            return;
        }

        // User Enters a sub menu
        if (row.childCount() > 0) {
            this.scroller.init(row.childrenNames());
            this.focus = row;
        }
        this.update_();
    }
    back() {
        if(this.focus.parent_id != null){
            this.focus = findMenuItem(this.menu, this.focus.parent_id);
            this.scroller.init(this.focus.childrenNames())
        }
        this.update_();
    }
    update_() {
        let rows = this.scroller.getRows();
        let selected_row = this.scroller.getSelectedRow();
    
        let formatted = []
        rows.forEach(element => {
            if(selected_row == element){
                formatted.push(`> ${element}`);
            }else{
                formatted.push(`  ${element}`);
            }
        });

        display.write(formatted);
    }
}

export {Manager};
