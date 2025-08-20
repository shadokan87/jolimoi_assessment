<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Button } from './components/ui/button';
import { submitNumberSchema, type SubmitNumberSchema } from './schema/submitNumber';
import { useField, useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useMutation } from '@tanstack/vue-query'
import { Loader } from 'lucide-vue-next';
import services from './services';
import { computed, reactive, watch } from 'vue';
const { VITE_APP_TITLE, VITE_APP_DESCRIPTION } = import.meta.env;

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(submitNumberSchema),
});

const state = reactive({
  submittedInput: undefined as string | undefined,
  sseStatus: "idle" as "idle" | "waiting" | "success",
  result: undefined as SubmitNumberSchema | undefined
});

const onSubmit = handleSubmit(values => {
  state.submittedInput = values.userInput;
  const resetReq = () => {
    state.submittedInput = undefined;
    state.sseStatus = "idle";
  }

  (async () => {
    try {
      state.sseStatus = "waiting";
      await services.convert.numberToRomanNumeral(values, {
        success(data) {
          state.result = data;
          state.sseStatus = "success"
        },
        error() {
          resetReq();
          alert("Something went wrong");
        },
        timeout() {
          resetReq();
          alert("Request expired, please try again");
        }
      });
    } catch (e) {
      let message = "Something went wrong";
      if (e && typeof e == "object" && "message" in e) {
        const errorMessage = e["message"];
        if (typeof errorMessage == "string")
          message += `: ${errorMessage}`;
      }
      resetReq();
      alert(message);
    }
  })();
});

const { value: userInput } = useField<SubmitNumberSchema["userInput"]>("userInput");

const disableConvert = computed(() => {
  if (errors.value.userInput)
    return true;
  if (state.sseStatus == "waiting")
    return true;
  return (state.submittedInput === userInput.value)
});

</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center gap-2">
    <div class="flex flex-col items-center">
      <h1 class="text-4xl">{{ VITE_APP_TITLE }}</h1>
      <p>{{ VITE_APP_DESCRIPTION }}</p>
    </div>
    <span v-if="state.sseStatus == 'success'">
      {{ `${state.submittedInput} is ${state.result?.userInput || '(converstion failed)'}` }}
    </span>
    <form @submit.prevent class="flex gap-2">
      <Input name="userInput" v-model="userInput" />
      <Button type="button" @click="onSubmit" :disabled="disableConvert">
        <span v-if="state.sseStatus == 'waiting'" class="flex gap-1 items-center justify-center">
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