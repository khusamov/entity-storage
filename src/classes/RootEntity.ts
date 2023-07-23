import {INode, parentNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

/**
 * Базовая реализация корневой сущности.
 */
export class RootEntity extends Array<INode> implements IRootEntity {
	/**
	 * Родительский узел сущности.
	 * Для корневой сущности всегда равен null.
	 * @readonly
	 * @type {null}
	 */
	public readonly [parentNodeSymbol]: null = null
}
