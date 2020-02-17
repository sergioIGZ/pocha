import { shallowMount } from '@vue/test-utils'
import iconButton from './iconButton'

describe('iconButton Component', () => {
  describe('Behaviour', () => {
    it('should be mounted with no problems', () => {
      // Arrange.
      // Act.
      const wrapper = shallowMount(iconButton)
      // Assert.
      expect(wrapper).toMatchSnapshot()
    })
  })
})
