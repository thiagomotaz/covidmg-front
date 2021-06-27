<template>
  <Page title="Usuários" v-permissions="'admin'">
    <UsersTable @selected="handleSelected($event)" :users="users" />
    <UserDeleteModal
      :showModal="showDeleteModal"
      :editedItem="editedItem"
      @delete="handleDelete()"
      @close="closeDelete()"
    />
    <UserManageModal
      :showModal="showManageModal"
      :editedIndex="editedIndex"
      :editedItem="editedItem"
      @save="handleSave()"
      @close="close()"
    />
  </Page>
</template>

<script>
import Page from '../components/dashboard/core/Page.vue';
import UsersTable from '../components/dashboard/users/UsersTable.vue';
import UserManageModal from '../components/dashboard/users/UserManageModal.vue';
import UserDeleteModal from '../components/dashboard/users/UserDeleteModal.vue';

export default {
  name: 'Users',
  components: {
    Page,
    UsersTable,
    UserManageModal,
    UserDeleteModal,
  },
  data() {
    return {
      showManageModal: false,
      showDeleteModal: false,
      editedIndex: -1,
      editedItem: {},
      users: [],
      defaultUser: {
        name: '',
        email: '',
        last_login: '',
        is_active: 1,
        is_admin: 0,
        password: '',
        password_confirmation: '',
        roles: null,
        diffRoles: [],
      },
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.$http
        .get('users')
        .then((response) => {
          this.users = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    handleDelete() {
      this.$http
        .delete(`users/${this.editedItem.id}`)
        .then((response) => {
          if (response) {
            this.users.splice(this.editedIndex, 1);
            this.closeDelete();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSave() {
      if (this.editedIndex > -1) {
        this.$http
          .put(`users/${this.editedItem.id}`, this.editedItem)
          .then((response) => {
            if (response) {
              Object.assign(this.users[this.editedIndex], response.data);
              this.close();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$http
          .post('users', this.editedItem)
          .then((response) => {
            if (response) {
              this.users.push(response.data);
              this.close();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    close() {
      this.showManageModal = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultUser };
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.showDeleteModal = false;
      this.$nextTick(() => {
        this.editedItem = { ...this.defaultUser };
        this.editedIndex = -1;
      });
    },

    handleSelected($event) {
      this.editedItem = $event?.item;
      this.editedIndex = $event?.index;
      if ('manage' in $event) {
        this.showManageModal = $event?.manage;
      } else {
        this.showDeleteModal = $event?.delete;
      }
    },
  },
};
</script>
