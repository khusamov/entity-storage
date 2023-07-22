import {setParentRecursively} from '../../../functions/setParentRecursively'
import {IData} from '../../../interfaces/IData'
import {IEntity} from '../../../interfaces/IEntity'
import {DataAfterPushingMessage} from '../../../messages/DataAfterPushingMessage'
import {EntityFacade} from '../EntityFacade'

declare module '../EntityFacade' {
	interface EntityFacade {
		/**
		 * Добавить сущность или сущности.
		 */
		push(...entityArray: IEntity[]): void
	}
}

EntityFacade.prototype.push = pushOperation

function pushOperation(this: EntityFacade, ...entityArray: IEntity[]) {
	const messageEmitter = this.messageEmitter
	const parentEntity = this.entity

	for (const entity of entityArray) {
		setParentRecursively(parentEntity, entity)
		parentEntity.push(entity)
		for (const data of entity.flat(Infinity) as IData[]) {
			messageEmitter.emit(new DataAfterPushingMessage(data))
		}
	}
}
