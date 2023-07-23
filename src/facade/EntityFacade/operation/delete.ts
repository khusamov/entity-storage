import {isEntity} from '../../../functions/isEntity'
import {IData} from '../../../interfaces/IData'
import {INode, parentNodeSymbol} from '../../../interfaces/INode'
import {DataAfterDeletingMessage} from '../../../messages/DataAfterDeletingMessage'
import {EntityFacade} from '../EntityFacade'

declare module '../EntityFacade' {
	interface EntityFacade {
		/**
		 * Операция удаления сущностей и данных.
		 */
		delete(...nodeArray: INode[]): void
	}
}

EntityFacade.prototype.delete = deleteOperation

function deleteOperation(this: EntityFacade, ...nodeArray: INode[]) {
	const messageEmitter = this.messageEmitter
	const parentEntity = this.entity

	for (const node of nodeArray) {
		if (node[parentNodeSymbol] !== parentEntity) {
			throw new Error('Не совпадают родительские узлы')
		}

		// Если данный узел является сущность,
		// то следует удалить все данные этой сущности. Рекурсивно.
		if (isEntity(node)) {
			for (const data of node.flat(Infinity) as IData[]) {
				const parentEntity = data[parentNodeSymbol]
				if (parentEntity === null) {
					throw new Error('Родительский узел должен быть определен')
				}
				parentEntity.splice(parentEntity.indexOf(data), 1)
				messageEmitter.emit(new DataAfterDeletingMessage(data))
			}
		}

		// Удалить сущность.
		parentEntity.splice(parentEntity.indexOf(node), 1)
	}
}
