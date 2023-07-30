import {IData} from '../interfaces/IData'
import {IDataConstructor} from '../interfaces/IDataConstructor'
import {IEntity} from '../interfaces/IEntity'

export function isDataOf<D extends IData>(DataClass: IDataConstructor<D>) {
	return (node: IEntity | IData): node is D => node instanceof DataClass
}
