module PE {
	export class App {		
		view: View;
		edit: Edit;
		
		constructor() {
			this.init();						
		}
		
		init():void {						
			this.view = new View();			
		}
		
		handleAppEvent(appEvent:string, data:any) {
			switch(appEvent) {
				case "init-edit": 
					this.edit = new Edit(data);
					break;
				case "apply-edit":
					this.edit.applyAdjustment(data.editType, data.value);
					break;
				case "reset-image":
					this.edit.resetImage();
					break;		 	
			}
		}

	}	
}