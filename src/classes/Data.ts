import {IData} from '../interfaces/IData'
import {IEntity} from '../interfaces/IEntity'
import {parentNodeSymbol, rootNodeSymbol} from '../interfaces/INode'
import {IRootEntity} from '../interfaces/IRootEntity'

export class Data implements IData {
	/**
	 * Родительский узел сущности.
	 * Если значение равно null, то данные еще не добавили в хранилище.
	 */
	public [parentNodeSymbol]: IEntity | null = null

	/**
	 * Корневой узел сущности.
	 * Если значение равно null, то данные еще не добавили в хранилище.
	 */
	public [rootNodeSymbol]: IRootEntity | null = null
}
