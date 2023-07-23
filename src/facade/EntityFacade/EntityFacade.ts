import {IMessageEmitter} from 'khusamov-message-emitter'
import {IEntity} from '../../interfaces/IEntity'
import {IRootEntity} from '../../interfaces/IRootEntity'

/**
 * Специальный фасад для сущности для выполнения различных операций.
 * Операции определяются отдельно от фасада.
 */
export class EntityFacade<E extends IEntity | IRootEntity = IEntity> {
	public constructor(
		protected readonly messageEmitter: IMessageEmitter,
		public readonly entity: E
	) {}
}


// export class EntityFacade {
// 	public readonly [messageEmitterSymbol]: IMessageEmitter
// 	public readonly [entitySymbol]: IEntity | IRoot
// 	private ttt = 0
//
// 	public constructor(protected readonly messageEmitter: IMessageEmitter, protected readonly entity: IEntity | IRoot) {
// 		this[messageEmitterSymbol] = messageEmitter
// 		this[entitySymbol] = entity
// 	}
// }
