import {IRootEntity} from '../../interfaces/IRootEntity'
import {EntityFacade} from '../EntityFacade'

export class RootFasade extends EntityFacade<IRootEntity> {
	public get root(): IRootEntity {
		return this.entity
	}
}
