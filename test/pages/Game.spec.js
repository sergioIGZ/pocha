import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Game from '@/pages/Game'

const localVue = createLocalVue()
localVue.use(Vuex)

const mockStore = ({ round = 1, players = [] } = {}) => {
  return new Vuex.Store({
    state: () => ({
      players: [],
      currentGame: {
        players,
        round
      },
      alert: {
        isVisible: false,
        type: null,
        message: '',
        title: ''
      }
    }),
    mutations: {
      showAlert: jest.fn(),
      nextRound: jest.fn()
    },
    getters: {
      playersNotInGame: jest.fn(() => [])
    }
  })
}

const fourPlayers = [
  { name: 'foo1' },
  { name: 'foo2' },
  { name: 'foo3' },
  { name: 'foo4' }
]
const tenPlayers = [
  { name: 'foo1' },
  { name: 'foo2' },
  { name: 'foo3' },
  { name: 'foo4' },
  { name: 'foo5' },
  { name: 'foo6' },
  { name: 'foo7' },
  { name: 'foo8' },
  { name: 'foo9' },
  { name: 'foo10' }
]

describe('Game Page', () => {
  describe('Behaviour', () => {
    it('should be mounted with no problems', () => {
      // Arrange.
      // Act.
      const wrapper = shallowMount(Game, {
        localVue,
        store: mockStore
      })
      // Assert.
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('Methods', () => {
    describe('doNextRound', () => {
      describe('cards in round', () => {
        it.each`
          round | nextRound | players        | numberOfPlayers       | expectedCards
          ${1}  | ${2}      | ${fourPlayers} | ${fourPlayers.length} | ${1}
          ${3}  | ${4}      | ${fourPlayers} | ${fourPlayers.length} | ${1}
          ${5}  | ${6}      | ${fourPlayers} | ${fourPlayers.length} | ${2}
          ${12} | ${13}     | ${fourPlayers} | ${fourPlayers.length} | ${9}
          ${13} | ${14}     | ${fourPlayers} | ${fourPlayers.length} | ${10}
          ${16} | ${17}     | ${fourPlayers} | ${fourPlayers.length} | ${10}
          ${17} | ${18}     | ${fourPlayers} | ${fourPlayers.length} | ${9}
          ${24} | ${26}     | ${fourPlayers} | ${fourPlayers.length} | ${2}
          ${25} | ${26}     | ${fourPlayers} | ${fourPlayers.length} | ${1}
          ${1}  | ${2}      | ${tenPlayers}  | ${tenPlayers.length}  | ${1}
          ${9}  | ${10}     | ${tenPlayers}  | ${tenPlayers.length}  | ${1}
          ${11} | ${12}     | ${tenPlayers}  | ${tenPlayers.length}  | ${2}
          ${12} | ${13}     | ${tenPlayers}  | ${tenPlayers.length}  | ${3}
          ${13} | ${14}     | ${tenPlayers}  | ${tenPlayers.length}  | ${4}
          ${22} | ${23}     | ${tenPlayers}  | ${tenPlayers.length}  | ${4}
          ${23} | ${24}     | ${tenPlayers}  | ${tenPlayers.length}  | ${3}
          ${24} | ${25}     | ${tenPlayers}  | ${tenPlayers.length}  | ${2}
          ${25} | ${26}     | ${tenPlayers}  | ${tenPlayers.length}  | ${1}
        `(
          'should set cards = $expectedCards when is the $round (passing to the $nextRound) round and we have $numberOfPlayers',
          ({ round, players, expectedCards }) => {
            // Arrange.
            const wrapper = shallowMount(Game, {
              localVue,
              store: mockStore({ round, players })
            })

            // Act.
            wrapper.vm.doNextRound()

            // Assert.
            expect(wrapper.vm.cards).toBe(expectedCards)
          }
        )
      })
    })
  })
})
