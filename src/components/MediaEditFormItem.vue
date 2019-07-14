<script lang="ts">
import { CreateElement } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

import { MediaEditFormItemBuilder } from './MediaEditFormItemBuilder'
import { MediaEditFormItemDirector } from './MediaEditFormItemDirector'

import { User } from '../types'
import edit from '../store/modules/edit'
import MediaEditFormItemField from './MediaEditFormItemField.vue'
import { Media } from '../types'

import MediaEditFormItemWrap from './MediaEditFormItemWrap.vue'

@Component({
  inheritAttrs: false,
  components: { MediaEditFormItemField, MediaEditFormItemWrap }
})
export default class MediaEditFormItem extends Vue {
  @Prop() readonly method!: string
  @Prop() readonly user!: User
  @Prop() readonly media!: Media

  get advancedScoring() {
    return edit.advancedScoring
  }

  get scoreFormat() {
    const { user } = this
    const split = user.mediaListOptions.scoreFormat.split('_')
    return {
      round: split[2] === 'DECIMAL' ? 1 : 0,
      max: parseInt(split[1])
    }
  }

  get manga() {
    return edit.manga
  }

  render(h: CreateElement) {
    const director = new MediaEditFormItemDirector()
    const builder = new MediaEditFormItemBuilder(h)
    const { method, scoreFormat, manga, media, advancedScoring } = this

    director[method](builder, { scoreFormat, manga, media, advancedScoring })

    return h(
      'MediaEditFormItemWrap',
      {
        attrs: {
          value: method
        }
      },
      builder.getFields()
    )
  }
}
</script>
