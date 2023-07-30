import {IData} from './IData'

export const rootEntitySymbol = Symbol.for('RootEntity')
export const parentEntitySymbol = Symbol.for('ParentEntity')

/**
 * Игровая сущность. Это массив, содержащий данные сущности и возможно дочерние сущности.
 */
export interface IEntity extends Array<IEntity | IData> {
	/**
	 * Ссылка на родительскую сущность.
	 * Внимание, при поиске из результата Array.flat() нужен [parentNodeSymbol].
	 */
	[parentEntitySymbol]: IEntity | null

	/**
	 * Ссылка на корневую сущность.
	 * Требуется для доступа к MessageEmitter, который хранится в корневой сущности в MessageEmitterData.
	 */
	[rootEntitySymbol]: IEntity | null

	readonly rootEntity: IEntity | null
	readonly parentEntity: IEntity | null
}
