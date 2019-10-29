import React, { useState, useEffect } from 'react'
import { Menu, Icon, Button, Row, Input, InputNumber, Col, Form } from 'antd';

export default function Navbar() {
  const { SubMenu } = Menu;

  const [startRow, updateRow] = useState(0);
  const [startCol, updateCol] = useState(0);
  
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
              <Menu.Item onClick={() => console.log('1')} key='dijkstra'>Dijkstra</Menu.Item>
              <Menu.Item onClick={() => console.log('2')} key='A*'>A*</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Button type="primary" shape="round" icon="bulb" size='default'>
            Visualize
          </Button>
        </Menu>
    </Col>
    <Col style={{padding: '10px'}} span={12}>
      <Col span={12}>
        <Form.Item label='Start Position ' labelCol={{ span: 6 }}>
          <Input.Group compact>
            <InputNumber 
              formatter={value => `X: ${value}`}
              parser={value => value.replace('X: ', '')}
              min={0} max={55}
              onChange={val => updateCol(val)} 
              value={startCol} 
            />
            <InputNumber 
              formatter={value => `Y: ${value}`}
              parser={value => value.replace('Y: ', '')}
              min={0} 
              max={25} 
              onChange={val => updateRow(val)}
              value={startRow} 
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
            min={0} max={55}
            onChange={val => updateCol(val)} 
            value={startCol} 
          />
          <InputNumber 
            formatter={value => `Y: ${value}`}
            parser={value => value.replace('Y: ', '')}
            min={0} 
            max={25} 
            onChange={val => updateRow(val)}
            value={startRow} 
          />
        </Input.Group>
      </Form.Item>
      </Col>
      </Col>
    </Row>
  )
}
