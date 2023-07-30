import {IData} from '../interfaces/IData'

export function isData(object: any): object is IData {
	return !Array.isArray(object)
}
