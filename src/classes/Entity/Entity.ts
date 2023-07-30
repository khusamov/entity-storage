import {isData} from '../../functions/isData'
import {IData} from '../../interfaces/IData'
import {IEntity, parentEntitySymbol, rootEntitySymbol} from '../../interfaces/IEntity'
import {SimpleArray} from '../SimpleArray'

/**
 * Базовая реализация сущности.
 */
export class Entity extends SimpleArray<IEntity | IData> implements IEntity {
	/**
	 * Родительский узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public [parentEntitySymbol]: IEntity | null = null

	/**
	 * Корневой узел сущности.
	 * Если значение равно null, то сущность еще не добавили в хранилище.
	 */
	public [rootEntitySymbol]: IEntity | null = null

	public constructor(...nodeArray: Array<IEntity | IData>) {
		super(...nodeArray)

		// Из-за splice пришлось реализовать конструктор new <T>(arrayLength: number): T[];
		// Это неочевидный хак и надо от него избавиться.
		// TODO А для этого придется выбрать композицию вместо наследования от Array.
		if (typeof arguments[0] === 'number') {
			return
		}

		// Обновить ссылку на родительскую сущность.
		for (const data of nodeArray.filter(isData)) {
			data[parentEntitySymbol] = this
		}
	}

	public get rootEntity() {
		return this[rootEntitySymbol]
	}

	public get parentEntity() {
		return this[parentEntitySymbol]
	}
}
