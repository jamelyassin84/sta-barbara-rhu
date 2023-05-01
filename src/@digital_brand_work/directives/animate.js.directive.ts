import {Directive, ElementRef, Input, Renderer2} from '@angular/core'

@Directive({
    selector: '[animateCSS]',
})
export class AnimateJsDirective {
    constructor(private renderer: Renderer2, private hostElement: ElementRef) {}

    @Input('animation') set setAnimation(animations: string[]) {
        this.animations = animations
    }
    animations: string[] = []

    ngAfterContentInit() {
        this.renderer.addClass(
            this.hostElement.nativeElement,
            'animate__animated',
        )

        this.animations.forEach((className: string) => {
            this.renderer.addClass(this.hostElement.nativeElement, className)
        })
    }
}
