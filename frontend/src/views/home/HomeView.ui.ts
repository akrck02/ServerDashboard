import App from "../../App.js";
import Select from "../../components/select/Select.js";
import { Config } from "../../config/Config.js";
import { getLanguageName } from "../../lang/Language.js";
import StringTools from "../../lib/gtd/data/stringtools.js";
import { getMaterialIcon } from "../../lib/gtd/material/materialicons.js";
import { isSmallDevice } from "../../lib/gtd/web/responsivetools.js";
import { setClasses, setEvents, setStyles, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import HomeCore from "./HomeView.core.js";

export default class HomeView extends ViewUI {

    private static ID = "home";
    private static LOGO_ID = "logo";
    private static DESCRIPTION_ID = "description";
    private static START_MENU_ID = "start-menu";
    private static INFO_BOX_CLASS = "info-box";

    public constructor(){
        super({
            type: "view",
            id: HomeView.ID,
            classes: ["box-column","box-x-center"],
            styles: {
                "padding": "0rem 4rem",
            }
        });
    }

    public show(params : string[], container : UIComponent): void {
        
        const title = new UIComponent({
            type: "h1",
            text : "Your server dashboard",
            styles: {
                "font-size": "1.25rem",
                "margin-top": "2rem",
            }
        })

        title.appendTo(this);    
        this.drawServices()
        this.appendTo(container);
    }

    public drawServices() : void {

        for (const key in HomeCore.getServices()) {
            const categoryName = new UIComponent({
                type: "h2",
                text : key,
                styles: {
                    "font-size": "1rem",
                    "margin-top": "4rem",
                    "margin-bottom": "1rem",
                    "opacity": "0.75",
                }
            })
    
            const categoryBox = new UIComponent({
                type: "div",
                classes: ["box-row"],
                styles: {
                    "width": "100%",
                }
            })
    


            const categoryservices = HomeCore.getServices()[key];
            
            categoryservices.forEach(service => {
                const button = this.newButton(service.name, service.icon, service.url, service.icon_type).appendTo(categoryBox);
                button.appendTo(categoryBox);
            });
    
            categoryName.appendTo(this);
            categoryBox.appendTo(this);
        }


 

    }



    public newButton(text : string, icon : string, url: string, iconType: string) : UIComponent {

        const button = new UIComponent({
            type: "button",
            classes: ["button","button-large","button-icon"],
            styles: {
                "margin": "0.5rem",
                "width": "10rem",
                "height": "8rem",  
                "background-color": "rgba(0,0,0,0.25)",
                "box-shadow": "none",
                "border": ".20rem solid rgba(255,255,255,0.25)",
                "border-radius": "0.55rem",
            }
        })


        switch (iconType) {
            case "local":
                const iconComponent = getMaterialIcon(icon, {
                    fill: "white",
                    size: "3rem"
                })

                iconComponent.appendTo(button);
                break;
            default:
                const imageComponent = new UIComponent({
                    type: "img",
                    attributes: {
                        src: Config.PATHS.IMAGES + icon
                    },
                    styles: {
                        "width": "3rem",
                        "height": "3rem",
                        "margin": "auto",
                        "display": "block",
                        "object-fit": "cover",
                        "border-radius": "10rem"
                    }
                })

                imageComponent.appendTo(button);
                break;
        }

       

        const textComponent = new UIComponent({
            type: "span",
            text: text,
            styles: {
                "font-size": "1rem",
                "margin-top": "0.5rem",
                "color": "white",
                "text-align": "center",
                "display": "block"
            }
        })

        textComponent.appendTo(button);

        button.element.addEventListener("click", () => {
            window.open(url);
        })

        return button;
    }


}