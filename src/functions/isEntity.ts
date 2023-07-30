import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'

export function isEntity(node: IEntity | IData): node is IEntity {
	return Array.isArray(node)
}
