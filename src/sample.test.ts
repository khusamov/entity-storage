import {EventEmitter} from 'events'
import {IMessage, MessageEmitter} from 'khusamov-message-emitter'
import {Data} from './classes/Data'
import {Entity} from './classes/Entity'
import {EntityFacade} from './facade/EntityFacade'
import {Root} from './classes/Root'


describe('Sample', () => {



	test('Test1', () => {

		const messageEmitter = new MessageEmitter(new EventEmitter)

		// Debug log
		const emit = messageEmitter.emit.bind(messageEmitter)
		messageEmitter.emit = (message: IMessage) => {
			console.log(message)
			emit(message)
		}


		const root = new Root
		const rootFasade = new EntityFacade(messageEmitter, root)

		const entity1 = new Entity(new Data, new Data, new Data)
		rootFasade.push(entity1)

		console.log(root)


	})

})
