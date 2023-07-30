import {MessageEmitterData} from '../../../data/MessageEmitterData'
import {getData} from '../../../functions/getData'
import {getRootEntity} from '../../../functions/getRootEntity'
import {isEntity} from '../../../functions/isEntity'
import {updateRootRecursively} from '../../../functions/updateRootRecursively'
import {IData} from '../../../interfaces/IData'
import {IEntity, parentEntitySymbol} from '../../../interfaces/IEntity'
import {DataAfterPushingMessage} from '../../../messages/DataAfterPushingMessage'
import {SimpleArray} from '../../SimpleArray'
import {Entity} from '../Entity'

declare module '../Entity' {
	interface Entity {
		/**
		 * Операция добавления сущностей и данных.
		 */
		push(...nodeArray: Array<IEntity | IData>): number
	}
}

export const getMessageEmitter = (entity: IEntity) => getData(getRootEntity(entity), MessageEmitterData).messageEmitter

Entity.prototype.push = (
	function pushOperation(this: Entity, ...nodeArray: Array<IEntity | IData>): number {

		const parentEntity = this
		const rootEntity = parentEntity.rootEntity
		const push = SimpleArray.prototype.push.bind(this)

		// Если корневая сущность не определена, то пушим без сообщений.
		if (!rootEntity) {
			for (const node of nodeArray) {
				push(node)
			}
			return this.length
		}

		const messageEmitter = getMessageEmitter(this)

		for (const node of nodeArray) {
			updateRootRecursively(rootEntity, node)
			node[parentEntitySymbol] = parentEntity
			push(node)

			// @ts-ignore Игнорируем ошибку, связанную с тем, что node возможно бесконечный по глубине.
			const dataArray = isEntity(node) ? node.flat(Infinity) : [node]
			for (const data of dataArray) {
				messageEmitter.emit(new DataAfterPushingMessage(data))
			}
		}

		return this.length
	}
)




