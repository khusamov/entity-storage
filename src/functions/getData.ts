import {NotFoundDataError} from '../errors/NotFoundDataError'
import {IData} from '../interfaces/IData'
import {IDataConstructor} from '../interfaces/IDataConstructor'
import {IEntity} from '../interfaces/IEntity'
import {isDataOf} from './isDataOf'

/**
 * Получить данные из сущности.
 * Предполагается что
 * - объект с данными точно есть,
 * - объект этого класса только один
 * - и его отсутствие вызовет ошибку NotFoundDataError.
 * @param {IEntity} entity
 * @param {IDataConstructor} DataClass
 * @returns {IData}
 */
export function getData<D extends IData>(entity: IEntity, DataClass: IDataConstructor<D>): D {
	const data = entity.find(isDataOf(DataClass))
	if (!data) {
		throw new NotFoundDataError(entity, DataClass)
	}
	return data
}
