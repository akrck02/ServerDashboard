import { MATERIAL_ICONS, getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";

export default class IconsPanel extends UIComponent {

    private static PANEL_ID = "icon-panel";
    private static PANEL_CONTENT = "panel-content";
    private static ICON_BOX = "icon-box";

    public constructor(){
        super({
            type: "div",
            classes: ["box-column"],
            id: IconsPanel.PANEL_ID,
        })

        this.draw();
    }

    public draw(){

        const title = new UIComponent({
            type: "h1",
            text: "Material Icons",
        });

        const panel = new UIComponent({
            type: "div",
            classes: ["box-row","box-warp"],
            id: IconsPanel.PANEL_CONTENT
        });
        
        for(const name in MATERIAL_ICONS) {


            const iconBox = new UIComponent({
                type: "div",
                classes: [IconsPanel.ICON_BOX, "box-column","box-x-center","box-y-center"],
            })
            const icon = getMaterialIcon(name, {
                size: "2rem",
                fill: "rgba(255,255,255,0.75)",
            });

            const label = new UIComponent({
                type: "span",
                classes: ["label"],
                text: name.replace(/_/g, " ")
            });

            iconBox.element.addEventListener("click", () => {
                console.log(name);
            });

            icon.appendTo(iconBox);
            label.appendTo(iconBox);
            iconBox.appendTo(panel);

        }

        title.appendTo(this);
        panel.appendTo(this);
    }

}