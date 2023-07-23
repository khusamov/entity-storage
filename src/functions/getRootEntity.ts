import {INode, rootNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

export function getRootEntity(node: INode): IRootEntity {
	const rootNode = node[rootNodeSymbol]
	if (!rootNode) {
		// TODO в текст включить имя сущности
		throw new Error('Не определен корневой узел')
	}
	return rootNode
}
