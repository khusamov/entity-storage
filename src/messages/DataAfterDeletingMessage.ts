import {IMessage} from 'khusamov-message-emitter'
import {IData} from '../interfaces/IData'

export class DataAfterDeletingMessage implements IMessage {
	public constructor(public readonly data: IData) {}
}
