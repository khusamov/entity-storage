import {IData} from '../interfaces/IData'
import {IDataConstructor} from '../interfaces/IDataConstructor'
import {IEntity} from '../interfaces/IEntity'

export class NotFoundDataError<D extends IData> extends Error {
	public constructor(_: IEntity, DataClass: IDataConstructor<D>) {
		// TODO Добавить поиск идентификации сущности и добавить имя сущности в текст сообщения
		super(`Не найдены данные класса '${DataClass.name}'`)
	}
}
