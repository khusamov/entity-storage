import {IRootEntity} from './IRootEntity'

export const parentNodeSymbol = Symbol.for('ParentNode')
export const rootNodeSymbol = Symbol.for('RootNode')

export interface INode {
	[parentNodeSymbol]: INode | null
	[rootNodeSymbol]: IRootEntity | null
}
