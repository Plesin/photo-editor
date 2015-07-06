module PE {
	export class Edit {
		canvas: HTMLCanvasElement;
		imageData: ImageData;
		context: CanvasRenderingContext2D;
		
		constructor(canvasEl: HTMLCanvasElement) {
			this.canvas = canvasEl;
			let width = this.canvas.clientWidth;
			let height = this.canvas.clientHeight;
			this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");			
			this.imageData = this.context.getImageData(0, 0, width, height);			
		}		
		
		copyImageData() {			
			let copy:ImageData = this.context.createImageData(this.imageData.width, this.imageData.height);
			let data = <any>copy.data; // should be of type Uint8ClampedArray			
			data.set(this.imageData.data);			
			return copy;
		}
		
		greyScale(brightness: number):void {			 
			let imageData = this.copyImageData();
	        let data = imageData.data;			
			console.log(imageData.data[0]);	
	        for (let i = 0; i < data.length; i += 4) {
	          let value = brightness * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];	          
	          data[i] = value;	          
	          data[i + 1] = value;	          
	          data[i + 2] = value;
	        }
				        
	        this.context.putImageData(imageData, 0, 0);
		}
	}
}