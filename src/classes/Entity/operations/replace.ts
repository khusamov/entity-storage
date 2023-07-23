import {Entity} from '../Entity'
import {MessageEmitterData} from '../../../data/MessageEmitterData'
import {deleteData} from '../../../functions/deleteData'
import {getData} from '../../../functions/getData'
import {getRootEntity} from '../../../functions/getRootEntity'
import {setParentRecursively} from '../../../functions/setParentRecursively'
import {IData} from '../../../interfaces/IData'
import {DataAfterReplacingMessage} from '../../../messages/DataAfterReplacingMessage'

declare module '../Entity' {
	interface Entity {
		/**
		 * Операция замены данных.
		 * Данная операция требуется для обеспечения немутабельности игровых данных.
		 */
		replace(previousData: IData, data: IData): void
	}
}

Entity.prototype.replace = (
	function replaceOperation(this: Entity, previousData: IData, data: IData): void {
		const rootEntity = getRootEntity(this)
		const messageEmitter = getData(rootEntity, MessageEmitterData).messageEmitter
		const parentEntity = this
		const push = Array.prototype.push.bind(this)

		// Удалить предыдущие данные.
		deleteData(previousData)

		// Добавить новые данные.
		setParentRecursively(parentEntity, data)
		push(data)

		// Отправить сообщение о замене данных.
		messageEmitter.emit(new DataAfterReplacingMessage(previousData, data))
	}
)
