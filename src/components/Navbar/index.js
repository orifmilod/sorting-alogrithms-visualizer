import React from 'react'
import { Menu, Icon, Button, Row, Input, InputNumber, Col, Form, message } from 'antd';

import { DIJKSTRA, ASTAR } from '../../const/Algorithms';
import { UpdateAlgorithm, VisualizeAlgorithm } from '../../Actions/algoAction';
import { UpdateFinishNode, UpdateStartNode } from '../../Actions/nodesAction';
import { connect } from 'react-redux';

function Navbar(props) {
  const { 
      algorithm, 
      nodes, 
      updateAlgorithm, 
      updateFinishNode, 
      updateStartNode,
      visualizeAlgorithm
  } = props;
  const { startNode, finishNode } = nodes;
  const { SubMenu } = Menu;
  function StartVisualize() {
    if(algorithm !== '')
      visualizeAlgorithm(true)
    else 
      message.error("Please select an algorithm!")
  }
  return(
    <Row>
     <Col span={12}>
        <Menu mode="horizontal">
          <Menu.Item key="mail">
            <Icon type="radar-chart" style={{ fontSize: '24px' }} />
            Algo Visualizer
          </Menu.Item>

          <SubMenu title={ <span className="submenu-title-wrapper">  <Icon type="setting" /> Algorithms </span>}>
            <Menu.ItemGroup title="Pathfinding Algorithms">
              <Menu.Item onClick={() => updateAlgorithm(DIJKSTRA)} key='dijkstra'>Dijkstra</Menu.Item>
              <Menu.Item onClick={() => updateAlgorithm(ASTAR)} key='A*'>A*</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Button onClick={() => StartVisualize()} type="primary" shape="round" icon="bulb" size='default'>
            Visualize {algorithm}
          </Button>
        </Menu>
    </Col>
    <Col style={{ padding: '10px' }} span={12}>
      <Col span={12}>
        <Form.Item label='Start Position ' labelCol={{ span: 6 }}>
          <Input.Group compact>
            <InputNumber 
              formatter={value => `X: ${value}`}
              parser={value => value.replace('X: ', '')}
              min={0} max={54}
              onChange={x => updateStartNode({...startNode, x })} 
              value={startNode.x} 
            />
            <InputNumber 
              formatter={value => `Y: ${value}`}
              parser={value => value.replace('Y: ', '')}
              min={0} 
              max={24} 
              onChange={y => updateStartNode({...startNode, y}) }
              value={startNode.y} 
            />
          </Input.Group>
        </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item label='Finish Position' labelCol={{ span: 6 }}>
        <Input.Group compact>
          <InputNumber 
            formatter={value => `X: ${value}`}
            parser={value => value.replace('X: ', '')}
            min={0} max={54}
            onChange={x => updateFinishNode({...finishNode, x})} 
            value={finishNode.x} 
          />
          <InputNumber 
            formatter={value => `Y: ${value}`}
            parser={value => value.replace('Y: ', '')}
            min={0} 
            max={24} 
            onChange={y => updateFinishNode({...finishNode, y})}
            value={finishNode.y} 
          />
        </Input.Group>
      </Form.Item>
      </Col>
      </Col>
    </Row>
  )
}

const mapStateToProps = (state) => {
  return {
    algorithm: state.algorithm.algorithm,
    nodes: state.nodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateAlgorithm: algo => dispatch(UpdateAlgorithm(algo)),
    updateStartNode: startNode => dispatch(UpdateStartNode(startNode)),
    updateFinishNode: finishNode => dispatch(UpdateFinishNode(finishNode)),
    visualizeAlgorithm: visualizeState => dispatch(VisualizeAlgorithm(visualizeState)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Navbar);