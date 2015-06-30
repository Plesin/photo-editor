module PE {
	export class App {
		canvas: HTMLCanvasElement;
		constructor() {	}
		
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
					var context = <CanvasRenderingContext2D>this.canvas.getContext("2d");		            
		            context.drawImage(img, 0, 0);
		        }
		        img.src = event.target.result;
		    }
		    reader.readAsDataURL(evt.target.files[0]);     
		}
	}	
}