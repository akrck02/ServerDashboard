import App from "../../App.js";
import { Config } from "../../config/Config.js";
import { setClasses, setEvents, UIComponent } from "../../lib/gtd/web/uicomponent.js";
import { ViewUI } from "../../lib/gtdf/views/ViewUI.js";
import HomeCore from "./HomeView.core.js";
export default class HomeViewMobile extends ViewUI {
    constructor() {
        super({
            type: "view",
            id: HomeViewMobile.ID,
            classes: ["box-column", "box-center"],
        });
    }
    show(params, container) {
        location.href = Config.VIEWS.ERROR + "600";
    }
    /**
     * Create the start menu component
     * @returns The menu created.
     */
    createStartMenu() {
        const menu = new UIComponent({
            type: "div",
            id: HomeViewMobile.START_MENU_ID,
            classes: ["box-row", "box-center", "box-warp"],
        });
        const helpBox = this.createInfoBox("hand.svg", App.getBundle().home.HELLO_WORLD, App.getBundle().home.HELLO_WORLD_DESCRIPTION);
        const configBox = this.createInfoBox("settings.svg", App.getBundle().home.CONFIGURATIONS, App.getBundle().home.CONFIGURATIONS_DESCRIPTION);
        const contributeBox = this.createInfoBox("github.svg", App.getBundle().home.CONTRIBUTE, App.getBundle().home.CONTRIBUTE_DECRIPTION, HomeCore.CONTRIBUTE_URL, true);
        helpBox.appendTo(menu);
        configBox.appendTo(menu);
        contributeBox.appendTo(menu);
        return menu;
    }
    createInfoBox(image, title, message, url = undefined, newPage = false) {
        const infoBox = new UIComponent({
            classes: [HomeViewMobile.INFO_BOX_CLASS, "box-column", "box-center", "text-center"],
        });
        const infoBoxIcon = new UIComponent({
            type: "img",
            attributes: {
                src: Config.PATHS.ICONS + image,
                alt: "Hello world icon"
            },
        });
        infoBoxIcon.appendTo(infoBox);
        const infoBoxTitle = new UIComponent({
            type: "h2",
            text: title
        });
        infoBoxTitle.appendTo(infoBox);
        const infoBoxDescription = new UIComponent({
            type: "p",
            text: message,
            classes: ["description"],
        });
        infoBoxDescription.appendTo(infoBox);
        // if url is defined set action listener
        if (url) {
            // Set "clickable" style and behaviour
            setClasses(infoBox.element, ["clickable"]);
            // Setting event
            setEvents(infoBox.element, {
                click: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open(url, newPage ? "blank" : "");
                }
            });
        }
        return infoBox;
    }
}
HomeViewMobile.ID = "home-mobile";
HomeViewMobile.LOGO_ID = "logo";
HomeViewMobile.DESCRIPTION_ID = "description";
HomeViewMobile.START_MENU_ID = "start-menu";
HomeViewMobile.INFO_BOX_CLASS = "info-box";
