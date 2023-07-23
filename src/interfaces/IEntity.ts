import {INode, parentNodeSymbol} from './INode'
import {IRootEntity} from './IRootEntity'

export interface IEntity extends INode, Array<INode> {
	[parentNodeSymbol]: IEntity | IRootEntity | null
}
