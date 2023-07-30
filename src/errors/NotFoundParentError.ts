import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'

export class NotFoundParentError extends Error {
	public constructor(entity: IEntity | IData) {
		super(`Не определена родительская сущность '${entity.constructor.name}'`)
	}
}
