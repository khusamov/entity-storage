/**
 * Решение проблем с наследованием от штатного массива Array.
 * Избавляемся от необходимости использования в наследниках от Array таких конструкторов как:
 *
 * new(arrayLength?: number): any[];
 * new <T>(arrayLength: number): T[];
 * (arrayLength?: number): any[];
 * <T>(arrayLength: number): T[];
 *
 * Дело в том, что такие методы как filter и find создают новый массив как результат своей работы,
 * а создают массив не Array, а с того класса, который унаследован от Array (что в общем правильно).
 * И этот наследник не реализует интерфейс конструктора (те конструкторы, что представлены выше)
 * Array обычно, потому что программист об это просто не помнит или не знает. В итоге нужных конструкторов
 * нет и появляются неожиданные ошибки.
 */
export class SimpleArray<T> extends Array<T> {
	public constructor(...items: T[]) {
		// Если среди items добавлен нуль, то пора переопределять еще один метод.
		super(...items)
	}

	public override filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArg?: any): S[]
	public override filter(predicate: (value: T, index: number, array: T[]) => unknown, thisArg?: any): T[]
	public override filter() {
		return Array.from(this).filter(arguments[0], arguments[1])
	}

	public override find<S extends T>(predicate: (this: void, value: T, index: number, obj: T[]) => value is S, thisArg?: any): S | undefined
	public override find(predicate: (value: T, index: number, obj: T[]) => unknown, thisArg?: any): T | undefined
	public override find() {
		return Array.from(this).find(arguments[0], arguments[1])
	}

	// public override splice(start: number, deleteCount?: number): T[]
	// public override splice(start: number, deleteCount: number, ...items: T[]): T[] {
	//
	// 	// splice должен работать со своим массивом, а не с новым Array.from(this)
	// 	// Но когда он работает со своим, то пользуется конструктором new <T>(arrayLength: number): T[];
	// 	// Которого в SimpleArray нет. Потому и ошибка.
	//
	// 	return Array.from(this as Array<any>).splice(start, deleteCount, ...items)
	// 	// return Array.prototype.splice.call(Array.from(this), start, deleteCount, ...items)
	// }

	public override flat<D extends number = 1>(depth?: D) {
		return Array.from(this as Array<any>).flat(depth)
	}

	public override map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
		return Array.from(this).map(callbackfn, thisArg)
	}

	public override push(...items: T[]): number {
		return Array.prototype.push.call(this, ...items)
	}
}
