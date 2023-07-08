import IconsPanel from "../../components/icons/IconsPanel.js";
import Select from "../../components/select/Select.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";

export default class EditorView extends ViewUI {

    private static VIEW_ID = "editor";
    private static FORM_ID = "form";

    public constructor(){
        super({
            type: "view",
            id: EditorView.VIEW_ID,
            classes: ["box-row","box-x-center"],
        });        
    }


    public show(params: string[], container: UIComponent): void {
        
        const form = new UIComponent({
            type: "div",
            classes: ["box-column","box-x-center"],
            id: EditorView.FORM_ID,
        });

        this.addTitle(form);
        this.addSerivceInput(form);
        this.addUrlControls(form);
        this.addIconSelection(form);
        this.addButtonBar(form);

        const panel = new IconsPanel();
        form.appendTo(this);
        panel.appendTo(this);
        
        this.appendTo(container);
    }

    public addTitle(form : UIComponent){
        const title = new UIComponent({
            type: "h1",
            text: "Let's add a new service"
        });

        title.appendTo(form);
    }

    public addSerivceInput(form : UIComponent){

        const ServiceNameLabel = new UIComponent({
            type: "label",
            text: "Service Name:",
            attributes: {
                for: "service-name",
            }
        });

        ServiceNameLabel.appendTo(form);

        const ServiceNameInput = new UIComponent({
            type: "input",
            id: "service-name",
            attributes: {
                type: "text",
                placeholder: "Service Name",
            }
        });

        ServiceNameInput.appendTo(form);

    }

    public addUrlControls(form : UIComponent){
        
        const rowBox = new UIComponent({
            type: "div",
            classes: ["box-row"],
            styles: {
                width: "100%",
            }
        });


        const urlLabel = new UIComponent({
            type: "label",
            text: "URL:", 
            attributes: {
                for: "url",
            }
        });

        urlLabel.appendTo(form);

        const select = new UIComponent({
            type: "select",
            classes: ["box-column"],
            attributes: {
                name: "method",
            },
        });

        const option1 = new UIComponent({
            type: "option",
            attributes: {
                value: "https",
            },
            text: "https://",
        });

        const option2 = new UIComponent({
            type: "option",
            attributes: {
                value: "http",
            },
            text: "http://",
        });

        option1.appendTo(select);
        option2.appendTo(select);
        select.appendTo(rowBox);

        const urlInput = new UIComponent({
            type: "input",
            id: "url",
            attributes: {
                type: "text",
                placeholder: "URL",
            }
        });

        urlInput.appendTo(rowBox);

        rowBox.appendTo(form);
    }

    public addIconSelection(form : UIComponent){
        
        const iconLabel = new UIComponent({
            type: "label",
            text: "Icon:",
            attributes: {
                for: "icon",
            }
        });

        iconLabel.appendTo(form);

        const rowBox = new UIComponent({
            type: "div",
            classes: ["box-row"],
            styles: {
                width: "100%",
            }
        });

        const iconBox  = new UIComponent({
            type: "div",
            classes: ["box-column","box-x-center","box-y-center"],
            styles: {
                width: "10rem",
                height: "10rem",
                borderRadius: "0.35rem",
                marginRight: "0.5rem",
                cursor: "pointer",
            }
        });

        const icon = getMaterialIcon(
            "deployed_code",
            {
                size: "6rem",
                fill: "rgba(255,255,255,0.75)",
            }
        )

        const iconSetLabel = new UIComponent({
            type: "span",
            classes: ["label"],
            text: "Click on the icon to select",
            styles: {
                marginTop: "0.5rem",
                fontSize: ".8rem",
                color: "#777",

            }
        });

        icon.appendTo(iconBox);
        iconSetLabel.appendTo(iconBox);
        iconBox.appendTo(rowBox);

        const uploadIconBox = new UIComponent({
            type: "div",
            classes: ["box-column","box-x-center","box-y-center"],
            styles: {
                width: "10rem",
                height: "10rem",
                borderRadius: "0.35rem",
                marginRight: "0.5rem",
                cursor: "pointer",
            }
        });

        const uploadIcon = getMaterialIcon(
            "file_upload",
            {
                size: "3rem",
                fill: "rgba(255,255,255,0.75)",
            }
        )

        const uploadIconCanvas = new UIComponent({
            type: "div",
            classes: ["box-column","box-x-center","box-y-center"],
            styles: {
                width: "7rem",
                height: "7rem",
                borderRadius: "50rem",
                backgroundColor: "rgba(0,0,0,0.075)",
            }
        });

        const uploadIconLabel = new UIComponent({
            type: "span",
            classes: ["label"],
            text: "or upload it",
            styles: {
                marginTop: "0.5rem",
                fontSize: ".8rem",
                color: "#777",
            }
        });

        uploadIcon.appendTo(uploadIconCanvas);
        uploadIconCanvas.appendTo(uploadIconBox);
        uploadIconLabel.appendTo(uploadIconBox);
        uploadIconBox.appendTo(rowBox);
       

        rowBox.appendTo(form);  

    }

    public addButtonBar(form : UIComponent){

        const buttonBar = new UIComponent({
            type: "div",
            classes: ["box-row","box-x-left"],
            styles: {
                width: "100%",
                marginTop: "2.5rem",
            }
        });

        const cancelButton = new UIComponent({
            type: "button",
            classes: ["button","button-secondary"],
            styles: {
                width: "10rem",
                height: "3.25rem",
                marginRight: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                boxShadow: "none",
            },
            text: "Cancel",
        });

        const saveButton = new UIComponent({
            type: "button",
            classes: ["button","button-primary"],
            styles: {
                width: "10rem",
                height: "3.25rem",
                marginRight: "0.5rem",
                backgroundColor: "rgba(255,255,255,0.05)",
                boxShadow: "none",
            },
            text: "Save",
        });

        cancelButton.appendTo(buttonBar);
        saveButton.appendTo(buttonBar);
        buttonBar.appendTo(form);
    }
}