import {IMessage} from 'khusamov-message-emitter'
import {IData} from '../interfaces/IData'

/**
 * Сообщение после замены игровых данных.
 */
export class DataAfterReplacingMessage implements IMessage {
	public constructor(
		public readonly previousData: IData,
		public readonly data: IData
	) {}
}
