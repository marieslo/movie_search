<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { SetupContext } from 'vue';

export default defineComponent({
  name: 'Header',
  emits: ['search'],
  setup(_, { emit }: SetupContext) {
    const searchTerm = ref('');

    const onSearch = () => {
      emit('search', searchTerm.value);
    };

    return {
      searchTerm,
      onSearch,
    };
  },
});
</script>
