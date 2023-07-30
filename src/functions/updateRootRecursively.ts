import {IData} from '../interfaces/IData'
import {IEntity, rootEntitySymbol} from '../interfaces/IEntity'
import {isEntity} from './isEntity'

export function updateRootRecursively(rootEntity: IEntity, ...nodeArray: Array<IEntity | IData>) {
	for (const node of nodeArray) {
		if (isEntity(node)) {
			node[rootEntitySymbol] = rootEntity
			updateRootRecursively(rootEntity, ...node)
		}
	}
}
