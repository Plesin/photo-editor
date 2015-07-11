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
		
		resetImage(): void {
			this.context.putImageData(this.imageData, 0, 0);
			// TODO reset range values			
		}
		
		applyAdjustment(type: string, value: number): void {
			let imageData = this.copyImageData();
	        let data = imageData.data;			
			
			switch(type) {
				case EDIT_TYPE_GREYSCALE:
					for (let i = 0; i < data.length; i += 4) {
			          let newValue = value * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];	          
			          data[i] = newValue;	          
			          data[i + 1] = newValue;	          
			          data[i + 2] = newValue;					  
			        }	
					break; 
				case EDIT_TYPE_CONTRAST: // http://stackoverflow.com/questions/10521978/html5-canvas-image-contrast
					let factor = (259 * (value + 255)) / (255 * (259 - value));
				    for (let i = 0; i < data.length; i += 4) {
				        data[i] = factor * (data[i] - 128) + 128;
				        data[i+1] = factor * (data[i+1] - 128) + 128;
				        data[i+2] = factor * (data[i+2] - 128) + 128;
				    }
					break;
				case EDIT_TYPE_BRIGHTNESS:
					for (let i = 0; i < data.length; i += 4) {
				        data[i] += value;
				        data[i+1] += value;
				        data[i+2] += value;
				    }
					break;
				case "default":
					console.error("Unknown edit type provided ", type);
					break;				

			}
			
			this.context.putImageData(imageData, 0, 0);
		}
		
		private copyImageData():ImageData {			
			let copy:ImageData = this.context.createImageData(this.imageData.width, this.imageData.height);
			let data = <any>copy.data; // should be of type Uint8ClampedArray			
			data.set(this.imageData.data);			
			return copy;
		}
				
	}
}