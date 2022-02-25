import { UIComponent } from "../../lib/web/uicomponent.js";

export default class HomeV extends UIComponent{
    
    constructor() {
        super({
            type: "view",
            classes: ["box-center", "box-column", "no-copy"]
        });
    }
    
    public show(params : string[]): void {
       console.log("Home view is showing");
       console.log("Params: ", params);

       this.setVault();
       document.body.appendChild(this.element);
    }

    private setVault() : void {

        const title = new UIComponent({
            type: "h1",
            id: "main-title",
            text: "Welcome to your NAS"
        });

        const services = new UIComponent({
            type: "h2",
            id: "services",
            text: "What do you want to manage?"
        });

        const vault = new UIComponent({
            type: "div",
            id: "service-vault",
            classes :["row"]
        });

        const servicesList = [
            this.newService(
                "Console",
                "/console", 
                `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"  viewBox="0 0 24 24" fill="#000000"><g><rect fill="none" height="24" width="24"/><rect fill="none" height="24" width="24"/></g><g><path d="M20,4H4C2.89,4,2,4.9,2,6v12c0,1.1,0.89,2,2,2h16c1.1,0,2-0.9,2-2V6C22,4.9,21.11,4,20,4z M20,18H4V8h16V18z M12,16 c0-0.55,0.45-1,1-1h4c0.55,0,1,0.45,1,1c0,0.55-0.45,1-1,1h-4C12.45,17,12,16.55,12,16z M6.79,9.71c0.39-0.39,1.02-0.39,1.41,0 l2.59,2.59c0.39,0.39,0.39,1.02,0,1.41l-2.59,2.59c-0.39,0.39-1.02,0.39-1.41,0c-0.39-0.39-0.39-1.02,0-1.41L8.67,13l-1.88-1.88 C6.4,10.73,6.4,10.1,6.79,9.71z"/></g></svg>`
            ),
            this.newService(
                "File", 
                "/file", 
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M10.59 4.59C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-1.41-1.41z"/></svg>`
            ),
            this.newService(
                "Photos", 
                "/photos", 
                `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"  fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-10.6-3.47l1.63 2.18 2.58-3.22c.2-.25.58-.25.78 0l2.96 3.7c.26.33.03.81-.39.81H9c-.41 0-.65-.47-.4-.8l2-2.67c.2-.26.6-.26.8 0zM2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/></svg>`
            ),
            this.newService(
                "Stats", 
                "/stats", 
                `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-3h2v3zm0-5h-2v-2h2v2zm4 5h-2V7h2v10z"/></svg>`
            ),
        ];

        servicesList.forEach(service => {
            vault.appendChild(service);
        });

        this.appendChild(title);
        this.appendChild(services);
        this.appendChild(vault);
    }

    private newService(service : string, url : string , icon : string) : UIComponent {

        const serviceBox = new UIComponent({
            type: "div",
            classes: ["column"]
        });

        const iconBox = new UIComponent({
            type: "a",
            attributes: {
                href: url,
            },
            classes: ["icon"],
            text : icon
        });

        const serviceName = new UIComponent({
            type: "label",
            classes: ["service-name"],
            text: service
        });

        serviceBox.appendChild(iconBox);
        iconBox.appendChild(serviceName);

        return serviceBox;
    }

}