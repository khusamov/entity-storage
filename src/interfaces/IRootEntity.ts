import {INode, parentNodeSymbol} from './INode'

export interface IRootEntity extends INode, Array<INode> {
	readonly [parentNodeSymbol]: null
}
