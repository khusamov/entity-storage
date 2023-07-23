import {EventEmitter} from 'events'
import {MessageEmitter} from 'khusamov-message-emitter'
import {Data} from '../classes/Data'
import {INode} from '../interfaces/INode'

export function isMessageEmitterData(node: INode): node is MessageEmitterData {
	return node instanceof MessageEmitterData
}

export class MessageEmitterData extends Data {
	public constructor(
		public readonly messageEmitter: MessageEmitter = new MessageEmitter(new EventEmitter)
	) {
		super()
	}
}
