<template>
  <h2>{{ title }}</h2>
  <div>
    <!-- ป้อนค่าตัวเลข -->
    <label>step0</label>
    <input type="number" v-model="counter" />

    <h2>{{ counter }}</h2>
    <p>Counter: {{ counter }}</p>
    <p>Double: {{ doubleCounter }}</p>

    <!-- ป้อนชื่อและนามสกุล -->
    <div class="flex gap-2">
      <button @click="increment">Increment</button>

      fname: <input type="text" v-model="fname" />
      lname: <input type="text" v-model="lname" />

      <!-- input ซ้ำอีกตัว (แสดงการแชร์ค่ากับ v-model) -->
      <input v-model="counter" type="number" />
    </div>
  </div>
</template>

<script>
export default {
  layout: "default",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: {
    counterChanged: (value) => typeof value === "number",
  },
  data() {
    return {
      counter: 4, // แก้ตรงนี้แทน value="4"
      fname: "",
      lname: "",
    };
  },
  computed: {
    doubleCounter() {
      return this.counter * 2; // หรือ *5 ก็ได้
    },
  },
  watch: {
    counter(newValue, oldValue) {
      console.log(`Counter changed from ${oldValue} to ${newValue}`);
      this.$emit("counterChanged", newValue);
    },
  },
  mounted() {
    console.log("เริ่มโหลด");
  },
  methods: {
    increment() {
      this.counter++;
      console.log("ชื่อ:", this.fname);
      console.log("นามสกุล:", this.lname);
    },
  },
};
</script>
