import {IEntity} from './IEntity'
import {INode, parentNodeSymbol} from './INode'

export interface IData extends INode {
	[parentNodeSymbol]: IEntity | null
}
