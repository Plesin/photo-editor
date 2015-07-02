module PE {
	export class App {
		canvas: HTMLCanvasElement;
		view: View;
		
		constructor() {
			this.view = new View();	
		}
		
		init():void {
			this.canvas = <HTMLCanvasElement>document.querySelector("canvas");
			this.bindEvents();
		}
		
		bindEvents() {
			var input = document.querySelector("input[type=file]");
			input.addEventListener("change", (event) => {
				this.handleImage(event);
			}, false);			
		}
		
		handleImage(evt:any){
		    var reader = new FileReader();
		    reader.onload = (event:any) => {
		        var img = new Image();
		        img.onload = () => {					
					var canvasSize = this.view.getImageSizeToViewPort(img);
					console.log(canvasSize);	
					this.canvas.width = canvasSize.width;
					this.canvas.height = canvasSize.height;
					var context = <CanvasRenderingContext2D>this.canvas.getContext("2d");
					//ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvasSize.width, canvasSize.height);				
					context.drawImage(img, 0, 0, canvasSize.width, canvasSize.height);
		        }
		        img.src = event.target.result;
		    }
		    reader.readAsDataURL(evt.target.files[0]);     
		}
				
	}	
}