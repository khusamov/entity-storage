import {INode, parentNodeSymbol} from '../interfaces/INode'
import {IRoot} from '../interfaces/IRoot'

/**
 * Базовая реализация корневой сущности.
 */
export class Root extends Array<INode> implements IRoot {
	/**
	 * Родительский узел сущности.
	 * Для корневой сущности всегда равен null.
	 * @readonly
	 * @type {null}
	 */
	public readonly [parentNodeSymbol]: null = null
}
