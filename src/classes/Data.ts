import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {parentNodeSymbol} from '../interfaces/INode'

export class Data implements IData {
	[parentNodeSymbol]: IEntity | null = null
}
