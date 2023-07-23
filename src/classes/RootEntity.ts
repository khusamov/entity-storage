import {INode, parentNodeSymbol, rootNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'
import {SimpleArray} from './SimpleArray'

/**
 * Базовая реализация корневой сущности.
 */
export class RootEntity extends SimpleArray<INode> implements IRootEntity {
	/**
	 * Родительский узел сущности.
	 * Для корневой сущности всегда равен null.
	 * @readonly
	 * @type {null}
	 */
	public readonly [parentNodeSymbol]: null = null

	/**
	 * Корневой узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public readonly [rootNodeSymbol]: null = null
}
