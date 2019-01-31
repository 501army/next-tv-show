import React from 'react'
import Link from 'next/link'
import Head from '../components/head'
import Nav from '../components/nav'
import Foot from '../components/foot'
import 'bootstrap/dist/css/bootstrap.css'
import {Container,Row,Col,Card,CardHeader,CardBody,CardTitle,CardText,Button} from 'reactstrap'

const Home = () => (
  <div>
    <Head title="Home" />
    <Nav />

    <Container>
      <Row>
        <Col md="12" style={{marginBottom:'50px'}}>
          <h1 style={{textAlign:'center'}}>Welcome to Next.js</h1>
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <Card>
            <CardHeader>TV Show Schedule</CardHeader>
            <CardBody>
              <CardText>Get TV show schedule from TVMaze API</CardText>
              <Link prefetch href="/schedule"><Button color="primary">View schedule</Button></Link>
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <CardHeader>TV Show Search</CardHeader>
            <CardBody>
              <CardText>Search TV show from TVMaze API</CardText>
              <Link prefetch href="/search"><Button color="primary">Search now</Button></Link>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
    <Foot />
  </div>
)

export default Home
