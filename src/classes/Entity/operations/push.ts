import {Entity} from '../Entity'
import {MessageEmitterData} from '../../../data/MessageEmitterData'
import {getData} from '../../../functions/getData'
import {getRootEntity} from '../../../functions/getRootEntity'
import {isEntity} from '../../../functions/isEntity'
import {setParentRecursively} from '../../../functions/setParentRecursively'
import {IData} from '../../../interfaces/IData'
import {INode} from '../../../interfaces/INode'
import {DataAfterPushingMessage} from '../../../messages/DataAfterPushingMessage'

declare module '../Entity' {
	interface Entity {
		/**
		 * Операция добавления сущностей и данных.
		 */
		push(...nodeArray: INode[]): number
	}
}

Entity.prototype.push = (
	function pushOperation(this: Entity, ...nodeArray: INode[]): number {
		const rootEntity = getRootEntity(this)
		const messageEmitter = getData(rootEntity, MessageEmitterData).messageEmitter
		const parentEntity = this
		const push = Array.prototype.push.bind(this)

		for (const node of nodeArray) {
			setParentRecursively(parentEntity, node)
			push(node)
			if (isEntity(node)) {
				for (const data of node.flat(Infinity) as IData[]) {
					messageEmitter.emit(new DataAfterPushingMessage(data))
				}
			}
		}

		return this.length
	}
)




