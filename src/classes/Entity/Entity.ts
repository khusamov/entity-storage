import {IEntity} from '../../interfaces/IEntity'
import {INode, parentNodeSymbol, rootNodeSymbol} from '../../interfaces/INode'
import {IRootEntity} from '../../interfaces/IRootEntity'
import {SimpleArray} from '../SimpleArray'

/**
 * Базовая реализация сущности.
 */
export class Entity extends SimpleArray<INode> implements IEntity {
	/**
	 * Родительский узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public [parentNodeSymbol]: IEntity | IRootEntity | null = null

	/**
	 * Корневой узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public [rootNodeSymbol]: IRootEntity | null = null
}
