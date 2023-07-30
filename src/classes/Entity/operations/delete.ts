import {NotFoundParentError} from '../../../errors/NotFoundParentError'
import {NotFoundParentRelationshipError} from '../../../errors/NotFoundParentRelationshipError'
import {isEntity} from '../../../functions/isEntity'
import {IData} from '../../../interfaces/IData'
import {IEntity} from '../../../interfaces/IEntity'
import {DataAfterDeletingMessage} from '../../../messages/DataAfterDeletingMessage'
import {SimpleArray} from '../../SimpleArray'
import {Entity} from '../Entity'
import {getMessageEmitter} from './push'

declare module '../Entity' {
	interface Entity {
		/**
		 * Операция удаления сущностей и данных.
		 */
		delete(...nodeArray: Array<IEntity | IData>): void
	}
}

Entity.prototype.delete = (
	function deleteOperation(this: Entity, ...nodeArray: Array<IEntity | IData>): void {
		const parentEntity = this
		const rootEntity = parentEntity.rootEntity
		const splice = SimpleArray.prototype.splice.bind(this)

		// Если корневая сущность не определена, то удаляем без сообщений.
		if (!rootEntity) {
			for (const node of nodeArray) {
				splice(parentEntity.indexOf(node), 1)
			}
			return
		}

		const messageEmitter = getMessageEmitter(this)

		for (const node of nodeArray) {
			if (node.parentEntity === null) {
				throw new NotFoundParentError(node)
			}
			if (node.parentEntity !== parentEntity) {
				throw new NotFoundParentRelationshipError(parentEntity, node.parentEntity)
			}

			// Если данный узел является сущностью,
			// то следует сообщить об удалении всех данных этой сущности и дочерних.
			if (isEntity(node)) {
				// @ts-ignore Игнорируем ошибку, связанную с тем, что node возможно бесконечный по глубине.
				const deletedData = node.flat(Infinity) as IData[]
				for (const data of deletedData) {
					messageEmitter.emit(new DataAfterDeletingMessage(data))
				}
			}

			// Удалить узел.
			splice(parentEntity.indexOf(node), 1)
		}
	}
)





