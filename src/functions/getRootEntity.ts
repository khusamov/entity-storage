import {IEntity, rootEntitySymbol} from '../interfaces/IEntity'

/**
 * Получить ссылку на корневую сущность, предполагая что такая сущность точно существует.
 * Если она не найдена, то генерируется ошибка.
 * @param {IEntity} entity
 * @returns {IEntity}
 */
export function getRootEntity<E extends IEntity>(entity: IEntity): E {
	const rootEntity = entity.rootEntity
	if (!rootEntity) {
		throw new Error(`Не определена корневая сущность для '${entity.constructor.name}'`)
	}
	return rootEntity as E
}
