import {isEntity} from '../../../functions/isEntity'
import {setParentRecursively} from '../../../functions/setParentRecursively'
import {IData} from '../../../interfaces/IData'
import {INode} from '../../../interfaces/INode'
import {DataAfterPushingMessage} from '../../../messages/DataAfterPushingMessage'
import {EntityFacade} from '../EntityFacade'

declare module '../EntityFacade' {
	interface EntityFacade {
		/**
		 * Операция добавления сущностей и данных.
		 */
		push(...nodeArray: INode[]): void
	}
}

EntityFacade.prototype.push = pushOperation

function pushOperation(this: EntityFacade, ...nodeArray: INode[]) {
	const messageEmitter = this.messageEmitter
	const parentEntity = this.entity

	for (const node of nodeArray) {
		setParentRecursively(parentEntity, node)
		parentEntity.push(node)
		if (isEntity(node)) {
			for (const data of node.flat(Infinity) as IData[]) {
				messageEmitter.emit(new DataAfterPushingMessage(data))
			}
		}
	}
}
