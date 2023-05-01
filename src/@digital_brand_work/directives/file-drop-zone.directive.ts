import {
	Directive,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	Output,
	Renderer2,
} from '@angular/core'

@Directive({
	selector: '[fileDropZone]',
})
export class FileDropZoneDirective {
	constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {
		this._renderer.setProperty(
			this._elementRef.nativeElement,
			'draggable',
			true,
		)
	}

	@Output()
	onDrop = new EventEmitter<FileList>()

	@Input()
	multiple?: boolean

	@Input()
	accept?: string[]

	@Input()
	maxFileSize?: number

	@HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
		event.preventDefault()
		event.stopPropagation()
	}

	@HostListener('drop', ['$event'])
	readFileDrop(event: DragEvent) {
		event.preventDefault()
		event.stopPropagation()

		const files = event.dataTransfer?.files

		if (event.dataTransfer!.files.length > 0) {
			let reader: FileReader = new FileReader()

			reader.readAsDataURL(event.dataTransfer!.files[0])

			reader.onloadstart = () => this.onDrop.emit(files)
		}
	}
}
