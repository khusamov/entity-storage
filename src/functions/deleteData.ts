import {IData} from '../interfaces/IData'
import {getParent} from './getParent'

export function deleteData(data: IData) {
	const parentEntity = getParent(data)
	const splice = Array.prototype.splice.bind(parentEntity)
	splice(parentEntity.indexOf(data), 1)
}
