import {INode, parentNodeSymbol} from '../interfaces/INode'

export function isNode(object: any): object is INode {
	return parentNodeSymbol in object
}
