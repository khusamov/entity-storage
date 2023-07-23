import {NotFoundParentError} from '../errors/NotFoundParentError'
import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {INode, parentNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

export function getParent<E extends IEntity | IRootEntity>(entity: IEntity): E
export function getParent<E extends IEntity>(data: IData): E
export function getParent<N extends INode>(node: INode): N {
	const parentEntity = node[parentNodeSymbol] as N | null
	if (parentEntity === null) {
		throw new NotFoundParentError(node)
	}
	return parentEntity
}
