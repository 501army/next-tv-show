import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import Foot from '../components/foot'
import 'bootstrap/dist/css/bootstrap.css'
import {Container,Row,Col,Card,CardBody,CardImg,CardFooter,Button,Form,FormGroup, Label, Input} from 'reactstrap'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component{
  constructor(){
    super()
    this.state = {
      query: '',
      result: {
        status: '',
        message: '',
        data: []
      },
      info: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.searchShow = this.searchShow.bind(this)
  }
  
  handleChange(e){
    this.setState({query: e.target.value})
  }

  searchShow(e){
    e.preventDefault()
    let tvShow = this.state.query
    fetch('http://localhost:2323/v1/search?q='+tvShow, {
      method: 'GET'
    })
    .then( r => r.json() )
    .then( data => {
      this.setState({result: data})
      if(data.data.length == 0){
        this.setState({info: 'No Result'})
      }
    })
  }

  render(){
    return(
      <div>
        <Head title="Search" />
        <Nav />
          <Container>
            <Label>Search here</Label>
            <Form onSubmit={this.searchShow}>
              <Row>
                <Col md="4">
                  <FormGroup>
                    <Input type="text" id="showName" ref="showName" placeholder="example : school" value={this.state.query} onChange={this.handleChange}></Input>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <Button type="submit" color="primary">Search</Button>
                </Col>
              </Row>
            </Form>
            
              {this.state.result.data.length > 0 ? <Row>
                {this.state.result.data.map((item,index)=>(
                  <Col md="3" key={index} style={{marginTop: '20px'}}>
                    <Card>
                      <CardBody>
                        <CardImg src={item.show.image.medium}></CardImg>
                      </CardBody>
                      <CardFooter style={{textAlign: 'center', backgroundColor:'white'}}><h6>{item.show.name}</h6></CardFooter>
                    </Card>
                  </Col>
                ))}</Row> : 
                <Row>
                  <Col md="12"><h6>{this.state.info}</h6></Col>
                </Row>
                }
            
          </Container>
        <Foot />
      </div>
    )
  }
}