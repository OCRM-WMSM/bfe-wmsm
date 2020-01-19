<template>
  <div>
    <bfe-tree
      :data="data3"
      show-checkbox="true"
      default-expand-all="false"
      node-key="id"
      ref="tree"
      highlight-current
      check-strictly="true"
      @check-change="test">
    </bfe-tree>
<bfe-button type="primary" @click="test1()">主要按钮</bfe-button>
 </div>
</template>


<script>
  export default {
    data() {
      return {
        data3: [{
          id: 1,
          label: '一级 2',
          children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
              id: 4,
              label: '三级 3-1-1'
            }, {
              id: 5,
              label: '三级 3-1-2',
              disabled: true
            }]
          }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
              id: 6,
              label: '三级 3-2-1'
            }, {
              id: 7,
              label: '三级 3-2-2',
              disabled: true
            }]
          }]
        }]
      };
    },
    methods: {
      getCheckedNodes() {
        console.log(this.$refs.tree.getCheckedNodes());
      },
      getCheckedKeys() {
        console.log(this.$refs.tree.getCheckedKeys());
      },
      setCheckedNodes() {
        this.$refs.tree.setCheckedNodes([{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 9,
          label: '三级 1-1-1'
        }]);
      },
      setCheckedKeys() {
        this.$refs.tree.setCheckedKeys([3]);
      },
      resetChecked() {
        this.$refs.tree.setCheckedKeys([]);
      },
      test(data, isCheck, isOtherCheck) {
        console.log(data + isCheck + isOtherCheck);
        let checknodes = this.$refs.tree.getCheckedNodes();
        checknodes.forEach((curr) => {
          console.log(curr.id + curr.label);
          if(isCheck && curr.id !== data.id) {
            this.$refs.tree.setChecked(curr, false)
          }

        });
        console.log(checknodes);
      },
      test1() {
        let user = {name: "hzw"}
        console.log(this.$store.state.user.roles);
        this.$http.post('/api/user/getUserList', { user: JSON.stringify(user), currentPage: 1, pageSize: 10}).then(res => {
          console.log(res);

        })
      }
    }
  };
</script>
