import {EventEmitter} from 'events'
import {MessageEmitter} from 'khusamov-message-emitter'
import {Data} from '../classes/Data'
import {IData} from '../interfaces/IData'

export function isMessageEmitterData(data: IData): data is MessageEmitterData {
	return data instanceof MessageEmitterData
}

export class MessageEmitterData extends Data {
	public constructor(
		public readonly messageEmitter: MessageEmitter = new MessageEmitter(new EventEmitter)
	) {
		super()
	}
}
