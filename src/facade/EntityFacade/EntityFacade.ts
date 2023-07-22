import {IMessageEmitter} from 'khusamov-message-emitter'
import {IEntity} from '../../interfaces/IEntity'
import {IRoot} from '../../interfaces/IRoot'

// export const messageEmitterSymbol = Symbol.for('messageEmitter')
// export const entitySymbol = Symbol.for('entity')

/**
 * Специальный фасад для сущности для выполнения различных операций.
 * Операции определяются отдельно от фасада.
 */
export class EntityFacade {
	public constructor(
		protected readonly messageEmitter: IMessageEmitter,
		protected readonly entity: IEntity | IRoot
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
