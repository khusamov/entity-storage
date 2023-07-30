import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'

export class NotFoundParentRelationshipError extends Error {
	public constructor(parentEntity: IEntity, childEntity: IEntity | IData) {
		const parentName = parentEntity.constructor.name
		const childName = childEntity.constructor.name
		super(`Сущность '${parentName}' не является родителем '${childName}'`)
	}
}
