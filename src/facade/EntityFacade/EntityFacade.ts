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
