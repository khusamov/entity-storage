import {IEntity} from '../interfaces/IEntity'
import {INode, parentNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

/**
 * Базовая реализация сущности.
 */
export class Entity extends Array<INode> implements IEntity {
	/**
	 * Родительский узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public [parentNodeSymbol]: IEntity | IRootEntity | null = null

	public constructor()
	public constructor(arrayLength: number)
	public constructor(...nodes: INode[])
	public constructor(...parameters: [(number | INode)?, ...INode[]]) {
		if (typeof parameters[0] === 'number') {
			super(parameters[0])
		} else {
			super(...parameters as INode[])
		}
	}
}
