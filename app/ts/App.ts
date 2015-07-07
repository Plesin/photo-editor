module PE {
	export class App {
		canvas: HTMLCanvasElement;
		view: View;
		edit: Edit;
		
		constructor() {
			this.init();						
		}
		
		init():void {
			this.canvas = <HTMLCanvasElement>document.querySelector("canvas");			
			this.view = new View();
			this.bindEvents();			
		}
		
		bindEvents() {
			let input = document.querySelector("input[type=file]");
			let greyscale = <HTMLInputElement>document.querySelector("#greyscale");
			let contrast = <HTMLInputElement>document.querySelector("#contrast");
			
			input.addEventListener("change", event => {
				this.handleImage(event);
			}, false);			
						
			greyscale.addEventListener("mouseup", event => {	
				this.edit.greyScale(parseFloat(greyscale.value));
			}, false);
			
			contrast.addEventListener("mouseup", event => {	
				this.edit.contrast(parseFloat(contrast.value));
			}, false);
						
		}
		
		onImageLoaded(img: HTMLImageElement) {
			let canvasSize = this.view.getImageSizeToViewPort(img);						
			this.canvas.width = canvasSize.width;
			this.canvas.height = canvasSize.height;
			let context = <CanvasRenderingContext2D>this.canvas.getContext("2d");									
			context.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
			this.edit = new Edit(this.canvas);
			document.querySelector("footer").classList.remove("invisible");			
		}
		
		handleImage(evt:any){
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
				
	}	
}