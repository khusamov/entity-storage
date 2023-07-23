import {Entity} from '../Entity'
import {MessageEmitterData} from '../../../data/MessageEmitterData'
import {NotFoundParentError} from '../../../errors/NotFoundParentError'
import {deleteData} from '../../../functions/deleteData'
import {getData} from '../../../functions/getData'
import {getParent} from '../../../functions/getParent'
import {getRootEntity} from '../../../functions/getRootEntity'
import {isEntity} from '../../../functions/isEntity'
import {IData} from '../../../interfaces/IData'
import {INode, parentNodeSymbol} from '../../../interfaces/INode'
import {DataAfterDeletingMessage} from '../../../messages/DataAfterDeletingMessage'

declare module '../Entity' {
	interface Entity {
		/**
		 * Операция удаления сущностей и данных.
		 */
		delete(...nodeArray: INode[]): void
	}
}

Entity.prototype.delete = (
	function deleteOperation(this: Entity, ...nodeArray: INode[]): void {
		const rootEntity = getRootEntity(this)
		const messageEmitter = getData(rootEntity, MessageEmitterData).messageEmitter
		const parentEntity = this
		const splice = Array.prototype.splice.bind(this)

		for (const node of nodeArray) {
			if (node[parentNodeSymbol] !== parentEntity) {
				throw new Error('Не совпадают родительские узлы')
			}

			// Если данный узел является сущность,
			// то следует удалить все данные этой сущности. Рекурсивно.
			if (isEntity(node)) {
				for (const data of node.flat(Infinity) as IData[]) {
					deleteData(data)
					messageEmitter.emit(new DataAfterDeletingMessage(data))
				}
			}

			// Удалить узел.
			splice(parentEntity.indexOf(node), 1)
		}
	}
)





