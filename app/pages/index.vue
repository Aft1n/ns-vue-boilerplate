<script lang="ts" setup>
const router = useRouter();
</script>

<template>
  <Page actionBarHidden="true">
    <ScrollView>
    <GridLayout class="bg-black" rows="auto,*,*">
        <Image
          src="https://miro.medium.com/v2/resize:fit:1400/1*cuQ5zNN0gVuHfPFKh9smSQ.png"
          class="align-top"
        ></Image>


        <StackLayout class="align-middle" row="1">
          <AbsoluteLayout
            class="h-14 bg-linear-to-t from-sky-500 to-indigo-500"
          />
          <Button
            text="about"
            class="bg-yellow-500 text-gray-800 w-40 rounded-2xl mt-10"
            @tap="router.push('/about')"
          />
          <GridLayout
            class="mt-10 mb-2 rounded-md size-60 border-8 border-gray-700"
          >
            <Image
              src="https://tailwindcss.com/_next/static/media/cover.de1997f7.png"
              class="rounded-md"
            />
          </GridLayout>
          <StackLayout class="text-center space-y-1" row="2">
            <Label class="text-2xl font-medium text-sky-500"
              >NATIVESCRIPT VUE template</Label
            >

            <GridLayout
              rows="auto"
              columns="*,auto,auto,auto,*"
              class="font-medium text-gray-600 dark:text-gray-400"
            >
              <Label col="1">{{ new Date().toLocaleDateString() }}</Label>
              <Label col="2" class="mx-2">·</Label>
              <Label col="3">2025</Label>
            </GridLayout>
          </StackLayout>
        </StackLayout>

        <GridLayout class="align-bottom" columns="*,auto,auto,*" row="3">
          <Image
            col="1"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1024px-Vue.js_Logo_2.svg.png?20170919082558"
            class="size-18 mr-2"
          ></Image>

          <Image
            col="2"
            src="https://raw.githubusercontent.com/NativeScript/artwork/main/logo/export/NativeScript_Logo_Wide_Transparent_White_Rounded_White.png"
            class="align-bottom size-40 ml-2"
          ></Image>
        </GridLayout>
      </GridLayout>
    </ScrollView>
  </Page>
</template>
