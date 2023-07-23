import {IData} from '../interfaces/IData'
import {INode} from '../interfaces/INode'

export function isData(node: INode): node is IData {
	return !Array.isArray(node)
}
