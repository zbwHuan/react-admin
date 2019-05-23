import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {
  Form,
  Input,
  Tree
} from 'antd'

import menuList from '../../config/menuConfig'

const Item = Form.Item
const { TreeNode } = Tree

export default class AddForm extends Component {
  static propTypes = {
    role: PropTypes.object
  }
  constructor(props){
    super(props)

    const { menus } = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }

  getMenus = () => this.state.checkedKeys

  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      pre.push(
        <TreeNode title={item.title} key={item.key}>
          {item.children ? this.getTreeNodes(item.children) : null}
        </TreeNode>
      )
      return pre
    }, [])
  }

  onCheck = (checkedKeys) => {
    this.setState({checkedKeys})
  }

  componentWillMount(){
    this.treeNodes = this.getTreeNodes(menuList)
  }

  componentWillReceiveProps(nextprops){
    const menus = nextprops.role.menus
    this.setState({
      checkedKeys: menus
    })
  }

  render() {
    const { role } = this.props

    const { checkedKeys } = this.state
    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 16}
    }

    return (
      <div>
        <Item label='角色名称' {...formItemLayout}>
          <Input value={role.name} disabled/>
        </Item>

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}