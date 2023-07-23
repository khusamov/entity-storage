import {IData} from '../interfaces/IData'
import {IDataConstructor} from '../interfaces/IDataConstructor'
import {INode} from '../interfaces/INode'

export function isDataOf<D extends IData>(DataClass: IDataConstructor<D>) {
	return (node: INode): node is D => node instanceof DataClass
}
