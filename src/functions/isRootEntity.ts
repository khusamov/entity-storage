import {INode, parentNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

export function isRootEntity(node: INode): node is IRootEntity {
	return node[parentNodeSymbol] === null
}
