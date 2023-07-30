import {IEntity, parentEntitySymbol} from './IEntity'

/**
 * Данные игровой сущности.
 */
export interface IData {
	/**
	 * Ссылка на родительскую сущность.
	 * Внимание, при поиске из результата Array.flat() нужен [parentNodeSymbol].
	 */
	[parentEntitySymbol]: IEntity | null

	readonly parentEntity: IEntity | null
}
