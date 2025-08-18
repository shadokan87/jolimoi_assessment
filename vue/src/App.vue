<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { submitNumberSchema, type SubmitNumberSchema } from './schema/submitNumber';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useQuery } from '@tanstack/vue-query'
const { VITE_APP_TITLE, VITE_APP_DESCRIPTION } = import.meta.env;

const { handleSubmit, submitForm, errors } = useForm({
  validationSchema: toTypedSchema(submitNumberSchema),
});

async function fetchSubmitNumber() {
  
}

const {isPending} = useQuery({
  queryKey: ['submitNumber'],
  queryFn:
});
const onSubmit = handleSubmit(values => {
  alert("!values" + JSON.stringify(values, null, 2));
});
const { value: userInput } = useField<SubmitNumberSchema["userInput"]>("userInput");
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-2">
    <div class="flex flex-col">
      <h1 class="text-4xl">{{ VITE_APP_TITLE }}</h1>
      <p>{{ VITE_APP_DESCRIPTION }}</p>
    </div>
      <form @submit.prevent class="flex gap-2">
        <Input name="userInput" v-model="userInput" />
        <Button type="button" @click="onSubmit">Convert</Button>
      </form>
      <p v-if="errors.userInput" class="text-red-500 text-sm">{{ errors.userInput }}</p>
  </div>
</template>