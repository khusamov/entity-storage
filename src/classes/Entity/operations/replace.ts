import {IData} from '../../../interfaces/IData'
import {parentEntitySymbol} from '../../../interfaces/IEntity'
import {DataAfterReplacingMessage} from '../../../messages/DataAfterReplacingMessage'
import {SimpleArray} from '../../SimpleArray'
import {Entity} from '../Entity'
import {getMessageEmitter} from './push'

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
		const parentEntity = this
		const rootEntity = parentEntity.rootEntity
		const push = SimpleArray.prototype.push.bind(this)
		const splice = SimpleArray.prototype.splice.bind(this)

		// Удалить предыдущие данные.
		splice(parentEntity.indexOf(previousData), 1)

		// Добавить новые данные.
		data[parentEntitySymbol] = parentEntity
		push(data)

		// Если корневая сущность не определена, то заменяем без сообщений.
		if (!rootEntity) {
			return
		}

		const messageEmitter = getMessageEmitter(this)

		// Отправить сообщение о замене данных.
		messageEmitter.emit(new DataAfterReplacingMessage(previousData, data))
	}
)
