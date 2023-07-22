import {INode, parentNodeSymbol} from './INode'

export interface IRoot extends INode, Array<INode> {
	readonly [parentNodeSymbol]: null
}
