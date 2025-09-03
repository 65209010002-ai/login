<template>
  <v-sheet border rounded>
    <v-data-table
      :headers="headers"
      :items="books"
      :hide-default-footer="books.length < 11"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>
            <v-icon icon="mdi-book-multiple" size="x-small" start></v-icon>
            สมาชิก
          </v-toolbar-title>
          <v-btn
            class="me-2"
            prepend-icon="mdi-plus"
            text="เพิ่มสมาชิก"
            @click="add"
          ></v-btn>

          <v-btn color="warning" @click="logout">Logout</v-btn>
          
        </v-toolbar>
      </template>

      <template v-slot:item.image="{ item }">
        <v-img
          :src="`http://localhost:7000/uploads/${item.image}`"
          max-width="60"
          max-height="60"
          cover
          class="rounded"
        />
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon icon="mdi-pencil" size="small" @click="edit(item.id)"></v-icon>
        <v-icon
          icon="mdi-delete"
          size="small"
          @click="remove(item.id)"
        ></v-icon>
      </template>

      <template v-slot:no-data>
        <v-btn
          prepend-icon="mdi-backup-restore"
          text="Reset data"
          variant="text"
          @click="reset"
        />
      </template>
    </v-data-table>
  </v-sheet>

  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title>{{ isEditing ? "แก้ไขสมาชิก" : "เพิ่มสมาชิก" }}</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="record.id" label="ID" readonly />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="record.email" label="Email" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="record.password" label="Password" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="record.status" label="Status" required />
          </v-col>
          <v-col cols="12" md="6">
            <strong>รูปภาพเดิม:</strong>
            <v-img
              v-if="record.image"
              :src="`http://localhost:7000/uploads/${record.image}`"
              max-width="120"
              max-height="120"
              class="rounded"
              cover
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-file-input
              label="เลือกรูปใหม่"
              accept="image/*"
              prepend-icon="mdi-camera"
              @change="onDialogFileChange"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />
      <v-card-actions>
        <v-btn text="ยกเลิก" @click="dialog = false" />
        <v-spacer />
        <v-btn text="บันทึก" @click="save" color="success" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";

export default {
  name: "ShowData",

  data() {
    return {
      books: [],
      dialog: false,
      isEditing: false,
      dialogFile: null,
      DEFAULT_RECORD: {
        id: "",
        email: "",
        password: "",
        status: "yes",
        image: "",
      },
      record: {
        id: "",
        email: "",
        password: "",
        status: "yes",
        image: "",
      },
      headers: [
        { title: "ID", key: "id" },
        { title: "Email", key: "email" },
        { title: "Password", key: "password" },
        { title: "Status", key: "status" },
        { title: "รูปภาพ", key: "image" },
        { title: "การจัดการ", key: "actions", sortable: false },
      ],
    };
  },

  mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
      return;
    }

    this.fetchData();
  },



   





  methods: {
  async fetchData() {
  try {
    const token = localStorage.getItem("token");
    const baseUrl = "http://localhost:7000";

    const response = await axios.get(`${baseUrl}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.books = response.data.rows || [];
  } catch (err) {
    console.error("fetchData error:", err);
    if (err.response && err.response.status === 401) {
      alert("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
      this.logout(); // หรือ redirect ไป login
    }
  }
},

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },

    onDialogFileChange(eventOrFile) {
      if (eventOrFile && eventOrFile.target && eventOrFile.target.files) {
        this.dialogFile = eventOrFile.target.files[0];
      } else {
        this.dialogFile = eventOrFile;
      }
    },

    add() {
      this.isEditing = false;
      this.dialogFile = null;
      this.record = { ...this.DEFAULT_RECORD };
      this.dialog = true;
    },

    edit(id) {
      const found = this.books.find((b) => b.id === id);
      if (found) {
        this.record = { ...found };
        this.isEditing = true;
        this.dialogFile = null;
        this.dialog = true;
      }
    },

    async remove(id) {
      if (confirm("คุณแน่ใจว่าต้องการลบผู้ใช้นี้?")) {
        try {
          await axios.delete(`http://localhost:7000/delete-user/${id}`);
          this.fetchData();
        } catch (err) {
          console.error("remove error:", err);
          alert("เกิดข้อผิดพลาดในการลบข้อมูล");
        }
      }
    },

    async save() {
      const formData = new FormData();
      formData.append("email", this.record.email);
      formData.append("password", this.record.password);
      formData.append("status", this.record.status);
      formData.append("photoName", this.record.image || "");

      if (this.dialogFile) {
        formData.append("photo", this.dialogFile);
      }

      const url = this.isEditing
        ? `http://localhost:7000/edit-user/${this.record.id}`
        : "http://localhost:7000/add-user";

      try {
        await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        this.dialog = false;
        this.dialogFile = null;
        this.fetchData();
      } catch (error) {
        console.error("Save error:", error.response || error);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่");
      }
    },

    reset() {
      this.dialog = false;
      this.record = { ...this.DEFAULT_RECORD };
    },
  },
};
</script>
