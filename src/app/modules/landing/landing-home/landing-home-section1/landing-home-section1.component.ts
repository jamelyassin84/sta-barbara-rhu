import {Component} from '@angular/core'
import {dbwAnimations} from '@digital_brand_work/animations/animation.api'
import {HOME_SLIDERS} from 'app/app-core/constants/home.slider'

@Component({
    selector: 'landing-home-section1',
    templateUrl: './landing-home-section1.component.html',
    animations: [...dbwAnimations],
})
export class LandingHomeSection1Component {
    readonly HOME_SLIDERS = HOME_SLIDERS

    currentSlide: string = HOME_SLIDERS[0]

    slideInterval: any

    ngOnInit(): void {
        this.slideInterval = setInterval(() => {
            this.slide()
        }, 5000)
    }

    ngOnDestroy(): void {
        clearInterval(this.slideInterval)
    }

    slide(direction: 'left' | 'right' = 'right') {
        const photo = HOME_SLIDERS[0]

        const nextIndex = this.HOME_SLIDERS.findIndex(
            (slide) => slide === this.currentSlide,
        )

        if (direction === 'right') {
            if (!this.HOME_SLIDERS[nextIndex + 1]) {
                this.currentSlide = photo
                return
            }

            this.currentSlide = this.HOME_SLIDERS[nextIndex + 1]
            return
        }

        if (!this.HOME_SLIDERS[nextIndex - 1]) {
            this.currentSlide = this.HOME_SLIDERS[this.HOME_SLIDERS.length - 1]
            return
        }

        this.currentSlide = this.HOME_SLIDERS[nextIndex - 1]
    }

    scrollToElement() {
        const targetElement = document.querySelector('#appointment')
        if (targetElement) {
            targetElement.scrollIntoView({behavior: 'smooth', block: 'start'})
        }
    }

    trackByFn(index: number, item: any): any {
        return item.id || index
    }
}
