import {IData} from '../interfaces/IData'
import {IEntity, parentEntitySymbol} from '../interfaces/IEntity'

export class Data implements IData {
	/**
	 * Родительский узел сущности.
	 * Если значение равно null, то данные еще не добавили в хранилище.
	 */
	public [parentEntitySymbol]: IEntity | null = null

	public get parentEntity() {
		return this[parentEntitySymbol]
	}
}
