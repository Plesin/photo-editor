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
		
		copyImageData():ImageData {			
			let copy:ImageData = this.context.createImageData(this.imageData.width, this.imageData.height);
			let data = <any>copy.data; // should be of type Uint8ClampedArray			
			data.set(this.imageData.data);			
			return copy;
		}
		
		resetImage():void {
			this.context.putImageData(this.imageData, 0, 0);
			// TODO reset range values			
		}
		
		greyScale(brightness: number): void {			 
			let imageData = this.copyImageData();
	        let data = imageData.data;			
				
	        for (let i = 0; i < data.length; i += 4) {
	          let value = brightness * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];	          
	          data[i] = value;	          
	          data[i + 1] = value;	          
	          data[i + 2] = value;
	        }
				        
	        this.context.putImageData(imageData, 0, 0);
		}
		
		// http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast		
		contrast(contrast:number): void {
			let imageData = this.copyImageData();
		    let data = imageData.data;
		    let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
		
		    for (let i = 0; i < data.length; i += 4) {
		        data[i] = factor * (data[i] - 128) + 128;
		        data[i+1] = factor * (data[i+1] - 128) + 128;
		        data[i+2] = factor * (data[i+2] - 128) + 128;
		    }
			
			this.context.putImageData(imageData, 0, 0);		    
		}
		
		brightness(step: number) {
			let imageData = this.copyImageData();
		    let data = imageData.data;			
			
			for (let i = 0; i < data.length; i += 4) {
		        data[i] += step;
		        data[i+1] += step;
		        data[i+2] += step;
		    }
			
			this.context.putImageData(imageData, 0, 0);
		}
	}
}