import {EventEmitter} from 'events'
import {IMessage, MessageEmitter} from 'khusamov-message-emitter'
import {Data} from './classes/Data'
import {Entity} from './classes/Entity'
import {RootEntity} from './classes/Entity/RootEntity'
import {IdentificationData} from './data/IdentificationData'
import {MessageEmitterData} from './data/MessageEmitterData'
import './inspect-setup'
import {IData} from './interfaces/IData'
import {IEntity} from './interfaces/IEntity'
import {DataAfterDeletingMessage} from './messages/DataAfterDeletingMessage'
import {DataAfterPushingMessage} from './messages/DataAfterPushingMessage'

const debug = true

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class Vector {
	public constructor(
		public readonly x: number = 0,
		public readonly y: number = 0
	) {}
}

const nullVector: Vector = {
	x: 0,
	y: 0
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

const messageEmitter = new MessageEmitter(new EventEmitter)

// Debug log
const emit = messageEmitter.emit.bind(messageEmitter)
if (debug) {
	messageEmitter.emit = (message: IMessage) => {
		emit(message)
		if (message instanceof DataAfterPushingMessage) {
			console.log(
				message.constructor.name,
				message.data.constructor.name
			)
		} else if (message instanceof DataAfterDeletingMessage) {
			console.log(
				message.constructor.name,
				message.data.constructor.name
			)
		} else {
			console.log(message.constructor.name)
		}
	}
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class NumberData extends Data {
	public constructor(public readonly value: number = 0) {
		super()
	}
}

class StringData extends Data {
	public constructor(public readonly value: string | null = null) {
		super()
	}
}

class VectorData extends Data {
	public constructor(public readonly value: Vector = nullVector) {
		super()
	}
}

class PositionData extends VectorData {}
class VelocityData extends VectorData {}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


describe('Sample', () => {
	test('Test1', () => {
		class WorldEntity extends RootEntity {
			public constructor(...nodes: Array<IEntity | IData>) {
				super(
					new IdentificationData({type: 'World'}),
					new MessageEmitterData(messageEmitter),
					...nodes
				)
			}
		}

		class AsteroidEntity extends Entity {
			public constructor(...nodes: Array<IEntity | IData>) {
				super(
					new IdentificationData({type: 'Asteroid'}),
					new PositionData,
					new VelocityData,
					...nodes
				)
			}
		}

		const worldEntity = new WorldEntity

		console.log(worldEntity)

		const asteroidEntity = new AsteroidEntity
		worldEntity.push(asteroidEntity)

		console.log(worldEntity)

		worldEntity.delete(asteroidEntity)

		console.log(worldEntity)

	})
})
