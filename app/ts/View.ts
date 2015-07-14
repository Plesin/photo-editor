module PE {
	interface IRectangle {
		width: number;
		height: number;
	}
	
	export class View {		
		canvas: HTMLCanvasElement;
		fileInput: HTMLInputElement;
		resetButton: HTMLButtonElement;
		ranges: Array<HTMLInputElement>;
		footer: HTMLElement;
		
		constructor() {			
			this.canvas = <HTMLCanvasElement>document.querySelector("canvas");
			this.fileInput = <HTMLInputElement>document.querySelector("input[type=file]");
			this.resetButton = <HTMLButtonElement>document.querySelector("button");
			this.ranges = [].slice.call(document.querySelectorAll("input[type=range]"));
			this.footer = <HTMLElement>document.querySelector("footer");
			this.bindEvents();
		}
		
		renderImage(img: HTMLImageElement) {
			let canvasSize = this.getImageSizeToViewPort(img);
			this.canvas.width = canvasSize.width;
			this.canvas.height = canvasSize.height;
			let context = <CanvasRenderingContext2D>this.canvas.getContext("2d");									
			context.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
		}								

		private bindEvents() {
			this.fileInput.addEventListener("change", event => {
				this.handleImage(event);
			}, false);
			
			this.ranges.forEach((range:HTMLInputElement) => {
				range.addEventListener("change", (event:MouseEvent) => {
					let editType:string = range.dataset["editType"];
					app.handleAppMessage(APP_MSG_APPLY_EDIT, { editType: editType, value: parseFloat(range.value) });					
				});
			});
			
			this.resetButton.addEventListener("click", event => {
				app.handleAppMessage(APP_MSG_RESET_IMAGE, null);				
			}, false);	
		}
		
		private showEditControls(): void {
			this.footer.classList.remove("invisible");
			this.resetButton.classList.remove("invisible");
		}
		
		private onImageLoaded(img: HTMLImageElement) {			
			this.renderImage(img);
			app.handleAppMessage(APP_MSG_INIT_EDIT, this.canvas);
			this.showEditControls();			
		}
		
		private handleImage(evt:any){
		    let reader = new FileReader();
		    reader.onload = (event:any) => { 
		        let img = new Image();
		        img.onload = () => {					
					this.onImageLoaded(img);
		        }
		        img.src = event.target.result;
		    }
		    reader.readAsDataURL(evt.target.files[0]);     
		}
		
		private getImageSizeToViewPort(img: HTMLImageElement): IRectangle  {
			let viewPort:IRectangle = this.getViewPort();
			let ratio:number;			
		
			if (viewPort.width * img.height > viewPort.height * img.width) {
				 ratio = viewPort.height / img.height;
			} else { 
				ratio = viewPort.width / img.width;
			}
			
			ratio = ratio > 1 ? 1 : ratio;							
			return {
				width: Math.floor(img.width * ratio),
				height: Math.floor(img.height * ratio)	
			}
		}
		
		private getViewPort(): IRectangle {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}
		
	}
}