import React from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import 'bootstrap/dist/css/bootstrap.css'
import {Container,Row,Col,Table,Spinner} from 'reactstrap'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component{
  constructor(){
    super()
    this.state = {
      spinner : false,
      result: {
        status: '',
        message: '',
        data: []
      }
    }
  }
  
  componentWillMount(){
    this.setState({spinner: true})
    fetch('http://localhost:2323/v1/schedule', {
      method: 'GET'
    })
    .then( r => r.json() )
    .then( data => {
      this.setState({result: data})
      this.setState({spinner: false})
    })
  }
  
  render(){
    return(
      <div>
        <Head title="Schedule"/>
        <Nav />
        
        <Container>
          <Row>
            <Col md="12" style={{textAlign:'center'}}><h4>TV Show Schedule</h4></Col>
          </Row>
          <Row>
            {this.state.spinner ? <Col style={{textAlign:'center',marginTop:'20px'}}><Spinner color="primary"></Spinner></Col> : 
            <Table responsive>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Picture</th>
                  <th>Name</th>
                  <th>Schedule</th>
                </tr>
              </thead>
              <tbody>
                {this.state.result.data.map((item,index)=>(
                  <tr key={index}>
                    <td>{index+1}.</td>
                    <td><img src={item.show.image.medium} style={{width:100}}></img></td>
                    <td>{item.show.name}</td>
                    <td>
                      <div>
                        <p>day(s) : {item.show.schedule.days.toString()}</p>
                        <p>time : {item.show.schedule.time}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>}
          </Row>
        </Container>
      </div>
      
    )
  }
}