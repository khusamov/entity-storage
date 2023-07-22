import {INode, parentNodeSymbol} from '../interfaces/INode'

/**
 * Установить родительский узел у всех узлов рекурсивно.
 * Предполагается что узлы уже вложены друг в друга. То есть ссылки "родительский узел -> дочерний узел" уже имеются.
 * А вот обратных ссылок "дочерний узел -> родительский узел" еще нет.
 * @param parentNode Родительский узел.
 * @param nodes Узлы, у которых следует обновить ссылку на родительский узел.
 */
export function setParentRecursively(parentNode: INode, ...nodes: INode[]) {
	for (const node of nodes) {
		node[parentNodeSymbol] = parentNode
		if (Array.isArray(node)) {
			setParentRecursively(node, ...node)
		}
	}
}
