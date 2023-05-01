import { Pipe, PipeTransform } from '@angular/core'

@Pipe({ name: 'loop_until', pure: true })
export class LoopUntilPipe implements PipeTransform {
	transform<T>(data: T, options: { from: number; to: number }): T[] {
		return loop_until(data, options)
	}
}

export function loop_until<T>(
	data: T,
	options: { from: number; to: number },
): T[] {
	let items = [...(data as any)]
	let { from, to } = options

	const newArray: T[] = []

	for (let i = 0; i <= items.length; i++) {
		if (i === from || i <= to) {
			newArray.push(items[i])
		}
	}

	return newArray
}
