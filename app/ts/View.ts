module PE {
	interface IViewPort {
		width: number;
		height: number;
	}
	
	export class View {
		
		constructor() {}
		
		getViewPort(): IViewPort {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		}		
		
		getImageSizeToViewPort(img: HTMLImageElement) {
			let viewPort:IViewPort = this.getViewPort();
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
		
	}
}