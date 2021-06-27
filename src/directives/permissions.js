// Check permissions in components
import Vue from 'vue';
import axios from '../plugins/axios';
import router from '../router';

Vue.directive('permissions', {
  bind(el, binding) {
    const requiredPermissions = binding.expression.replace(/'/g, '').split(',');
    if (!requiredPermissions.length) { return; }

    axios.get('permissions').then((actualPermissions) => {
      if (actualPermissions.data.is_admin === false
          && !requiredPermissions.every((i) => actualPermissions.data.permissions.includes(i))) {
        // vnode.elm.style.display = 'none';
        // eslint-disable-next-line no-param-reassign
        // el.innerText = 'Você não tem permissão para acessar esta página.';
        router.push({ name: 'NotAutorized' });
      }
    });
  },
});
