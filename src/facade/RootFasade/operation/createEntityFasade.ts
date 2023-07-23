import {IEntity} from '../../../interfaces/IEntity'
import {EntityFacade} from '../../EntityFacade'
import {RootFasade} from '../RootFasade'

declare module '../RootFasade' {
	interface RootFasade {
		/**
		 * Операция добавления сущностей и данных.
		 */
		createEntityFasade(entity: IEntity): EntityFacade
	}
}

RootFasade.prototype.createEntityFasade = createEntityFasade

function createEntityFasade(this: RootFasade, entity: IEntity): EntityFacade {
	return new EntityFacade(this.messageEmitter, entity)
}
