import {INode} from '../interfaces/INode'

export class NotFoundParentError extends Error {
	public constructor(_: INode) {
		// TODO Добавить в текст имя сущности
		super('Родительский узел должен быть определен')
	}
}
