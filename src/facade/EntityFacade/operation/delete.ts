import {IData} from '../../../interfaces/IData'
import {IEntity} from '../../../interfaces/IEntity'
import {parentNodeSymbol} from '../../../interfaces/INode'
import {DataAfterDeletingMessage} from '../../../messages/DataAfterDeletingMessage'
import {EntityFacade} from '../EntityFacade'

declare module '../EntityFacade' {
	interface EntityFacade {
		/**
		 * Удалить сущность или сущности.
		 */
		delete(...entityArray: IEntity[]): void
	}
}

EntityFacade.prototype.delete = deleteOperation

function deleteOperation(this: EntityFacade, ...entityArray: IEntity[]) {
	const messageEmitter = this.messageEmitter
	const parentEntity = this.entity

	for (const entity of entityArray) {
		if (entity[parentNodeSymbol] !== parentEntity) {
			throw new Error('Не совпадают родительские узлы')
		}

		const parentNode = entity[parentNodeSymbol]

		if (!parentNode) {
			throw new Error('Не найден родительский узел')
		}

		// Удалить все данные сущности. Рекурсивно.
		for (const data of parentEntity.flat(Infinity) as IData[]) {
			parentEntity.splice(parentEntity.indexOf(data), 1)
			messageEmitter.emit(new DataAfterDeletingMessage(data))
		}

		// Удалить сущность.
		parentNode.splice(parentNode.indexOf(entity), 1)
	}
}
