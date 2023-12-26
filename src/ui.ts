import { App, Modal, Setting } from "obsidian";

type Cancel = Record<string, never>;
export class FileNameCheckModal extends Modal {

    result:string;
    onSubmit: (result: string | Cancel) => void;
    constructor(app: App, onSubmit: (result: string | Cancel) => void, defaultValue="") {
        super(app);
        this.result = defaultValue
        this.onSubmit = onSubmit;
    }
    onOpen(): void {
        const { contentEl } = this;
        //contentEl.createEl("h1", { text: "File Name" });
        new Setting(contentEl)
            .setName("File Name")
            .addText(text => {
                text.setValue(this.result ?? "");
                text.onChange(value => {
                    this.result = value;
                });
			});
        new Setting(contentEl)
			.addButton(btn => {
                btn.setButtonText("Create")
                    .setCta()
                    .onClick(() => {
                        this.onSubmit(this.result);
                        this.close();
                    })
            }).addButton(btn => {
                btn.setButtonText("Cancel")
                    .setCta()
                    .onClick(() => {
						this.onSubmit({});
                        this.close();
                    })
            })
    }
    onClose(): void {
        const { contentEl } = this;
        contentEl.empty();
    }



}
