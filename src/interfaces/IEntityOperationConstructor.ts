import {IMessageEmitter} from 'khusamov-message-emitter'
import {EntityOperation} from '../operations/EntityOperation'
import {IEntity} from './IEntity'
import {IRoot} from './IRoot'

export interface IEntityOperationConstructor<T extends EntityOperation = EntityOperation> {
	new(messageEmitter: IMessageEmitter, parentEntity: IEntity | IRoot): T
}
