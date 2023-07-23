import {IEntity} from '../interfaces/IEntity'
import {INode} from '../interfaces/INode'

export function isEntity(node: INode): node is IEntity {
	return Array.isArray(node)
}
