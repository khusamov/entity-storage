import {EventEmitter} from 'events'
import {IMessage, MessageEmitter} from 'khusamov-message-emitter'
import {Data} from './classes/Data'
import {Entity} from './classes/Entity'
import {RootEntity} from './classes/RootEntity'
import {RootFasade} from './facade/RootFasade'


describe('Sample', () => {



	test('Test1', () => {

		const messageEmitter = new MessageEmitter(new EventEmitter)

		// Debug log
		const emit = messageEmitter.emit.bind(messageEmitter)
		messageEmitter.emit = (message: IMessage) => {
			console.log(message)
			emit(message)
		}

		class Vector {
			public constructor(
				public readonly x: number = 0,
				public readonly y: number = 0
			) {}
		}

		const nullVector: Vector = {x: 0, y: 0}

		class VectorData extends Data {
			public constructor(public readonly value: Vector = nullVector) {
				super()
			}
		}

		class PositionData extends VectorData {}
		class VelocityData extends VectorData {}

		class WorldEntity extends RootEntity {}

		const worldEntity = new WorldEntity
		const worldEntityFasade = new RootFasade(messageEmitter, worldEntity)


		class AsteroidEntity extends Entity {
			public constructor() {
				super(new PositionData, new VelocityData)
			}
		}

		const asteroidEntity = new AsteroidEntity
		worldEntityFasade.push(asteroidEntity)

		const asteroidEntityFasade = worldEntityFasade.createEntityFasade(asteroidEntity)

		worldEntityFasade.delete(asteroidEntityFasade.entity)

	})

})
