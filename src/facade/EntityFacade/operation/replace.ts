import {setParentRecursively} from '../../../functions/setParentRecursively'
import {IData} from '../../../interfaces/IData'
import {DataAfterReplacingMessage} from '../../../messages/DataAfterReplacingMessage'
import {EntityFacade} from '../EntityFacade'

declare module '../EntityFacade' {
	interface EntityFacade {
		/**
		 * Операция замены данных.
		 * Данная операция требуется для обеспечения немутабельности игровых данных.
		 */
		replace(previousData: IData, data: IData): void
	}
}

EntityFacade.prototype.replace = replaceOperation

function replaceOperation(this: EntityFacade, previousData: IData, data: IData) {
	const messageEmitter = this.messageEmitter
	const parentEntity = this.entity

	// Удалить предыдущие данные.
	parentEntity.splice(parentEntity.indexOf(previousData), 1)

	// Добавить новые данные.
	setParentRecursively(parentEntity, data)
	parentEntity.push(data)

	// Отправить сообщение о замене данных.
	messageEmitter.emit(new DataAfterReplacingMessage(previousData, data))
}
