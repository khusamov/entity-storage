import {IData} from '../../interfaces/IData'
import {IEntity, rootEntitySymbol} from '../../interfaces/IEntity'
import {Entity} from './Entity'

export class RootEntity extends Entity {
	public constructor(...nodes: Array<IEntity | IData>) {
		super(...nodes)
		this[rootEntitySymbol] = this
	}
}
