<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { submitNumberSchema, type SubmitNumberSchema } from './schema/submitNumber';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useMutation } from '@tanstack/vue-query'
import { Loader } from 'lucide-vue-next';
import services from './services';
import { computed, reactive } from 'vue';
const { VITE_APP_TITLE, VITE_APP_DESCRIPTION } = import.meta.env;

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(submitNumberSchema),
});

const state = reactive({
  submittedInput: undefined as string | undefined
});

const mutation = useMutation({
  mutationFn: async (data: SubmitNumberSchema) => await services.convert.numberToRomanNumeral(data),
  onError: (error) => {
    let message = "Something went wrong";
    if (error.message)
      message += `: ${error.message}`;
    alert(message);
  }
});

const onSubmit = handleSubmit(values => {
  state.submittedInput = values.userInput
  mutation.mutate(values);
});

const { value: userInput } = useField<SubmitNumberSchema["userInput"]>("userInput");

const disableConvert = computed(() => {
  if (errors.value.userInput)
    return true;
  if (mutation.isPending.value)
    return true;
  return (mutation.data.value?.data.result.userInput === userInput.value)
});

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-2">
    <div class="flex flex-col items-center">
      <h1 class="text-4xl">{{ VITE_APP_TITLE }}</h1>
      <p>{{ VITE_APP_DESCRIPTION }}</p>
    </div>
    <span v-if="mutation.isSuccess.value">
      {{ `${state.submittedInput} is ${mutation.data.value?.data.result.userInput}` }}
    </span>
    <form @submit.prevent class="flex gap-2">
      <Input name="userInput" v-model="userInput" />
      <Button type="button" @click="onSubmit" :disabled="disableConvert">
        <span v-if="mutation.isPending.value" class="flex gap-1 items-center justify-center">
          {{ "converting" }}
          <Loader class="spinner" />
        </span>
        <span v-else>
          {{ "convert" }}
        </span>
      </Button>
    </form>
    <p v-if="errors.userInput" class="text-red-500 text-sm">{{ errors.userInput }}</p>
  </div>
</template>